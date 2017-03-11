<template>
  <div class="insertpanel">
    <span class="close" @click="hidePanel"><i class="fa fa-close"></i></span>
    <div class="img-wrapper">
      <img src="" alt="">
    </div>
    <div class="input-wrapper">
      upload
      <input id="file" type="file">
    </div>
    <button id="confirm">confirm</button>
  </div>
</template>
<script>
  import {bus} from '../../assets/js/bus.js'

  export default {
    props: {
      panelShow: {
        type: Boolean
      }
    },
    data () {
      return {
        imgLink: ''
      }
    },
    methods: {
      hidePanel () {
        bus.$emit('hideInsertPanel', false)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .insertpanel
    position relative
    width 500px
    margin 5% auto 0
    padding 20px 20px
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    box-sizing border-box
    .close
      position absolute
      top 10px
      right 10px
      font-size 20px
      color #d1d1d1
      &:hover
        color #4285f4
    .img-wrapper
      text-align center
      img
        width 200px
    .input-wrapper
      position relative
      left 50%
      width 100px
      height 30px
      margin 20px 0 20px -50px
      text-align center
      line-height 30px
      font-size 18px
      color #4285f4
      background #f7f7f7
      border-radius 2px
      box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      transition all 0.5s ease
      &:hover
        color #fff
        background #4285f4
      #file
        position absolute
        top 0
        left 0
        width 100px
        height 30px
        opacity 0
    #confirm
      display block
      width 100px
      height 30px
      margin 0 auto
      font-size 20px
      color #4285f4
      background #f7f7f7
      border none
      border-radius 2px
      box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      transition all 0.5s ease
      &:hover
        color #fff
        background #4285f4
</style>
