import ajax from "axios";

interface PresidentRequest {
  year: number;
  no: number | "elect" | "winner" | "void" | "voter";
  area: number;
  granule: "country" | "county" | "district" | "village";
  type: "president";
}

interface PresidentResponse {
  no: number | "void" | "voter";
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
  no: number | "elect" | "winner" | "void" | "voter";
  area: number;
  granule: "county" | "district" | "village";
  type: "local";
}

interface LocalResponse {
  no: number | "void" | "voter";
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
  no: number | "void" | "voter";
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
  no: number | "void" | "voter";
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

interface RecallRequest {
  year: number;
  case: number;
  area: number;
  granule: "county" | "country" | "district" | "village";
  type: "recall";
  no: "winner" | "consent" | "against" | "vote" | "void";
}

interface RecallResponse {
  no: "consent" | "against" | "voter" | "void";
  countyId?: number;
  countyName?: string;
  districtId?: number;
  districtName?: string;
  villageId?: number;
  villageName?: string;
  vote: number;
}

export async function queryRecall(o: RecallRequest) {
  const ret = await ajax.get("/api/get-polls", { params: o });
  return ret.data as RecallResponse[];
}

interface ReferendumRequest {
  case: number;
  area: number;
  granule: "county" | "country" | "district" | "village";
  type: "referendum";
  no: "winner" | "consent" | "against" | "void" | "voter";
}

interface ReferendumResponse {
  no: "consent" | "against" | "voter" | "void";
  countyId?: number;
  countyName?: string;
  districtId?: number;
  districtName?: string;
  villageId?: number;
  villageName?: string;
  vote: number;
}

export async function queryReferendum(o: ReferendumRequest) {
  const ret = await ajax.get("/api/get-polls", { params: o });
  return ret.data as ReferendumResponse[];
}
