<template>
  <div>
    <form @submit.prevent="findCandidates">
      <div class="form-group">
        <label>找候選人</label>
        <input type="text" class="form-control" maxlength="30" v-model="fc" />
      </div>
      <input type="submit" class="btn btn-primary" />
    </form>
    <form class="mt-5" @submit.prevent="findParties">
      <div class="form-group">
        <label>找政黨</label>
        <input type="text" class="form-control" maxlength="30" v-model="fp" />
      </div>
      <input type="submit" class="btn btn-primary" />
    </form>
    <div class="card mt-5" v-if="mode">
      <div class="card-body">
        <h2 class="card-title">查詢結果</h2>
        <table
          class="table table-bordered table-hover"
          @submit.prevent="findPartis"
        >
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td @click="updateName(row.id)">{{ row.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { NameIdPair } from "@/store/utils";
import * as Finder from "@/store/api/editor";
type Mode = "party" | "candidate" | "";
const NAME_LENGTH_LIMIT = 30;

@Component
export default class extends Vue {
  private rows = Array<NameIdPair>();
  private mode: Mode = "";
  private fc = "";
  private fp = "";

  private async findParties() {
    const p = this.fp.trim();
    if (p.length === 0) {
      return;
    }
    if (p.length > NAME_LENGTH_LIMIT) {
      alert("短一點拉");
      return;
    }
    const rows = await Finder.findParties({ pattern: `%${p}%` });
    if (rows.length === 0) {
      alert("找不到欸");
      return;
    }
    this.mode = "party";
    this.rows = rows;
  }

  private async findCandidates() {
    const p = this.fc.trim();
    if (p.length === 0) {
      return;
    }
    if (p.length > NAME_LENGTH_LIMIT) {
      alert("短一點拉");
      return;
    }
    const rows = await Finder.findCandidates({ pattern: `%${p}%` });
    if (rows.length === 0) {
      alert("找不到欸");
      return;
    }
    this.mode = "candidate";
    this.rows = rows;
  }

  private async updateName(id: number) {
    // TODO
    let newName = prompt("要改啥？");
    if (newName == null) return;
    newName = newName.trim();
    if (newName.length === 0) return;
    if (newName.length > NAME_LENGTH_LIMIT) {
      alert("短一點拉");
      return;
    }

    try {
      if (this.mode === "candidate") {
        await Finder.editCandidate({ id: id, name: newName });
      } else {
        await Finder.editParty({ id: id, name: newName });
      }
      const item = this.rows.find(row => row.id === id);
      if (!item) throw new Error("impossible!");
      item.name = newName;
      alert("改好了歐");
    } catch (e) {
      if (!e.response) throw e;
      const code = e.response.code;
      if (code !== 409) throw e;
      alert("這個名字有人使用了拉！");
    }
  }
}
</script>
