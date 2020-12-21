<template>
  <div class="main-page">
    <div class="add-lot">
      <v-btn v-if="isAuth" @click="addLot">Добавить новый лот</v-btn>
    </div>
    <div class="lots">
      <Lot v-for="lot in lots" :key="lot.id + lot.currentRate" :item="lot"/>
    </div>
  </div>
</template>

<script>
import Lot from "@/components/Lot";

export default {
  name: 'MainPage',
  components: {Lot},
  beforeMount() {
    this.$store.dispatch('setActiveLots');
  },
  computed: {
    lots() {
      return this.$store.getters.getLots;
    },
    isAuth() {
      return this.$store.getters.getIsAuth
    }
  },
  methods: {
    addLot() {
      this.$router.push({name: 'newLot'})
    }
  }
}
</script>

<style>
.add-lot {
  display: flex;
  justify-content: flex-end;
  margin: 20px 10px 0;
}

.lots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
