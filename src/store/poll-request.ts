export default interface PollRequest {
  year: undefined | number;
  type:
    | "president"
    | "legislator"
    | "legislator_at_large"
    | "local"
    | "referendum"
    | "recall";
  no: number | "void" | "voter" | "elect" | "winner" | "consent" | "against";
  case: undefined | number;
  area: number;
  granule: "country" | "county" | "district" | "village" | "constituency";
}
