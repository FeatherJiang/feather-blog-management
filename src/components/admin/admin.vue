<template>
  <div class="admin">
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <transition name="switch">
      <router-view>
      </router-view>
    </transition>
  </div>
</template>
<script>
  import nav from 'components/nav/nav'

  export default {
    components: {
      'v-nav': nav
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .admin
    display flex
    width 100%
    height 100%
    .nav-wrapper
      flex 0 0 50px
      height 100%
      background #4285f4
    .main
      flex 1
      height 100%
  .switch-enter-active, .switch-leave-active
    transition all 0.5s ease
  .switch-enter
    position fixed
    left 50px
    transform translate(0, 100%)
  .switch-leave-active
    position fixed !important
    left 50px
    transform translate(0, -100%)
</style>
