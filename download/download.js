window.onload = function () {
  const downloadUrl = "/assets/files/ScriptyGAME.exe";
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = "ScriptyGAME.exe";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
