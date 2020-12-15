<template>
  <div class="main-page">
    <div class="add-lot">
      <v-btn @click="addLot">Добавить новый лот</v-btn>
    </div>
    <div class="lots">
      <Lot v-for="lot in lots" :key="lot.name" :item="lot"></Lot>
    </div>
  </div>
</template>

<script>
import Lot from "@/components/Lot";

export default {
  name: 'MainPage',
  components: {Lot},
  computed: {
    lots() {
      return this.$store.getters.getLots;
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