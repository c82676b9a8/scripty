const webhookURL = "https://discord.com/api/webhooks/1409798004692746320/JRXKDRo4BQcg2BKr1X-28bsTLccE4DZ6YybkChZdOQd93Ah5VpOwGeDiN6X2qZxG_ZdQ"; // replace with your webhook

function calculateTotal() {
  let total = 0;
  total += parseInt(document.getElementById("engine").value) * 15000;
  total += document.getElementById("turbo").checked ? 50000 : 0;
  total += parseInt(document.getElementById("transmission").value) * 7500;
  total += parseInt(document.getElementById("suspension").value) * 5000;
  total += parseInt(document.getElementById("brakes").value) * 4500;
  total += document.getElementById("headlights").checked ? 12000 : 0;
  total += document.getElementById("tinting").checked ? 3000 : 0;
  total += document.getElementById("spz").checked ? 3000 : 0;
  total += document.getElementById("horn").checked ? 2000 : 0;
  total += parseInt(document.getElementById("bodywork").value) * 5000;
  total += parseInt(document.getElementById("color").value) * 4000;

  document.getElementById("totalPrice").innerText = "Total: $" + total.toLocaleString();
  document.getElementById("confirmBox").classList.remove("hidden");
}

function sendWebhook() {
  const payload = {
    content: "New GTA V Tuning Order",
    embeds: [{
      title: "Tuning Details",
      color: 5763719,
      fields: [
        { name: "Engine", value: "Stage " + document.getElementById("engine").value, inline: true },
        { name: "Turbo", value: document.getElementById("turbo").checked ? "Yes" : "No", inline: true },
        { name: "Transmission", value: "Stage " + document.getElementById("transmission").value, inline: true },
        { name: "Suspension", value: "Stage " + document.getElementById("suspension").value, inline: true },
        { name: "Brakes", value: "Stage " + document.getElementById("brakes").value, inline: true },
        { name: "Headlights", value: document.getElementById("headlights").checked ? "Yes" : "No", inline: true },
        { name: "Window Tinting", value: document.getElementById("tinting").checked ? "Yes" : "No", inline: true },
        { name: "SPZ", value: document.getElementById("spz").checked ? "Yes" : "No", inline: true },
        { name: "Horn", value: document.getElementById("horn").checked ? "Yes" : "No", inline: true },
        { name: "Bodywork", value: document.getElementById("bodywork").value + " Parts", inline: true },
        { name: "Color", value: document.getElementById("color").value + " Resprays", inline: true },
        { name: "Total Price", value: document.getElementById("totalPrice").innerText }
      ]
    }]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    alert("Tuning sent to Discord!");
    resetForm();
  }).catch(err => {
    alert("Error sending webhook: " + err);
  });
}

function resetForm() {
  document.getElementById("tuningForm").reset();
  document.getElementById("totalPrice").innerText = "";
  document.getElementById("confirmBox").classList.add("hidden");
}
