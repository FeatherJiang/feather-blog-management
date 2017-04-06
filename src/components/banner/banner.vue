<template>
  <div class="banner" ref="banner">
    <div class="load-article" v-if="(bannerList === null || bannerList.length == 0) || loadingShow">
      <span  v-if="(bannerList === null || bannerList.length == 0) && !loadingShow">no article</span>
      <loading v-if="loadingShow"></loading>
    </div>
    <bannerset v-for="(banner, index) in bannerList" :banner="banner" :key="banner"></bannerset>
  </div>
</template>
<script>
  import Hammer from 'hammerjs'

  import bannerset from 'components/bannerset/bannerset'
  import loading from 'components/loading/loading'

  const OK = 1

  export default {
    props: {
      nav: {
        type: HTMLDivElement
      }
    },
    data () {
      return {
        bannerList: [],
        loadingShow: true
      }
    },
    created () {
      let Vue = this
      this.$http.post('api/getBannerList', null)
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            Vue.bannerList = res.data
            Vue.loadingShow = false
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
      bannerset: bannerset,
      loading: loading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .banner
    width 100%
    overflow auto
    -webkit-overflow-scrolling: touch
    .load-article
      width 920px
      height 25px
      margin 10px auto
      padding 5px 0
      text-align center
      line-height 25px
      font-size 20px
      color #4285f4
      background #fff
      box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      border-radius 2px
      .loading
        text-align justify
        margin 0 auto
    @media (max-width 1024px)
      .load-article
        width 100%
  @media (max-width: 667px)
    .banner
      position relative
      padding 0 10px
      box-sizing border-box
      transition all .5s ease
</style>
