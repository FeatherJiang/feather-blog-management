<template>
  <div class="insertpanel">
    <div class="insertpanel-main">
      <form class="insertpanel-inner" ref="insertForm">
        <span class="close" @click="hidePanel"><i class="fa fa-close"></i></span>
        <div class="img-wrapper">
          <img src="/images/default.png" alt="" ref="img">
        </div>
        <div class="input-wrapper">
          upload
          <input id="file" type="file" name="img" ref="fileImg" @change="addImg">
        </div>
        <button id="confirm" type="button" @click="insertImg">confirm</button>
      </form>
    </div>
  </div>
</template>
<script>
  import {bus} from '../../assets/js/bus.js'

  const OK = 1

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
        this.$refs.img.setAttribute('src', '/images/default.png')
        this.$refs.insertForm.reset()
        bus.$emit('hideInsertPanel', false)
      },
      addImg () {
        let resultFile = this.$refs.fileImg.files[0]
        let url = null
        if (window.createObjectURL !== undefined) { // basic
          url = window.createObjectURL(resultFile)
        } else if (window.URL !== undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(resultFile)
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(resultFile)
        }
        if (url) {
          this.$refs.img.setAttribute('src', url)
        }
      },
      insertImg () {
        let Vue = this
        if (this.$refs.fileImg.value) {
          this.$http.post('/api/insertImg', new FormData(Vue.$refs.insertForm))
            .then(function (response) {
              let res = response.data
              if (res.code === OK) {
                console.log(res.data.imgLink)
                bus.$emit('insertImg', res.data.imgLink)
                Vue.hidePanel()
              }
            })
            .catch(function (error) {
              console.log(error.toString())
            })
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .insertpanel
    position fixed
    z-index 99
    top 0
    right 0
    bottom 0
    left 0
    background rgba(0,0,0,0.4)
    overflow auto
    .insertpanel-main
      width 500px
      margin 50px auto
    .insertpanel-inner
      position relative
      width 100%
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
        margin 20px 0 0
        img
          width 300px
          border-radius 2px
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
