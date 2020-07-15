import ajax from "axios";

interface PresidentRequest {
  year: number;
  no: number | "elect" | "winner";
  area: number;
  granule: "country" | "county" | "district" | "village";
  type: "president";
}

interface PresidentResponse {
  no: number;
  countyId?: number;
  countyName?: string;
  districtId?: number;
  districtName?: string;
  villageId?: number;
  villageName?: string;
  candidateId: number;
  candidateName: string;
  partyId: number;
  partyName: string;
  vote: number;
}

export async function queryPresident(
  o: PresidentRequest
): Promise<PresidentResponse[]> {
  const ret = await ajax.get("/api/get-polls", { params: o });
  return ret.data as PresidentResponse[];
}
