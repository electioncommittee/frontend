<template>
  <div>
    <form @submit.prevent="queryPoll">
      <div class="form-group">
        <label>年份</label>
        <select
          required
          class="form-control"
          name="year"
          v-model="form.year"
          @change="onYearChanged"
        >
          <option value="2012">2012</option>
          <option value="2016">2016</option>
          <option value="2020">2020</option>
        </select>
      </div>
      <div class="row">
        <div class="col-sm-4 form-group">
          <label>縣市</label>
          <select
            class="form-control"
            required
            v-model="form.area.county"
            @change="onCountyChanged"
          >
            <option value="0">全國</option>
            <!-- Inject County List -->
            <option v-for="c in select.counties" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
        <div class="col-sm-4 form-group">
          <label>鄉鎮市區</label>
          <select
            class="form-control"
            required
            v-model="form.area.district"
            @change="onDistrictChanged"
          >
            <option value="0">-</option>
            <!-- Inject County List -->
            <option v-for="c in select.districts" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
        <div class="col-sm-4 form-group">
          <label>村里</label>
          <select class="form-control" required v-model="form.area.village">
            <option value="0">-</option>
            <!-- Inject County List -->
            <option v-for="c in select.villages" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>顆粒</label>
        <select
          class="form-control"
          required
          name="granules"
          v-model="form.granule"
        >
          <option value="country">全國</option>
          <option value="county">縣市</option>
          <option value="district">鄉鎮市區</option>
          <option value="village">村里</option>
        </select>
      </div>
      <div class="form-group">
        <label>對象</label>
        <select class="form-control" required v-model="form.target">
          <option value="elect">當選者</option>
          <option value="winner">領先者</option>
          <!-- Inject County List -->
          <option v-for="t in select.candidates" :key="t.no" :value="t.no">
            ({{ t.no }}) {{ t.name }}
          </option>
        </select>
      </div>
      <input type="submit" class="btn btn-primary" />
    </form>
    <table class="table table-hover mt-5">
      <thead>
        <tr>
          <th>地區</th>
          <th>票數</th>
          <th>得票者</th>
          <th>政黨</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in pollData" :key="i">
          <td>
            {{
              row.countyName
                ? row.countyName +
                  (row.districtName || "") +
                  (row.villageName || "")
                : "全國"
            }}
          </td>
          <td>{{ row.vote }}</td>
          <td>{{ row.candidateName }}</td>
          <td>{{ row.partyName || "無黨籍" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as AreaApi from "@/store/api/area";
import * as PollApi from "@/store/api/poll";
import * as CandidateApi from "@/store/api/candidate";
import { CandidateResponse } from "@/store/api/candidate";
import { NameIdPair } from "@/store/utils";
import Area from "@/store/area.ts";

type Granule = "county" | "country" | "district" | "village";
type AnalNo = "elect" | "winner" | number;
class Form {
  year = 2020;
  area = new Area();
  granule: Granule = "country";
  target: AnalNo = "elect";
}

interface PollData {
  vote: number;
  villageName?: string;
  districtName?: string;
  countyName?: string;
  candidateName: string;
  partyName: string;
}

@Component
export default class extends Vue {
  private form = new Form();
  private select = {
    counties: Array<NameIdPair>(),
    districts: Array<NameIdPair>(),
    villages: Array<NameIdPair>(),
    candidates: Array<CandidateResponse>()
  };
  private pollData = Array<PollData>();

  mounted() {
    this.onYearChanged();
  }

  private onYearChanged() {
    this.updateCounties();
    this.updateCandidates();
  }

  private async updateCounties() {
    const year = this.form.year;
    this.select.counties = await AreaApi.counties({ year: year });
    this.form.area.county = 0;
  }

  private onCountyChanged() {
    this.updateDistrict();
  }

  private async updateDistrict() {
    const countyId = this.form.area.county;
    this.form.area.district = 0;
    this.form.area.village = 0;
    if (countyId == 0) {
      this.select.districts = [];
      this.select.villages = [];
      return;
    }
    this.select.districts = await AreaApi.districts({
      year: this.form.year,
      countyId: countyId
    });
  }

  private async onDistrictChanged() {
    this.updateVillages();
  }

  private async updateVillages() {
    const distId = this.form.area.district;
    this.form.area.village = 0;
    if (distId == 0) {
      this.select.villages = [];
      return;
    }
    this.select.villages = await AreaApi.villages({
      year: this.form.year,
      countyId: this.form.area.county,
      districtId: distId
    });
  }

  private async updateCandidates() {
    const candidates = await CandidateApi.getPresidentCandidate({
      year: this.form.year,
      area: 0,
      type: "president"
    });
    this.select.candidates = candidates;
  }

  private validateForm() {
    if (this.form.area.village != 0 && this.form.granule != "village")
      return false;
    if (
      this.form.area.district != 0 &&
      this.form.granule != "village" &&
      this.form.granule != "district"
    )
      return false;
    if (this.form.area.county != 0 && this.form.granule == "country")
      return false;
    return true;
  }

  private async queryPoll() {
    const v = this.validateForm();
    if (!v) {
      alert("查詢範圍與顆粒大小矛盾");
      return;
    }

    this.pollData = await PollApi.queryPresident({
      type: "president",
      year: this.form.year,
      area: this.form.area.id,
      granule: this.form.granule,
      no: this.form.target
    });
  }
}
</script>

<style lang="scss" scoped></style>
