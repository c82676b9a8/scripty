const webhookURL = "https://discord.com/api/webhooks/1409808408718082098/N_tOQTN1tZxh5z_eQAcyoWEdOAYbsLbHcXOEFv_dW7od-QKHG_JDgPxww6FKBWeXO5XY";

function calculateTotal() {
  let total = 0;
  total += parseInt(document.getElementById("engine").value) * 15000;
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
  let fields = [];

  const addIfNotZero = (id, label, suffix = "") => {
    const val = parseInt(document.getElementById(id).value);
    if (val > 0) fields.push({ name: label, value: suffix ? `${val} ${suffix}` : `Stage ${val}`, inline: false });
  };

  const addIfChecked = (id, label) => {
    if (document.getElementById(id).checked) fields.push({ name: label, value: "Yes", inline: false });
  };

  addIfNotZero("engine", "Engine");
  addIfChecked("turbo", "Turbo");
  addIfNotZero("transmission", "Transmission");
  addIfNotZero("suspension", "Suspension");
  addIfNotZero("brakes", "Brakes");

  addIfChecked("headlights", "Headlights");
  addIfChecked("spz", "SPZ");
  addIfChecked("horn", "Horn");

  const tintingVal = parseInt(document.getElementById("tinting").value);
  if (tintingVal > 0) {
    const text = document.getElementById("tinting").options[tintingVal].text;
    fields.push({ name: "Window Tinting", value: text, inline: false });
  }

  addIfNotZero("bodywork", "Bodywork", "Parts");

  addIfNotZero("color", "Color", "Resprays");

  fields.push({ name: "Total Price", value: document.getElementById("totalPrice").innerText });

  const payload = {
    content: "New GTA V Tuning Order",
    embeds: [{
      title: "Tuning Details",
      color: 5763719,
      fields: fields
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
