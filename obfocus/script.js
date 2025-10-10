const $ = id => document.getElementById(id);
const keywords = new Set([
  "False","None","True","and","as","assert","async","await","break","class","continue","def","del","elif","else","except",
  "finally","for","from","global","if","import","in","is","lambda","nonlocal","not","or","pass","raise","return","try","while","with","yield"
]);
const builtins = new Set([
  "abs","all","any","ascii","bin","bool","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod",
  "enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance",
  "issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range",
  "repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__"
]);

function randIdent(len=6){
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let s = '';
  for(let i=0;i<len;i++) s += chars[Math.floor(Math.random()*chars.length)];
  return '_' + s;
}

function hideStrings(code){
  const table = [];
  let idx = 0;
  
  // Process the code line by line to avoid complex regex issues
  const lines = code.split('\n');
  const processedLines = [];
  
  for (const line of lines) {
    let processedLine = line;
    
    // Find all string literals in this line
    // This regex matches both single and double quoted strings, including escaped quotes
    const stringRegex = /(?:^|[^\\])('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|'''[\s\S]*?'''|"""[\s\S]*?"""|f'([^'\\]|\\.)*'|f"([^"\\]|\\.)*")/g;
    
    let match;
    const replacements = [];
    
    // First, collect all matches and their positions
    while ((match = stringRegex.exec(processedLine)) !== null) {
      const fullMatch = match[0];
      const stringLiteral = match[1];
      
      // Skip f-strings (they start with f)
      if (stringLiteral.startsWith('f')) {
        continue;
      }
      
      // Extract the actual string content (without quotes)
      let content;
      if ((stringLiteral.startsWith("'''") && stringLiteral.endsWith("'''")) || 
          (stringLiteral.startsWith('"""') && stringLiteral.endsWith('"""'))) {
        content = stringLiteral.slice(3, -3);
      } else {
        content = stringLiteral.slice(1, -1);
      }
      
      try {
        // Handle escape sequences by using the actual string value
        const tempElement = document.createElement('textarea');
        tempElement.textContent = content;
        const decodedContent = tempElement.value;
        
        // Encode to base64
        const b64 = btoa(unescape(encodeURIComponent(decodedContent)));
        table.push(b64);
        
        // Store replacement info
        replacements.push({
          start: match.index + (match[0].indexOf(stringLiteral)),
          end: match.index + match[0].length,
          replacement: `__py_s(${idx})`
        });
        
        idx++;
      } catch(e) {
        console.warn("Could not process string:", stringLiteral);
      }
    }
    
    // Apply replacements in reverse order (to preserve indices)
    replacements.sort((a, b) => b.start - a.start);
    for (const replacement of replacements) {
      const before = processedLine.substring(0, replacement.start);
      const after = processedLine.substring(replacement.end);
      processedLine = before + replacement.replacement + after;
    }
    
    processedLines.push(processedLine);
  }
  
  return {text: processedLines.join('\n'), table};
}

function minify(code){
  const lines = code.split(/\r?\n/);
  const out = [];
  let inMultilineString = false;
  let multilineDelimiter = '';
  
  for(let ln of lines){
    const trimmed = ln.trim();
    
    // Skip empty lines and comments (when not in multiline string)
    if (!inMultilineString) {
      if (trimmed === '' || trimmed.startsWith('#')) continue;
      
      // Check for multiline string start
      const multiMatch = trimmed.match(/('''|""")/);
      if (multiMatch) {
        inMultilineString = true;
        multilineDelimiter = multiMatch[1];
      }
    } else {
      // Check for multiline string end
      if (trimmed.includes(multilineDelimiter)) {
        inMultilineString = false;
      }
    }
    
    // Remove trailing comments (when not in string)
    if (!inMultilineString) {
      const noTrail = ln.replace(/#.*$/,'').trim();
      if (noTrail !== '') {
        out.push(noTrail);
      }
    } else {
      out.push(ln);
    }
  }
  return out.join('\n');
}

function collectNames(code){
  const names = new Set();
  
  // Find function definitions
  const defRe = /\bdef\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
  let m;
  while((m = defRe.exec(code)) !== null) names.add(m[1]);
  
  // Find class definitions
  const clsRe = /\bclass\s+([A-Za-z_][A-Za-z0-9_]*)\s*[:\(]/g;
  while((m = clsRe.exec(code)) !== null) names.add(m[1]);
  
  // Find variable assignments (top level only, simple approach)
  const lines = code.split(/\r?\n/);
  for(let ln of lines){
    // Simple assignment pattern (not inside function/class)
    const topAssign = ln.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/);
    if(topAssign) names.add(topAssign[1]);
    
    // Also find assignments with multiple variables
    const multiAssign = ln.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*,\s*([A-Za-z_][A-Za-z0-9_]*)\s*=/);
    if(multiAssign) {
      names.add(multiAssign[1]);
      names.add(multiAssign[2]);
    }
  }
  
  // Filter out keywords, builtins, and special methods
  return Array.from(names).filter(n => 
    !keywords.has(n) && 
    !builtins.has(n) && 
    !/^__.*__$/.test(n)
  );
}

function renameIdents(code, names){
  if (names.length === 0) return {code, map: {}};
  
  const map = {};
  names.forEach(n => { 
    map[n] = randIdent(5 + Math.floor(Math.random()*3)); 
  });
  
  // Sort by length (longest first) to avoid partial replacements
  const ordered = Object.keys(map).sort((a,b) => b.length - a.length);
  let out = code;
  
  for(let orig of ordered){
    const repl = map[orig];
    // Use word boundaries and avoid replacing when preceded by a dot
    const regex = new RegExp('\\b' + orig + '\\b', 'g');
    out = out.replace(regex, (match, offset, string) => {
      // Check if this is an attribute access (preceded by dot)
      if (offset > 0 && string[offset-1] === '.') {
        return match;
      }
      return repl;
    });
  }
  return {code: out, map};
}

function makeStringHelper(table){
  if(table.length === 0) return '';
  const entries = table.map(s => `"${s}"`).join(', ');
  return [
    "import base64",
    `_py_s_table = [${entries}]`,
    "def __py_s(i):",
    "    return base64.b64decode(_py_s_table[i]).decode('utf-8')",
    ""
  ].join('\n');
}

function obfuscate(code, opts){
  let working = code;
  let table = [];
  
  // Apply transformations in sequence
  if(opts.strings){
    const res = hideStrings(working);
    working = res.text;
    table = res.table;
  }
  
  if(opts.minify) {
    working = minify(working);
  }
  
  let renameMap = {};
  if(opts.rename){
    const names = collectNames(working);
    const res = renameIdents(working, names);
    working = res.code;
    renameMap = res.map;
  }
  
  const header = makeStringHelper(table);
  const final = header + working;
  return {final, map: renameMap, table};
}

function tryRestore(code){
  try{
    const headerMatch = code.match(/_py_s_table\s*=\s*\[([^\]]*)\]/);
    let restored = code;
    if(headerMatch){
      const listText = headerMatch[1];
      const b64s = Array.from(listText.matchAll(/"([^"]*)"/g)).map(m => m[1]);
      for(let i=0;i<b64s.length;i++){
        try {
          const text = decodeURIComponent(escape(atob(b64s[i])));
          const lit = JSON.stringify(text);
          restored = restored.replace(new RegExp(`__py_s\\(${i}\\)`, 'g'), lit);
        } catch(e) {
          console.warn("Could not decode base64 string at index", i);
        }
      }
      // Remove the helper function and import
      restored = restored.replace(/import base64[\s\S]*?def __py_s\(i\):[\s\S]*?return base64[^)]+\)[^\n]*\n/, '');
      restored = restored.replace(/_py_s_table\s*=\s*\[[^\]]*\][\n]*/, '');
    }
    return restored;
  }catch(e){ 
    console.error("Restoration error:", e);
    return code; 
  }
}

// Event listeners
$('btnClear').addEventListener('click', ()=> {
  $('inputCode').value = '';
  $('outputCode').value = '';
});

$('btnExample').addEventListener('click', ()=> {
  $('inputCode').value = `# Example with input function and f-string
name = input("Zadaj svoje meno: ")
print(f"Tvoje meno je {name}")`;
});

$('btnObf').addEventListener('click', ()=> {
  try{
    const src = $('inputCode').value;
    if(!src.trim()) return alert('Please paste Python code first');
    const opts = {
      minify: $('optMinify').checked, 
      strings: $('optStrings').checked, 
      rename: $('optRename').checked
    };
    const res = obfuscate(src, opts);
    $('outputCode').value = res.final;
  }catch(err){ 
    alert('Error during obfuscation: ' + err.message); 
    console.error(err); 
  }
});

$('btnCopy').addEventListener('click', async ()=>{
  const t = $('outputCode').value;
  if(!t.trim()) return alert('Nothing to copy');
  try {
    await navigator.clipboard.writeText(t);
    alert('Copied to clipboard!');
  } catch(err) {
    alert('Failed to copy: ' + err.message);
  }
});

$('btnDownload').addEventListener('click', ()=>{
  const t = $('outputCode').value;
  if(!t.trim()) return alert('Nothing to download');
  const blob = new Blob([t], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; 
  a.download = 'obfuscated.py'; 
  document.body.appendChild(a); 
  a.click(); 
  a.remove();
  URL.revokeObjectURL(url);
});

$('btnRestore').addEventListener('click', ()=>{
  const t = $('outputCode').value || $('inputCode').value;
  if(!t.trim()) return alert('Nothing to restore');
  const r = tryRestore(t);
  const w = window.open('','_blank');
  w.document.write(
    '<!DOCTYPE html><html><head><title>Restore Attempt</title>' +
    '<style>body{font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 20px;}</style></head>' +
    '<body><pre>' + 
    r.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])) + 
    '</pre></body></html>'
  );
  w.document.close();
});