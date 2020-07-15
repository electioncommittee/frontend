export default class Area {
  county: number;
  district: number;
  village: number;
  constructor(c = 0, d = 0, v = 0) {
    this.county = c;
    this.district = d;
    this.village = v;
  }
  get id(): number {
    if (this.village) return this.village;
    if (this.district) return this.district;
    if (this.county) return this.county;
    return 0;
  }
}

export class ConstituencyArea {
  county = 0;
  constituency = 0;
  village = 0;
  get id(): number {
    if (this.village) return this.village;
    if (this.constituency) return this.constituency;
    if (this.county) return this.county;
    return 0;
  }
}
