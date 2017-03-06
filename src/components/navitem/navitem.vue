<template>
  <router-link class="navitem" tag="a" :to="routerLink">
    <div class="icon"><i class="fa" :class="fontClass"></i></div>
    <div class="hint">{{hintText}}</div>
  </router-link>
</template>
<script>
  export default {
    props: {
      routerLink: {
        type: String
      },
      fontClass: {
        type: String
      },
      hintText: {
        type: String
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/font-awesome.min.css"

  .navitem
    position relative
    display block
    height 40px
    &.router-link-active
      .icon
        background #fff
        .fa
          color #4285f4
    &:hover
      .icon
        background #fff
        .fa
          color #4285f4
      .hint
        left 50px
        background #fff
    .icon
      position absolute
      z-index 2
      width 50px
      height 40px
      text-align center
      background #4285f4
      transition all 0.5s ease
      .fa
        line-height 40px
        font-size 20px
        color #fff
        transition all 0.5s ease
    .hint
      position absolute
      z-index 1
      left -30px
      height 40px
      padding 0 5px
      text-align center
      line-height 40px
      font-size 20px
      color #4285f4
      background #4285f4
      border-right 4px solid #4285f4
      box-sizing border-box
      transition all 0.5s ease
</style>
