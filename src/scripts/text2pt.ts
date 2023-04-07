import string2pt from "./string2pt";
import { PtResults } from "./types";

function text2pt(text: string): PtResults[] {
  const words = text.split(" ");
  const results = words.map((word) => string2pt(word));
  return results;
}

function primaryText(results: PtResults[]) {
  const words = results.map((results) => results[0].text);
  return words.join("\u2003\u2003");
}

export default text2pt;
export { primaryText };
