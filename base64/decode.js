function decodeBase64(str) { 
  return decodeURIComponent(escape(atob(str))); 
}

const input = document.getElementById('input');
const result = document.getElementById('result');
document.getElementById('decodeBtn').addEventListener('click', ()=>{
  try { result.textContent = decodeBase64(input.value.trim()); }
  catch { result.textContent = "⚠️ Invalid Base64 input."; }
});

document.getElementById('fileInput').addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try { result.textContent = atob(reader.result); }
    catch { result.textContent = "⚠️ Invalid Base64 file."; }
  };
  reader.readAsBinaryString(file);
});
