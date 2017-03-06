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
    </div>
  </div>
</template>
<script>
  import profile from 'components/profile/profile'

  export default {
    components: {
      profile: profile
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
        width 1000px
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
</style>
