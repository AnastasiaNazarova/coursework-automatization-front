<template>
  <div class="lot">
    <v-card max-width="320">
      <v-img width="auto" height="300" :src="picture"/>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-text>
        <div>Начальная ставка: {{ initialRate }}</div>
        <div>Текущая ставка: {{ currentRate }}</div>
        <div>Дата окончания приема ставок: {{ salesEndDate }}</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="lot_actions">
        <div class="lot_actions__price">
          <v-text-field
              ref="newPrice"
              v-model="newPrice"
              :rules="newPriceRules"
              placeholder="Введите значение ставки"
              required
              clearable
          ></v-text-field>
        </div>
        <div class="lot_actions__submit">
          <v-btn text :disabled="isDisableAddRateBtn" @click="addRate">Сделать ставку</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Lot',
  props: {
    item: Object
  },
  data() {
    return {
      id: this.item.id,
      name: this.item.name,
      initialRate: this.item.initialRate,
      currentRate: this.item.currentRate,
      salesEndDate: new Date(this.item.salesEndDate).toLocaleDateString(),
      picture: this.item.picture,
      newPrice: null,
      newPriceRules: [v => !!v || 'Поле обязательно для заполнения',
        v => !!(v && Number(v) && (Number(v) ^ 0) === Number(v)) || 'Некорректное значение, введите целое число',
        v => !!(v && Number(v) > this.currentRate) || 'Ставка должна быть выше текущей ставки']
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.getIsAuth
    },
    isDisableAddRateBtn() {
      return !this.isAuth || !this.isCorrectValue
    },
    isCorrectValue() {
      return this.newPrice
          && Number(this.newPrice)
          && Number(this.newPrice) > this.currentRate
          && (Number(this.newPrice) ^ 0) === Number(this.newPrice)
    }
  },
  methods: {
    addRate() {
      this.$store.dispatch('addRate', {
        lotId: this.id,
        price: Number(this.newPrice),
        userId: this.$store.getters.getUserInfo.id,
        isActive: true
      }).then(() => {
        // this.newPrice = null
        this.$store.dispatch('setActiveLots');
      })
    }
  }
}
</script>

<style lang="scss">
.lot {
  margin: 20px;

  &_actions {
    display: block !important;

    &__submit {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
}
</style>
