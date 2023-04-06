export type PtElement = {
  number: number;
  symbol: string;
  name: string;
  text: string;
  atomic_mass: number;
  category: string;
};

export type PtElements = PtElement[];

// A word where some letters are replaced by elements
export type PtTextArray = (string | PtElement)[];

export type PtResult = {
  result: PtTextArray;
  text: string;
  missing: number; // number of letters that are not replaced by elements
};

export type PtResults = PtResult[];
