<template>
  <div class="admin" ref="admin">
    <div class="nav-wrapper" ref="nav">
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
  import Hammer from 'hammerjs'

  export default {
    mounted () {
      var mc = new Hammer(this.$refs.admin)

      mc.on('swipeleft', function (ev) {
        this.$refs.nav.style.display = 'none'
      })

      mc.on('swiperight', function (ev) {
        this.$refs.nav.style.display = 'block'
      })
    },
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
      transition all .5s ease
    @media (max-width 667px)
      .nav-wrapper
        display none
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
