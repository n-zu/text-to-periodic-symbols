const fs = require("fs");

let raw_data = fs.readFileSync("data/elements.json");
let elements = JSON.parse(raw_data);
elements.forEach((element) => {
  element.text = element.symbol.toLowerCase();
});
// elements is an array of objects, each object is an element
// Element: { number, symbol, name, atomic_mass, category, text }

function filterMatchingSymbols(string) {
  return elements.filter(({ text }) => string.includes(text));
}

let test_word = "never";

const test = filterMatchingSymbols(test_word);
console.log(test);
