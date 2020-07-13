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
