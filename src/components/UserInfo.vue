<template>
  <div class="user-info">
    <div class="user-info_name">
      {{userName}}
    </div>
  </div>
</template>

<script>
export default  {
  name: 'UserInfo',
  computed: {
    user() {
      return this.$store.getters.getUserInfo
    },
    userName() {
      return `${this.user.surname} ${this.user.name}`
    }
  }
}
</script>

<style lang="scss">
.user-info {
  &_name {
    width: 100%;
    text-align: center;
  }
}

</style>