import ajax from "axios";
import { NameIdPair } from "@/store/utils";

interface PatternRequest {
  pattern: string;
}

interface RenameRequest {
  id: number;
  name: string;
}

export async function findCandidates(o: PatternRequest) {
  const res = await ajax("/api/find-candidates", { params: o });
  return res.data as NameIdPair[];
}

export async function findParties(o: PatternRequest) {
  const res = await ajax("/api/find-parties", { params: o });
  return res.data as NameIdPair[];
}

export async function editCandidate(o: RenameRequest) {
  await ajax.post("/api/update-candidate", o);
}

export async function editParty(o: RenameRequest) {
  await ajax.post("/api/update-party", o);
}
