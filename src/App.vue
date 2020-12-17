<template>
  <v-app>
    <Header/>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: 'App',
  components: { Header },
  beforeMount() {
    this.checkIsAuth();
  },
  methods: {
    checkIsAuth() {
      const isAuth = sessionStorage.getItem('isAuth');
      if (isAuth) {
        this.$store.commit('setIsAuth', isAuth);
      }
    }
  }
};
</script>

<style>
.v-application--wrap header {
  height: 64px !important;
}

.app-content {
  margin-top: 64px;
}

.v-menu__content {
  min-width: 0 !important;
  margin: 0 auto;
}
</style>
