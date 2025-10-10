function encodeBase64(str) { 
  return btoa(unescape(encodeURIComponent(str))); 
}

const input = document.getElementById('input');
const result = document.getElementById('result');
document.getElementById('encodeBtn').addEventListener('click', ()=>{
  try { result.textContent = encodeBase64(input.value); }
  catch { result.textContent = "⚠️ Encoding failed!"; }
});

document.getElementById('fileInput').addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    result.textContent = btoa(reader.result);
  };
  reader.readAsBinaryString(file);
});
