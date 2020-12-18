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
      <rates-table
          v-if="isShowTable"
          :is-active-rates="isActiveRates"
      />
<!--      <user-info v-if="isShowUserInfo"/>-->
    </v-tab-item>
  </v-tabs-items>
</div>
</template>

<script>
import RatesTable from "@/components/RatesTable";
import UserInfo from "@/components/UserInfo";

export default {
  name: 'Cabinet',
  components: {
    RatesTable,
    UserInfo
  },
  data () {
    return {
      tab: null,
      items: [
        'Активные сделки', 'Завершенные сделки'/*, 'Личная информация'*/
      ],
      headers: [],
      products: []
    }
  },
  computed: {
    isShowTable() {
      return [0, 1].includes(this.tab)
    },
    isActiveRates() {
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