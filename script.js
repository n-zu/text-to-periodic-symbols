const fs = require("fs");
console.time("program");

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

function separateElementsWithCommonLetters(elements) {
  let unique = [];
  let repetitive = [];
  const haveLettersInCommon = (element1, element2) => {
    return element1.text
      .split("")
      .some((letter) => element2.text.includes(letter));
  };
  const isUnique = (element) => {
    let otherElements = elements.filter(
      ({ number }) => element.number !== number
    );
    for (let otherElement of otherElements)
      if (haveLettersInCommon(element, otherElement)) return false;
    return true;
  };
  elements.forEach((element) => {
    if (isUnique(element)) unique.push(element);
    else repetitive.push(element);
  });
  return [unique, repetitive];
}

function replaceUniqueElement(array, element) {
  let result = [];
  array.forEach((string) => {
    if (typeof string !== "string") return result.push(string);

    if (!string.includes(element.text)) return result.push(string);

    let split = string.split(element.text);
    split.forEach((part, i) => {
      if (i !== 0) result.push(element);
      if (part) result.push(part);
    });
  });
  return result;
}

function replaceUniqueElements(string, unique) {
  let result = [string];
  unique.forEach((element) => {
    result = replaceUniqueElement(result, element);
  });
  return result;
}

function permutations(inputArr) {
  //https://stackoverflow.com/questions/9960908/permutations-in-javascript
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}

function replaceRepetitiveElementsPermutation(
  textArray,
  repetitivePermutation
) {
  repetitivePermutation.forEach((element) => {});
}

function replaceRepetitiveElementsPermutations(
  textArray,
  repetitivePermutations
) {
  return repetitivePermutations.map((permutation) =>
    replaceRepetitiveElementsPermutation(textArray, permutation)
  );
}

//--------------------TESTING--------------------
let test_word = "hello";
let matching_symbols = filterMatchingSymbols(test_word);
let [unique, repetitive] = separateElementsWithCommonLetters(matching_symbols);
let textArray = replaceUniqueElements(test_word, unique);
let repetitivePermutations = permutations(repetitive);
let results = replaceRepetitiveElementsPermutations(
  textArray,
  repetitivePermutations
);

console.log("[", test_word, "]");
/*
console.log("Unique elements:");
console.log(unique);
console.log("Rept elements:");
console.log(repetitive);
console.log("Result:");
console.log(result);
*/
console.timeEnd("program");
