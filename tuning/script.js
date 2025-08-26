const webhookURL = "https://discord.com/api/webhooks/1409798004692746320/JRXKDRo4BQcg2BKr1X-28bsTLccE4DZ6YybkChZdOQd93Ah5VpOwGeDiN6X2qZxG_ZdQ";

function calculateTotal() {
  let total = 0;
  total += (parseInt(document.getElementById("engine").value) || 0) * 15000;
  total += document.getElementById("turbo").checked ? 50000 : 0;
  total += parseInt(document.getElementById("transmission").value) * 7500;
  total += parseInt(document.getElementById("suspension").value) * 5000;
  total += parseInt(document.getElementById("brakes").value) * 4500;
  total += document.getElementById("headlights").checked ? 12000 : 0;
  total += parseInt(document.getElementById("tinting").value) > 0 ? 3000 : 0;
  total += document.getElementById("spz").checked ? 3000 : 0;
  total += document.getElementById("horn").checked ? 2000 : 0;
  total += parseInt(document.getElementById("bodywork").value) * 5000;
  total += parseInt(document.getElementById("color").value) * 4000;

  if (total === 0) {
    document.getElementById("totalPrice").innerText = "";
    document.getElementById("confirmBox").classList.add("hidden");
    alert("⚠️ You must select at least one tuning option!");
    return;
  }

  document.getElementById("totalPrice").innerText = "Total: $" + total.toLocaleString();
  document.getElementById("confirmBox").classList.remove("hidden");
}

function sendWebhook() {
  const getStageText = (id, label) => {
    const val = parseInt(document.getElementById(id).value);
    return val === 0 ? "Stock" : `${label} ${val}`;
  };

  const getPartsText = (id, label) => {
    const val = parseInt(document.getElementById(id).value);
    return val === 0 ? "None" : `${val} ${label}`;
  };

  const payload = {
    content: "New GTA V Tuning Order",
    embeds: [{
      title: "Tuning Details",
      color: 5763719,
      fields: [
        { name: "Engine", value: getStageText("engine", "Stage"), inline: false },
        { name: "Turbo", value: document.getElementById("turbo").checked ? "Yes" : "No", inline: false },
        { name: "Transmission", value: getStageText("transmission", "Stage"), inline: false },
        { name: "Suspension", value: getStageText("suspension", "Stage"), inline: false },
        { name: "Brakes", value: getStageText("brakes", "Stage"), inline: false },
        { name: "Headlights", value: document.getElementById("headlights").checked ? "Yes" : "No", inline: false },
        { name: "Window Tinting", value: document.getElementById("tinting").options[document.getElementById("tinting").selectedIndex].text, inline: false },
        { name: "SPZ", value: document.getElementById("spz").checked ? "Yes" : "No", inline: false },
        { name: "Horn", value: document.getElementById("horn").checked ? "Yes" : "No", inline: false },
        { name: "Bodywork", value: getPartsText("bodywork", "Parts"), inline: false },
        { name: "Color", value: getPartsText("color", "Resprays"), inline: false },
        { name: "Total Price", value: document.getElementById("totalPrice").innerText }
      ]
    }]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    alert("✅ Tuning sent to Discord!");
    resetForm();
  }).catch(err => {
    alert("❌ Error sending webhook: " + err);
  });
}

function resetForm() {
  document.getElementById("tuningForm").reset();
  document.getElementById("totalPrice").innerText = "";
  document.getElementById("confirmBox").classList.add("hidden");
}
