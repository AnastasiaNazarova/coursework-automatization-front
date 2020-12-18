<template>
  <div class="lots-table">
    <v-data-table
        :headers="headers"
        :items="rates"
        item-key="id"
        :no-data-text="noDataText"
        :footer-props="footerProps"
    />
  </div>
</template>

<script>
export default {
  name: 'RatesTable',
  props: {
    isActiveRates: Boolean
  },
  data() {
    return {
      headers: [
        {
          text: 'Наименование',
          value: 'lot.name'
        },
        {
          text: 'Ставка',
          value: 'price'
        },
        {
          text: 'Окончание сделки',
          value: 'lot.salesEndDate'
        }
      ],
      footerProps: {
        'items-per-page-all-text': 'Все',
        'items-per-page-text': 'Кол-во ставок на странице',
        'items-per-page-options': [5, 10, 20, -1],
        'page-text': ''
      }
    }
  },
  beforeMount() {
    this.$store.dispatch('setRates', this.$store.getters.getUserInfo.id);
  },
  computed: {
    initialRates() {
      return this.isActiveRates
          ? this.$store.getters.getActiveUserRates
          : this.$store.getters.getClosedUserRates;
    },
    rates() {
      return this.initialRates.map(rate => {
        const newRate = Object.assign({}, rate);
        newRate.lot = Object.assign({}, rate.lot);
        newRate.lot.salesEndDate = new Date(newRate.lot.salesEndDate).toLocaleDateString();
        return newRate
      })
    },
    noDataText() {
      return this.isActiveRates ? "Активных ставок не найдено" : "Завершенных ставок не найдено"
    }
  }
}
</script>

<style lang="scss">
.lots-table {
  display: flex;
  justify-content: center;

  .v-data-table__wrapper {
    width: auto !important;
  }
}

.actions-icon {
  margin: 0 5px;
}
</style>