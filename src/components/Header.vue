<template>
  <v-app-bar app>
    <v-toolbar-title>Аукцион</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="isAuth">
      <v-btn text @click="openCabinet">{{ login }}</v-btn>
      <v-btn text @click="logout">Выйти</v-btn>
    </div>
    <div v-else>
      <v-dialog
          v-model="authForm"
          persistent
          max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              text
              v-bind="attrs"
              v-on="on"
              @click="openAuthForm"
          >
            Войти
          </v-btn>
          <v-btn
              text
              v-bind="attrs"
              v-on="on"
          >
            Зарегистрироваться
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Авторизация</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" lazy-validation>
                <v-row>
                  <v-col
                      v-if="isOpenRegistrationForm"
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="surname"
                        :rules="surnameRules"
                        label="Фамилия"
                        required
                    />
                  </v-col>
                  <v-col
                      v-if="isOpenRegistrationForm"
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Имя"
                        required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        v-model="login"
                        :rules="loginRules"
                        label="Email"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="Пароль"
                        type="password"
                        required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="closeAuthForm"
            >
              Закрыть
            </v-btn>
            <v-btn
                v-if="isOpenAuthForm"
                color="blue darken-1"
                text
                @click="signIn"
            >
              Войти
            </v-btn>
            <v-btn
                v-if="isOpenRegistrationForm"
                color="blue darken-1"
                text
                @click="signUp"
            >
              Зарегистрироваться
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      authForm: false,
      surname: null,
      surnameRules: [v => !!v || 'Введите фамилию'],
      name: null,
      nameRules: [v => !!v || 'Введите имя'],
      login: null,
      loginRules: [v => !!v || 'Введите логин'],
      password: null,
      passwordRules: [v => !!v || 'Введите пароль'],
      isOpenAuthForm: false,
      isOpenRegistrationForm: false
    }
  },
  computed: {
    isAuth() {
      const auth = this.$store.getters.getIsAuth
      if (auth) {
        this.login = this.$store.getters.getUserInfo.login
      }
      return auth
    }
  },
  methods: {
    openAuthForm() {
      this.isOpenAuthForm = true;
    },
    openRegistrationForm() {
      this.isOpenRegistrationForm = true;
    },
    closeAuthForm() {
      this.authForm = false;
      this.isOpenAuthForm = false;
      this.isOpenRegistrationForm = false;
      this.login = null;
      this.password = null;
    },
    signIn() {
      if (this.$refs.form.validate()) {
        //TODO
        this.$store.commit('setUserInfo', {login: this.login})
        this.$store.commit('setIsAuth', true);
        this.closeAuthForm();
      }
    },
    signUp() {
      if (this.$refs.form.validate()) {
        //TODO
        this.closeAuthForm();
      }
    },
    openCabinet() {
      this.$router.push({name: 'cabinet'})
    },
    logout() {
      this.$store.commit('setUserInfo', null)
      this.$store.commit('setIsAuth', false);
    }
  }
}
</script>

<style lang="scss">
.v-toolbar__content {
  justify-content: center;
}
</style>