<template>
<div class="cabinet">
  <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
  >
    <v-tab
        v-for="item in items"
        :key="item"
    >
      {{ item }}
    </v-tab>
  </v-tabs>

  <v-tabs-items v-model="tab">
    <v-tab-item
        v-for="item in items"
        :key="item"
    >
      <lots-table
          v-if="isShowTable"
          :is-active-lots="isActiveLots"
      />
      <user-info v-if="isShowUserInfo"/>
<!--      <v-card-->
<!--          color="basil"-->
<!--          flat-->
<!--      >-->
<!--        <v-card-text>{{ text }}</v-card-text>-->
<!--      </v-card>-->
    </v-tab-item>
  </v-tabs-items>
</div>
</template>

<script>
import LotsTable from "@/components/LotsTable";
import UserInfo from "@/components/UserInfo";

export default {
  name: 'Cabinet',
  components: {
    LotsTable,
    UserInfo
  },
  data () {
    return {
      tab: null,
      items: [
        'Активные сделки', 'Завершенные сделки', 'Личная информация'
      ],
      headers: [],
      products: []
    }
  },
  computed: {
    isShowTable() {
      return [0, 1].includes(this.tab)
    },
    isActiveLots() {
      return this.tab === 0
    },
    isShowUserInfo() {
      return this.tab === 2
    }
  }
}
</script>

<style>

</style>