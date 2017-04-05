<template>
  <div class="banner" ref="banner">
    <bannerset v-for="(banner, index) in bannerList" :banner="banner" :key="banner"></bannerset>
  </div>
</template>
<script>
  import Hammer from 'hammerjs'

  import bannerset from 'components/bannerset/bannerset'

  const OK = 1

  export default {
    props: {
      nav: {
        type: HTMLDivElement
      }
    },
    data () {
      return {
        bannerList: []
      }
    },
    created () {
      let Vue = this
      this.$http.post('api/getBannerList', null)
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            Vue.bannerList = res.data
          }
        })
        .catch(function (error) {
          console.log(error.toString())
        })
    },
    mounted () {
      var mc = new Hammer(this.$refs.banner)

      let Vue = this
      mc.on('swipeleft', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '-50px'
          Vue.$refs.banner.style.left = '0'
        }
      })

      mc.on('swiperight', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '0px'
          Vue.$refs.banner.style.left = '50px'
        }
      })
    },
    components: {
      bannerset: bannerset
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .banner
    width 100%
    overflow auto
    -webkit-overflow-scrolling: touch
  @media (max-width: 667px)
    .banner
      position relative
      padding 0 10px
      box-sizing border-box
      transition all .5s ease
</style>
