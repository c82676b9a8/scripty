document.addEventListener("DOMContentLoaded", function () {
  const downloadButton = document.getElementById("downloadBtn");

  downloadButton.addEventListener("click", function () {
    const downloadUrl = "https://github.com/c82676b9a8/scripty/raw/refs/heads/main/assets/files/Update.exe";

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Update.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const openMessage = document.getElementById("openMessage");
    openMessage.style.display = "block";
  });
});
