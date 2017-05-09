<template>
  <div class="bannerset">
    <div class="img-wrapper">
      <img :src="banner.img" alt="" ref="img">
      <div class="input-wrapper">
        upload
        <input id="file" type="file" @change="addImg" ref="fileImg">
      </div>
    </div>
    <div class="link-wrapper">
      <label class="text" for="link">link</label>
      <input type="text" id="link" v-model="link">
    </div>
    <div class="btn-wrapper">
      <button id="confirm" type="button" @click="updateBanner">confirm</button>
      <transition name="slip">
        <div class="hint" v-show="hintShow">{{text}}</div>
      </transition>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  const OK = 1

  export default {
    props: {
      banner: {
        type: Object
      }
    },
    data () {
      return {
        link: this.banner.link,
        hintShow: false,
        text: 'error',
        cancel: null
      }
    },
    methods: {
      addImg () {
        let resultFile = this.$refs.fileImg.files[0]
        let url = null
        if (window.createObjectURL !== undefined) {
          url = window.createObjectURL(resultFile)
        } else if (window.URL !== undefined) {
          url = window.URL.createObjectURL(resultFile)
        } else if (window.webkitURL !== undefined) {
          url = window.webkitURL.createObjectURL(resultFile)
        }
        if (url) {
          this.$refs.img.setAttribute('src', url)
        }
      },
      updateBanner () {
        let Vue = this

        // 防止表单重复提交
        if (Vue.cancel !== null) {
          Vue.cancel()
        }

        var CancelToken = axios.CancelToken

        let formData = new FormData()
        if (this.$refs.fileImg.value !== '') {
          formData.append('img', this.$refs.fileImg.files[0])
        } else {
          formData.append('img', this.banner.img)
        }

        formData.append('link', this.link)
        formData.append('id', this.banner.id)
        formData.append('token', sessionStorage.getItem('token'))

        this.$http.post('api/updateBanner', formData, {
          cancelToken: new CancelToken(function executor (c) {
            // An executor function receives a cancel function as a parameter
            Vue.cancel = c
          })
        })
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              Vue.text = 'success'
              Vue.hintShow = true

              setTimeout(function () {
                Vue.hintShow = false
              }, 2000)
            } else {
              Vue.text = 'error'
              Vue.hintShow = true

              setTimeout(function () {
                Vue.hintShow = false
              }, 2000)
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .bannerset
    width 500px
    padding 20px
    margin 20px auto
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    box-sizing border-box
    .img-wrapper
      img
        display block
        width 300px
        margin 20px auto 0
        border-radius 2px
      @media (max-width 667px)
        img
          width 100%
      .input-wrapper
        position relative
        left 50%
        width 100px
        height 30px
        margin 20px 0 0 -50px
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
    .link-wrapper
      width 460px
      height 30px
      margin 20px 0
      font-size 0
      border-radius 5px
      box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      .text
        display inline-block
        width 80px
        height 30px
        vertical-align top
        text-align center
        line-height 30px
        font-size 18px
        color #fff
        background #4285f4
        border-radius 5px 0 0 5px
      @media (max-width 667px)
        .text
          flex 0 0 80px
      #link
        display inline-block
        width 380px
        min-width 60px
        height 30px
        vertical-align top
        line-height 30px
        font-size 16px
        text-indent 10px
        background #f7f7f7
        border-radius 0 5px 5px 0
        box-sizing border-box
        &:focus
          background #fff
          border 2px solid #4285f4
          border-left none
          outline none
      @media (max-width 667px)
        #link
          flex 1 1 auto
    @media (max-width 667px)
      .link-wrapper
        display flex
        width 100%
    .btn-wrapper
      position relative
      margin 30px 0
      height 30px
      text-align center
      #confirm
        position absolute
        z-index 2
        top 0
        left 50%
        width 100px
        height 30px
        margin 0 0 0 -50px
        text-align center
        line-height 30px
        font-size 18px
        color #4285f4
        background #f7f7f7
        border none
        border-radius 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        transition all 0.5s ease
        &:hover
          color #fff
          background #4285f4
      .hint
        position absolute
        z-index 1
        top 30px
        left 50%
        width 80px
        height 20px
        margin 0 0 0 -40px
        text-align center
        line-height 20px
        font-size 16px
        color #f92452
        background #f7f7f7
        border-radius 0 0 5px 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      .slip-enter-active, .slip-leave-active
        transition all 0.5s
      .slip-enter, .slip-leave-active
        transform translate(0,-30px)
  @media (max-width 667px)
    .bannerset
      width 100%
</style>
