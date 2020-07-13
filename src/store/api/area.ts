import ajax from "axios";
import { NameIdPair } from "../utils";

interface QCData {
  year: number;
}

interface QDData {
  year: number;
  countyId: number;
}

interface QVData {
  year: number;
  countyId: number;
  districtId: number;
}

export async function counties(o: QCData): Promise<NameIdPair[]> {
  const res = await ajax.get("/api/get-counties", { params: o });
  return res.data as NameIdPair[];
}

export async function districts(o: QDData): Promise<NameIdPair[]> {
  const res = await ajax.get("/api/get-districts", { params: o });
  return res.data as NameIdPair[];
}

export async function villages(o: QVData): Promise<NameIdPair[]> {
  const res = await ajax.get("/api/get-villages", { params: o });
  return res.data as NameIdPair[];
}
