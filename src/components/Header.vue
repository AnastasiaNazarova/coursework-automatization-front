<template>
  <v-app-bar app>
    <v-toolbar-title class="header-title" @click="goHome">О РСО</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title class="header-title" id = "openStaff" @click="openStaff">Штабы</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title class="header-title" id = "openGroup" @click="openGroup">Отряды</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title class="header-title" @click="openMemberRSO">Члены РСО</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {

    openStaff()
    {
      if (this.$route.name !== 'staff') {
        this.$router.push({name: 'staff'});
      }
    },
    openGroup()
    {
      if (this.$route.name !== 'group') {
        this.$router.push({name: 'group'});
      }
    },

    openMemberRSO()
    {
        if (this.$route.name !== 'memberRSO') {
            this.$router.push({name: 'memberRSO'});
        }
    },

    goHome() {
      if (this.$route.name !== 'mainPage') {
        this.$router.push({name: 'mainPage'});
      }
    }
  }
}
</script>

<style lang="scss">
.header-title {
  cursor: pointer;
}
.v-toolbar__content {
  justify-content: center;
}
</style>
