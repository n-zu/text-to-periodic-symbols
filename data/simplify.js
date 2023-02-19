const fs = require("fs");

let raw_data = fs.readFileSync("ptable.json");
let elements = JSON.parse(raw_data);
let simplified_elements = elements.elements.map(
  ({ number, symbol, name, atomic_mass, category }) => ({
    number,
    symbol,
    name,
    atomic_mass,
    category,
  })
);
fs.writeFileSync("elements.json", JSON.stringify(simplified_elements));

const categories = new Set(elements.elements.map(({ category }) => category));
fs.writeFileSync("categories.json", JSON.stringify([...categories]));
