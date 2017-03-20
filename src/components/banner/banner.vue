<template>
  <div class="banner">
    <bannerset v-for="(banner, index) in bannerList" :banner="banner" :key="banner"></bannerset>
  </div>
</template>
<script>
  import bannerset from 'components/bannerset/bannerset'

  const OK = 1

  export default {
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
    components: {
      bannerset: bannerset
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .banner
    width 100%
    overflow auto
</style>
