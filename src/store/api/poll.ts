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

export async function queryPresident(o: PresidentRequest) {
  const ret = await ajax.get("/api/get-polls", { params: o });
  return ret.data as PresidentResponse[];
}

interface LocalRequest {
  year: number;
  no: number | "elect" | "winner";
  area: number;
  granule: "county" | "district" | "village";
  type: "local";
}

interface LocalResponse {
  no: number;
  countyId: number;
  countyName: string;
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

export async function queryLocal(o: LocalRequest) {
  const ret = await ajax.get("/api/get-polls", { params: o });
  return ret.data as LocalResponse[];
}

interface LegislatorRequest {
  year: number;
  no: number | "elect" | "winner";
  area: number;
  granule: "constituency" | "village";
  type: "legislator";
}

interface LegislatorResponse {
  no: number;
  countyId: number;
  countyName: string;
  constituencyId: number;
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

export async function queryLegislator(o: LegislatorRequest) {
  const ret = await ajax.get("/api/get-polls", { params: o });
  return ret.data as LegislatorResponse[];
}

interface LegislatorAtLargeRequest {
  year: number;
  no: number | "winner";
  area: number;
  granule: "county" | "country" | "district" | "village";
  type: "legislator_at_large";
}

interface LegislatorAtLargeResponse {
  no: number;
  countyId?: number;
  countyName?: string;
  districtId?: number;
  districtName?: string;
  villageId?: number;
  villageName?: string;
  partyId: number;
  partyName: string;
  vote: number;
}

export async function queryLegislatorAtLarge(o: LegislatorAtLargeRequest) {
  const ret = await ajax.get("/api/get-polls", { params: o });
  return ret.data as LegislatorAtLargeResponse[];
}
