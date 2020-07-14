export interface NameIdPair {
  name: string;
  id: number;
}

export interface OptionInput {
  value: string;
  text: string;
}

export type Granule =
  | "country"
  | "county"
  | "constituency"
  | "district"
  | "village";
export type AnalTarget =
  | number
  | "winner"
  | "elect"
  | "consent"
  | "agaonst"
  | "void"
  | "voter";

export const int2ch = [
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
  "十一",
  "十二"
];
