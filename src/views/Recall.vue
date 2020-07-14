<template>
  <form @submit.prevent="queryPoll">
    <div class="form-group">
      <label>案次</label>
      <select required class="form-control" disabled>
        <option value="888" selected>韓國瑜罷免案</option>
      </select>
    </div>
    <div class="row">
      <div class="col-sm-4 form-group">
        <label>縣市</label>
        <select class="form-control" required disabled>
          <option value="16" selected>高雄市</option>
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
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as AreaApi from "@/store/api/area";
import { CandidateResponse } from "@/store/api/candidate";
import { NameIdPair, Granule, AnalTarget } from "@/store/utils";

class Form {
  case = 7;
  area = {
    county: 16,
    district: 0,
    village: 0
  };
  granule: Granule = "county";
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
    this.updateDistrict();
  }

  private async updateDistrict() {
    const countyId = 16;
    this.form.area.district = 0;
    this.form.area.village = 0;
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
