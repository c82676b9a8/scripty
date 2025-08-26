const webhookURL = "https://discord.com/api/webhooks/1409808408718082098/N_tOQTN1tZxh5z_eQAcyoWEdOAYbsLbHcXOEFv_dW7od-QKHG_JDgPxww6FKBWeXO5XY";

// Function to live update the total price
function livePriceCalculation() {
  let total = 0;
  total += parseInt(document.getElementById("engine").value) * 15000;  // Engine Price
  total += document.getElementById("turbo").checked ? 50000 : 0;  // Turbo
  total += parseInt(document.getElementById("transmission").value) * 7500;  // Transmission Price
  total += parseInt(document.getElementById("suspension").value) * 5000;  // Suspension Price
  total += parseInt(document.getElementById("brakes").value) * 4500;  // Brakes Price
  total += document.getElementById("headlights").checked ? 12000 : 0;
  total += document.getElementById("tire_smoke").checked ? 20000 : 0;  // Headlights
  total += parseInt(document.getElementById("tinting").value) > 0 ? 3000 : 0;
  total += parseInt(document.getElementById("underglow").value) * 10000;  // Window Tinting
  total += document.getElementById("spz").checked ? 3000 : 0;  // SPZ
  total += document.getElementById("horn").checked ? 2000 : 0;  // Horn
  total += document.getElementById("livery").checked ? 2000 : 0;
  total += parseInt(document.getElementById("bodywork").value) * 5000;  // Bodywork
  total += parseInt(document.getElementById("color").value) * 4000;  // Color Resprays

  // Display the calculated total price
  document.getElementById("totalPrice").innerText = "Total: $" + total.toLocaleString();

  // Update the payment amount message with the calculated price
  document.getElementById("paymentAmount").innerText = "$" + total.toLocaleString();

  // Show or hide the payment check confirmation based on if there's a total price
  if (total > 0) {
    document.getElementById("confirmBox").classList.remove("hidden");
  } else {
    document.getElementById("confirmBox").classList.add("hidden");
  }
}

// Attach event listeners to form fields to trigger live price calculation
document.getElementById("engine").addEventListener("change", livePriceCalculation);
document.getElementById("turbo").addEventListener("change", livePriceCalculation);
document.getElementById("transmission").addEventListener("change", livePriceCalculation);
document.getElementById("suspension").addEventListener("change", livePriceCalculation);
document.getElementById("brakes").addEventListener("change", livePriceCalculation);
document.getElementById("headlights").addEventListener("change", livePriceCalculation);
document.getElementById("tire_smoke").addEventListener("change", livePriceCalculation);
document.getElementById("spz").addEventListener("change", livePriceCalculation);
document.getElementById("horn").addEventListener("change", livePriceCalculation);
document.getElementById("livery").addEventListener("change", livePriceCalculation);
document.getElementById("bodywork").addEventListener("change", livePriceCalculation);
document.getElementById("tinting").addEventListener("change", livePriceCalculation);
document.getElementById("underglow").addEventListener("change", livePriceCalculation);
document.getElementById("color").addEventListener("change", livePriceCalculation);

// Send the details to Discord webhook when user confirms payment
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
  addIfChecked("tire_smoke", "Tire smoke");
  addIfChecked("spz", "SPZ");
  addIfChecked("horn", "Horn");
  addIfChecked("livery", "Livery");

  const tintingVal = parseInt(document.getElementById("tinting").value);
  if (tintingVal > 0) {
    const text = document.getElementById("tinting").options[tintingVal].text;
    fields.push({ name: "Window Tinting", value: text, inline: false });
  }

  addIfNotZero("bodywork", "Bodywork", "Parts");
  addIfNotZero("underglow", "Underglow", "Level(s)");
  addIfNotZero("color", "Color", "Resprays");

  fields.push({ name: "Total Price", value: document.getElementById("totalPrice").innerText });

  const payload = {
    content: "New Tuning Order",
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

// Reset the form to its initial state
function resetForm() {
  document.getElementById("tuningForm").reset();
  document.getElementById("totalPrice").innerText = "";
  document.getElementById("confirmBox").classList.add("hidden");
}

// Trigger live price calculation when the page loads
window.onload = livePriceCalculation;
