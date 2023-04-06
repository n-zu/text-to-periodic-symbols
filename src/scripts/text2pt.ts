import raw_elements from "../data/elements.json";
import { PtElement, PtElements, PtTextArray, PtResults } from "./types";

const elements: PtElements = raw_elements.map((element) => ({
  ...element,
  text: element.symbol.toLowerCase(),
}));

function filterMatchingSymbols(string: string): PtElements {
  return elements.filter(({ text }) => string.includes(text));
}

function separateElementsWithCommonLetters(
  elements: PtElements
): [PtElements, PtElements] {
  const unique: PtElements = [];
  const repetitive: PtElements = [];
  const haveLettersInCommon = (element1: PtElement, element2: PtElement) => {
    return element1.text
      .split("")
      .some((letter) => element2.text.includes(letter));
  };
  const isUnique = (element: PtElement) => {
    const otherElements = elements.filter(
      ({ number }) => element.number !== number
    );
    for (const otherElement of otherElements)
      if (haveLettersInCommon(element, otherElement)) return false;
    return true;
  };
  elements.forEach((element) => {
    if (isUnique(element)) unique.push(element);
    else repetitive.push(element);
  });
  return [unique, repetitive];
}

function replaceElement(array: PtTextArray, element: PtElement): PtTextArray {
  const result: PtTextArray = [];
  array.forEach((string) => {
    if (typeof string !== "string") return result.push(string);

    if (!string.includes(element.text)) return result.push(string);

    const split = string.split(element.text);
    split.forEach((part, i) => {
      if (i !== 0) result.push(element);
      if (part) result.push(part);
    });
  });
  return result;
}

function replaceElements(
  arrayText: PtTextArray,
  elements: PtElements
): PtTextArray {
  let result = [...arrayText];
  elements.forEach((element: PtElement) => {
    result = replaceElement(result, element);
  });
  return result;
}

function permutations<T>(inputArr: T[]): T[][] {
  //https://stackoverflow.com/questions/9960908/permutations-in-javascript
  const result: T[][] = [];

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}

function replaceRepetitiveElementsPermutation(
  textArray: PtTextArray,
  repetitivePermutation: PtElements
): PtTextArray {
  return replaceElements(textArray, repetitivePermutation);
}

function replaceRepetitiveElementsPermutations(
  textArray: PtTextArray,
  repetitivePermutations: PtElements[]
): PtTextArray[] {
  return repetitivePermutations.map((permutation) =>
    replaceRepetitiveElementsPermutation(textArray, permutation)
  );
}

function textArrayToString(textArray: PtTextArray): string {
  return textArray
    .map((component) => {
      if (typeof component === "string") return component;
      else return component.symbol;
    })
    .join(" ");
}

function textArraysToResultObjects(textArrays: PtTextArray[]): PtResults {
  return textArrays
    .map((textArray) => ({
      result: textArray,
      text: textArrayToString(textArray),
      missing: textArray.filter((component) => typeof component === "string")
        .length,
    }))
    .sort((a, b) => a.missing - b.missing);
}

function removeDuplicatesFromResultObjects(
  resultObjects: PtResults
): PtResults {
  const results: PtResults = [];
  resultObjects.forEach((resultObject) => {
    if (results.some((result) => result.text === resultObject.text)) return;
    results.push(resultObject);
  });
  return results;
}

// Returns a list of possible ways to represent the text replacing letters with elements
// See type definitions for more info
function text2pt(text: string): PtResults {
  const lower_text = text.toLowerCase();

  const matching_symbols = filterMatchingSymbols(lower_text);
  const [unique, repetitive] =
    separateElementsWithCommonLetters(matching_symbols);

  // Unique elements can be replaced outright
  const textArray = replaceElements([lower_text], unique);

  // Repetitive elements have many possible permutations
  // FIXME: This does not cover when double overlapping. Also it's brute force.
  const repetitivePermutations = permutations(repetitive);
  const results = replaceRepetitiveElementsPermutations(
    textArray,
    repetitivePermutations
  );

  const resultsObjects = textArraysToResultObjects(results);
  const filteredResultsObjects =
    removeDuplicatesFromResultObjects(resultsObjects);

  return filteredResultsObjects;
}

function parseResultsObjects(resultsObjects: PtResults): string[] {
  return resultsObjects.map(({ text, missing }) => text + " (" + missing + ")");
}

export default text2pt;
export { parseResultsObjects };

/*
let test_word = "corrupcion";
let results = textToChemicalElements(test_word);
let parsedResults = parseResultsObjects(results);

console.log(parsedResults);*/
