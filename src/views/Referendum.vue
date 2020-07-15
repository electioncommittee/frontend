<template>
  <div>
    <form @submit.prevent="queryPoll">
      <div class="form-group">
        <label>案次</label>
        <select required class="form-control" v-model="form.case">
          <option v-for="n in 10" :key="n" :value="n + 6">{{ n + 6 }}</option>
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
          <option value="winner">領先方</option>
          <option value="consent">贊成方</option>
          <option value="against">反對方</option>
        </select>
      </div>
      <input type="submit" class="btn btn-primary" />
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as AreaApi from "@/store/api/area";
import { CandidateResponse } from "@/store/api/candidate";
import { NameIdPair, Granule, AnalTarget } from "@/store/utils";
import Area from "@/store/area.ts";

class Form {
  case = 7;
  area = new Area();
  granule: Granule = "country";
  target: AnalTarget = "winner";
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

  mounted() {
    this.updateCounties();
  }

  private async updateCounties() {
    this.select.counties = await AreaApi.counties({ year: 2018 });
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
      year: 2018,
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
      year: 2018,
      countyId: this.form.area.county,
      districtId: distId
    });
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
  }
}
</script>

<style lang="scss" scoped></style>
