export default class Area {
  county = 0;
  district = 0;
  village = 0;
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
}
