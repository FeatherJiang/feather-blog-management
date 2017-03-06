<template>
  <div class="article">
    <div class="article-wrapper">
      <div class="profile-wrapper" v-for="n in 10">
        <profile></profile>
        <div class="btn-wrapper">
          <button id="modify-btn">modify</button>
          <button id="del-btn">delete</button>
        </div>
      </div>
      <div class="loading-wrapper" @click="getMore">
        <div class="more" v-show="showMore">
          more
        </div>
        <loading v-show="!showMore"></loading>
      </div>
    </div>
  </div>
</template>
<script>
  import profile from 'components/profile/profile'
  import loading from 'components/loading/loading'

  export default {
    data () {
      return {
        showMore: true
      }
    },
    methods: {
      getMore () {
        this.showMore = false
      }
    },
    components: {
      profile: profile,
      loading: loading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .article
    width 100%
    height 100%
    overflow auto
    .article-wrapper
      width 100%
      .profile-wrapper
        width 920px
        margin 0 auto
        font-size 0
        .profile
          display inline-block
          margin 10px 0
        .btn-wrapper
          vertical-align top
          display inline-block
          margin 10px
          #modify-btn, #del-btn
            display block
            width 100px
            height 30px
            font-size 20px
            color #4285f4
            background #f7f7f7
            border none
            border-radius 2px
            box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
            transition all .5s ease
            &:hover
              color #fff
              background #4285f4
            &:focus
              outline none
          #del-btn
            margin 10px 0 0
      .loading-wrapper
        width 920px
        margin 10px auto
        padding 5px 0
        background #fff
        border-radius 2px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        cursor pointer
        .more
          margin 0 auto
          line-height 25px
          font-size 20px
          text-align center
          color #4285f4
        .loading
          margin 0 auto
</style>
