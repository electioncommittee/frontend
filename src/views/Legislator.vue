<template>
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
        <label>選區</label>
        <select
          class="form-control"
          required
          v-model="form.area.constituency"
          @change="onConstituencyChanged"
        >
          <!-- Inject County List -->
          <option v-for="c in select.constituencies" :key="c.id" :value="c.id">
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
        <option value="constituency">選區</option>
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
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as AreaApi from "@/store/api/area";
import * as CandidateApi from "@/store/api/candidate";
import { CandidateResponse } from "@/store/api/candidate";
import { NameIdPair, Granule, AnalTarget } from "@/store/utils";
import { ConstituencyArea as Area } from "@/store/area.ts";
import { int2ch } from "@/store/utils";

class Form {
  year = 2020;
  area = new Area();
  granule: Granule = "constituency";
  target: AnalTarget = "elect";
}

@Component
export default class extends Vue {
  private form = new Form();
  private select = {
    counties: Array<NameIdPair>(),
    constituencies: Array<NameIdPair>({ id: 0, name: "-" }),
    villages: Array<NameIdPair>(),
    candidates: Array<CandidateResponse>()
  };

  mounted() {
    this.onYearChanged();
  }

  private onYearChanged() {
    this.updateCounties();
  }

  private async updateCounties() {
    const year = this.form.year;
    this.select.counties = await AreaApi.counties({ year: year });
    this.form.area.county = 0;
  }

  private async onCountyChanged() {
    this.updateConstituencies();
  }

  private async updateConstituencies() {
    const countyId = this.form.area.county;
    this.form.area.constituency = 0;
    this.form.area.village = 0;
    if (countyId == 0) {
      this.select.constituencies = [{ id: 0, name: "-" }];
      this.select.villages = [];
      return;
    }
    const cstList = await AreaApi.constituencies({
      year: this.form.year,
      countyId: countyId
    });
    const county = this.select.counties.find(
      c => c.id == this.form.area.county
    );
    if (!county) throw "NO COUNTY FOUND";
    const countyName = county.name;
    if (cstList.length === 1) {
      this.select.constituencies = [{ id: cstList[0], name: countyName }];
      this.form.area.constituency = cstList[0];
      this.onConstituencyChanged();
    } //
    else {
      this.select.constituencies = cstList.map((id, i) => ({
        id: id,
        name: `${countyName}第${int2ch[i]}選區`
      }));
      this.select.constituencies.unshift({ id: 0, name: "-" });
      this.form.area.constituency = 0;
    }
  }

  private async onConstituencyChanged() {
    this.updateVillages();
    this.updateCandidates();
  }

  private async updateVillages() {
    const distId = this.form.area.constituency;
    this.form.area.village = 0;
    if (distId == 0) {
      this.select.villages = [];
      return;
    }
    const villList = await AreaApi.villDist({
      year: this.form.year,
      constituencyId: this.form.area.constituency
    });
    this.select.villages = villList.map(v => ({
      id: v.id,
      name: v.district + v.village
    }));
  }

  private async updateCandidates() {
    if (this.form.area.constituency == 0) {
      this.select.candidates = [];
      return;
    }
    const candidates = await CandidateApi.getPresidentCandidate({
      year: this.form.year,
      area: this.form.area.constituency,
      type: "legislator"
    });
    // Remove indicator when duplicated name appears
    // e.g. 許淑華(國) -> 許淑華
    candidates.forEach(c => (c.name = c.name.replace(/\(.*\)$/, "")));
    this.select.candidates = candidates;
  }

  private validateForm() {
    if (this.form.area.village != 0 && this.form.granule != "village")
      return false;
    return true;
  }

  private async queryPoll() {
    const v = this.validateForm();
    if (!v) {
      alert("查詢範圍與顆粒大小矛盾");
      return;
    }
  }
}
</script>

<style lang="scss" scoped></style>
