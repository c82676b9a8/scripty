const CARS = [
  { name: "Blista", price: 35000 },
  { name: "Club", price: 15000 },
  { name: "Issi", price: 18000 },
  { name: "Weevil", price: 22000 },
  { name: "Cognoscenti", price: 30000 },
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
