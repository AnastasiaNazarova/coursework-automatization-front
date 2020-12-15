<template>
  <div class="new-lot">
    <div class="new-lot_title">Добавление нового лота</div>
    <v-form ref="form" class="new-lot_form" lazy-validation>
      <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Наименование лота"
          required
          clearable
      ></v-text-field>

      <v-text-field
          v-model="startPrice"
          :rules="startPriceRules"
          label="Начальная ставка"
          required
          clearable
      ></v-text-field>

      <v-text-field
          v-model="quantity"
          :rules="quantityRules"
          label="Количество"
          required
          clearable
      ></v-text-field>

      <v-menu
          ref="dateMenu"
          v-model="dateMenu"
          :close-on-content-click="false"
          :return-value.sync="finalDate"
          transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="finalDate"
              :rules="finalDateRules"
              label="Дата окончания приема ставок"
              prepend-icon="mdi-calendar"
              required
              clearable
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="finalDate"
            locale="ru"
            first-day-of-week="1"
        >
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="dateMenu = false"
          >
            Отмена
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="$refs.dateMenu.save(finalDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-file-input
          :rules="pictureRules"
          placeholder="Прикрепить изображение"
          v-model="picture"
          accept=".png,.jpg"
          clearable
      />

      <div class="new-lot_form__submit">
        <v-btn
            class="mr-4"
            @click="submit"
        >
          Создать новый лот
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'NewLot',
  data() {
    return {
      name: null,
      startPrice: null,
      quantity: null,
      finalDate: null,
      picture: null,
      nameRules: [v => !!v || 'Поле обязательно для заполнения'],
      startPriceRules: [v => !!v || 'Поле обязательно для заполнения',
        v => !!(v && Number(v)) || 'Некорректное значение, введите число'],
      quantityRules: [v => !!v || 'Поле обязательно для заполнения',
        v => !!(v && Number(v)) || 'Некорректное значение, введите число'],
      finalDateRules: [v => !!v || 'Поле обязательно для заполнения'],
      pictureRules: [v => !!v || 'Поле обязательно для заполнения'],
      dateMenu: false
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        //TODO сделать отправку данных на бэк
        this.getBase64(this.picture). then(result => {
          console.log(result)
          this.$store.dispatch('addLot', {
            name: this.name,
            startPrice: this.startPrice,
            currentPrice: this.startPrice,
            quantity: this.quantity,
            finalDate: new Date(this.finalDate),
            picture: result
          }).then(() => {
            this.$router.push({name: 'mainPage'});
          });

        })
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  }
}
</script>

<style lang="scss">
.new-lot {
  margin: 20px auto;
  max-width: 600px;

  &_title {
    font-size: 20px;
    text-align: center;
    padding-bottom: 20px;
  }

  &_form {
    padding: 20px;
    width: 100%;
    border: 1px solid #ddd;

    &__submit {
      display: flex;
      justify-content: flex-end;
      margin: 10px;
    }
  }
}
</style>