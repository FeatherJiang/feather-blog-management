<template>
  <div class="admin" ref="admin">
    <div class="nav-wrapper" ref="nav">
      <v-nav></v-nav>
    </div>
    <transition name="switch">
      <router-view :nav="this.$refs.nav">
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

      let Vue = this
      mc.on('swipeleft', function (ev) {
        if (window.screen.width < 667) {
          Vue.$refs.nav.style.left = '-50px'
        }
      })

      mc.on('swiperight', function (ev) {
        if (window.screen.width < 667) {
          Vue.$refs.nav.style.left = '0px'
        }
      })
    },
    watch: {
      '$route': function () {
        if (window.screen.width < 667) {
          this.$refs.nav.style.left = '-50px'
        }
      }
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
        position fixed
        z-index 99
        top 0
        left -50px
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
