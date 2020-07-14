import ajax from "axios";
import { NameIdPair } from "../utils";

interface CountyRequest {
  year: number;
}

interface DistrictRequest {
  year: number;
  countyId: number;
}

interface VillageRequest {
  year: number;
  countyId: number;
  districtId: number;
}

interface ConstituencyRequest {
  year: number;
  countyId: number;
}

interface VillDistRequest {
  year: number;
  constituencyId: number;
}

interface VillDistResponse {
  id: number;
  village: string;
  district: string;
}

export async function counties(o: CountyRequest): Promise<NameIdPair[]> {
  const res = await ajax.get("/api/get-counties", { params: o });
  return res.data as NameIdPair[];
}

export async function districts(o: DistrictRequest): Promise<NameIdPair[]> {
  const res = await ajax.get("/api/get-districts", { params: o });
  return res.data as NameIdPair[];
}

export async function villages(o: VillageRequest): Promise<NameIdPair[]> {
  const res = await ajax.get("/api/get-villages", { params: o });
  return res.data as NameIdPair[];
}

export async function villDist(
  o: VillDistRequest
): Promise<VillDistResponse[]> {
  const res = await ajax.get("/api/get-villages", { params: o });
  return res.data as VillDistResponse[];
}

export async function constituencies(
  o: ConstituencyRequest
): Promise<number[]> {
  const res = await ajax.get("/api/get-constituencies", { params: o });
  return res.data.map(
    (row: { constituency: number }) => row.constituency
  ) as number[];
}
