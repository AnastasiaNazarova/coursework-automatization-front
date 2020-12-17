<template>
  <div class="lot">
    <v-card max-width="320">
      <v-img width="auto" height="250" :src="picture"/>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-text>
        <div>Начальная ставка: {{ initialRate }}</div>
        <div>Текущая ставка: {{ currentRate }}</div>
        <div>Количество: {{ quantity }}</div>
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
        <div class="lot_actions__count">
          <div class="btn">
            <v-btn :disabled="isDisableDeleteBtn" @click="deleteLot">-</v-btn>
            <v-btn :disabled="isDisableAddBtn" @click="addLot">+</v-btn>
          </div>
          <div>Выбрано: {{ count }}</div>
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
      name: this.item.name,
      initialRate: this.item.initialRate,
      currentRate: this.item.currentRate,
      quantity: this.item.quantity,
      salesEndDate: this.item.salesEndDate,
      picture: this.item.picture,
      count: 0,
      newPrice: null,
      newPriceRules: [v => !!v || 'Поле обязательно для заполнения',
        v => !!(v && Number(v)) || 'Некорректное значение, введите число',
        v => !!(v && Number(v) > this.currentRate) || 'Ставка должна быть выше текущей ставки']
    }
  },
  computed: {
    isDisableAddBtn() {
      return this.count >= this.quantity
    },
    isDisableDeleteBtn() {
      return this.count === 0;
    }
  },
  methods: {
    addLot() {
      if (this.$refs.newPrice.validate()) {
        this.count++;
        this.$store.dispatch('addActiveUserLot', {
          name: this.name,
          count: this.count,
          price: this.newPrice
        })
        //TODO вызов сервиса, который добавляет лот в корзину
      }
    },
    deleteLot() {
      this.count--;
      this.$store.dispatch('deleteActiveUserLot', {
        name: this.name,
        count: this.count,
        price: this.newPrice
      })
      //TODO вызов сервиса, который удаляет лот из корзины
    }
  }
}
</script>

<style lang="scss">
.lot {
  margin: 20px;

  &_actions {
    display: block !important;

    &__count {
      display: flex;
      justify-content: space-between;
    }

    .btn button {
      margin-right: 5px;
    }
  }
}
</style>
