const CARS = [
  { name: "Blista", price: 35000 },
  { name: "Club", price: 45000 },
  { name: "Issi", price: 32000 },
  { name: "Weevil", price: 36000 },
  { name: "Enus Cinquemila", price: 90000 },
  { name: "Cognoscenti", price: 80000 },
  { name: "Vorschlaghammer", price: 25000 },
  { name: "Fugitive", price: 35000 },
  { name: "Impaler SZ", price: 12000 },
  { name: "Primo", price: 16000 },
  { name: "Schafter", price: 26000 },
  { name: "Baller LE", price: 120000 },
  { name: "Cavalcade XL", price: 85000 },
  { name: "Dubsta (2)", price: 180000 },
  { name: "Rebla GTS", price: 50000 },
  { name: "XLS", price: 45000 },
  { name: "Cognoscenti Cabrio", price: 40000 },
  { name: "Felon GT", price: 55000 },
  { name: "Zion Cabrio", price: 35000 },
  { name: "Buffalo STX", price: 70000 },
  { name: "Dominator", price: 50000 },
  { name: "Comet S2", price: 180000 },
  { name: "Coquette D10", price: 180000 },
  { name: "Futo", price: 25000 },
  { name: "Itali GTO", price: 215000 },
  { name: "Jugular", price: 75000 },
  { name: "Kuruma", price: 65000 },
  { name: "Sultan", price: 40000 },
  { name: "10F", price: 250000 },
  { name: "Adder", price: 1250000 },
  { name: "Deveste Eight", price: 1850000 },
  { name: "Entity MT", price: 2200000 },
  { name: "Furia", price: 750000 },
];

function makeCard(car) {
  const el = document.createElement("article");
  el.className = "card";
  el.innerHTML = `
    <img class="thumb" src="photos/larp_${car.name.replace(/[^a-z0-9]/gi,'')}.png" alt="${car.name}">
    <div class="card-body">
      <div class="name">${car.name}</div>
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
