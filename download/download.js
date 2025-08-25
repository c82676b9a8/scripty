// /download/download.js
window.onload = function () {
  const downloadUrl = "/assets/files/ScriptyGAME.exe"; // Make sure this path is correct
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = "ScriptyGAME.exe"; // Optional: rename the file on download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
