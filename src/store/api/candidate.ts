import ajax from "axios";

interface CandidateRequest {
  year: number;
  type: "president" | "legislator" | "legislator_at_large" | "local" | "recall";
  area: number;
}

export interface CandidateResponse {
  name: string;
  id: number;
  no?: number;
}

export async function getPresidentCandidate(
  o: CandidateRequest
): Promise<CandidateResponse[]> {
  const res = await ajax.get("/api/get-candidates", { params: o });
  return res.data as CandidateResponse[];
}
