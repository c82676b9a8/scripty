const CARS = [
  { name: "Blista", price: 35000 },
  { name: "Club", price: 45000 },
  { name: "Issi", price: 32000 },
  { name: "Weevil", price: 36000 },
  { name: "Enus_Cinquemila", price: 90000 },
  { name: "Cognoscenti", price: 80000 },
  { name: "Vorschlaghammer", price: 25000 },
  { name: "Fugitive", price: 35000 },
  { name: "Impaler_SZ", price: 12000 },
  { name: "Primo", price: 16000 },
  { name: "Schafter", price: 26000 },
  { name: "Baller_LE", price: 120000 },
  { name: "Cavalcade_XL", price: 85000 },
  { name: "Dubsta (2)", price: 180000 },
  { name: "Rebla GTS", price: 50000 },
  { name: "XLS", price: 45000 },
  { name: "Cognoscenti_Cabrio", price: 40000 },
  { name: "Felon_GT", price: 55000 },
  { name: "Zion_Cabrio", price: 35000 },
  { name: "Buffalo_STX", price: 70000 },
  { name: "Dominator", price: 50000 },
  { name: "Comet_S2", price: 180000 },
  { name: "Coquette_D10", price: 180000 },
  { name: "Futo", price: 25000 },
  { name: "Itali_GTO", price: 215000 },
  { name: "Jugular", price: 75000 },
  { name: "Kuruma", price: 65000 },
  { name: "Sultan", price: 40000 },
  { name: "10F", price: 250000 },
  { name: "Adder", price: 1250000 },
  { name: "Deveste_Eight", price: 1850000 },
  { name: "Entity_MT", price: 2200000 },
  { name: "Ignus", price: 1200000 },
  { name: "Itali_GBT", price: 700000 },
  { name: "Turismo_R", price: 880000 },
  { name: "Zentorno", price: 1400000 },
  { name: "Brawler", price: 90000 },
  { name: "Caracara_4x4", price: 75000 },
  { name: "Dubsta_6x6", price: 160000 },
  { name: "Vapid_Sandking_Classic", price: 65000 },
  { name: "Terminus", price: 115000 },
  { name: "Burrito_(2)", price: 40000 },
  { name: "Bati_801", price: 45000 },
  { name: "BF400", price: 15000 },
  { name: "Faggio", price: 1200 },
  { name: "Manchez", price: 10000 },
];

function makeCard(car) {
  const el = document.createElement("article");
  el.className = "card";

  const fileName = car.name
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "");

  const displayName = car.name.replace(/_/g, " ");

  el.innerHTML = `
    <img class="thumb" src="photos/larp_${fileName}.png" alt="${displayName}">
    <div class="card-body">
      <div class="name">${displayName}</div>
      <div class="price">$${car.price.toLocaleString()}</div>
    </div>
  `;
  return el;
}

function render() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  CARS.forEach(car => grid.appendChild(makeCard(car)));
}

document.addEventListener("DOMContentLoaded", render);
