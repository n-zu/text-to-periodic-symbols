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

function replaceElement(array, element) {
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

function replaceElements(arrayText, elements) {
  let result = [...arrayText];
  elements.forEach((element) => {
    result = replaceElement(result, element);
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
  return replaceElements(textArray, repetitivePermutation);
}

function replaceRepetitiveElementsPermutations(
  textArray,
  repetitivePermutations
) {
  return repetitivePermutations.map((permutation) =>
    replaceRepetitiveElementsPermutation(textArray, permutation)
  );
}

function textArrayToString(textArray) {
  return textArray
    .map((component) => {
      if (typeof component === "string") return component;
      else return component.symbol;
    })
    .join(" ");
}

function textArraysToResultObjects(textArrays) {
  return textArrays
    .map((textArray) => ({
      result: textArray,
      text: textArrayToString(textArray),
      missing: textArray.filter((component) => typeof component === "string")
        .length,
    }))
    .sort((a, b) => a.missing - b.missing);
}

function removeDuplicatesFromResultObjects(resultObjects) {
  let results = [];
  resultObjects.forEach((resultObject) => {
    if (results.some((result) => result.text === resultObject.text)) return;
    results.push(resultObject);
  });
  return results;
}

function textToChemicalElements(text) {
  let lower_text = text.toLowerCase();

  let matching_symbols = filterMatchingSymbols(lower_text);
  let [unique, repetitive] =
    separateElementsWithCommonLetters(matching_symbols);
  let repetitivePermutations = permutations(repetitive);

  let textArray = replaceElements([lower_text], unique);
  let results = replaceRepetitiveElementsPermutations(
    textArray,
    repetitivePermutations
  );
  let resultsObjects = textArraysToResultObjects(results);
  let filteredResultsObjects =
    removeDuplicatesFromResultObjects(resultsObjects);

  return filteredResultsObjects;
}

function parseResultsObjects(resultsObjects) {
  return resultsObjects.map(({ text, missing }) => text + " (" + missing + ")");
}

//--------------------TESTING--------------------
let test_word = "corrupcion";
let results = textToChemicalElements(test_word);
let parsedResults = parseResultsObjects(results);

console.log(parsedResults);
console.timeEnd("program");
