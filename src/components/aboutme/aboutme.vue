<template>
  <div class="aboutme" ref="aboutme">
    <div class="input-wrapper">
      <textarea id="content" contenteditable="true" v-model="content" ref="content"></textarea>
      <button id="insert-img-btn" @click="toggleInsertPanel"><i class="fa fa-picture-o"></i></button>
    </div>
    <div class="markdown-wrapper">
      <markdown :text="content"></markdown>
      <button id="create-btn" @click="update">update</button>
    </div>
    <transition name="pop">
      <div class="insertpanel-wrapper" v-show="insertPanelShow">
        <insertpanel @hideInsertPanel="hideInsertPanel" @insertImg="insertImg" :panelShow="insertPanelShow"></insertpanel>
      </div>
    </transition>
    <transition name="slip">
      <div class="hint" v-show="hintShow">{{text}}</div>
    </transition>
  </div>
</template>
<script>
  import Hammer from 'hammerjs'

  import markdown from 'components/markdown/markdown'
  import insertpanel from 'components/insertpanel/insertpanel'

  const OK = 1

  export default {
    props: {
      nav: {
        type: HTMLDivElement
      }
    },
    data () {
      return {
        content: '',
        insertPanelShow: false,
        hintShow: false,
        text: 'error'
      }
    },
    methods: {
      toggleInsertPanel () {
        this.insertPanelShow = !this.insertPanelShow
      },
      hideInsertPanel (boolean) {
        this.insertPanelShow = boolean
      },
      insertImg (imgLink) {
        this.content = this.content + '\n' + `![](${imgLink})`
      },
      update () {
        let Vue = this
        this.$http.post('api/updateAboutMe', {token: sessionStorage.getItem('token'), content: this.content})
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              Vue.hintShow = true
              Vue.text = 'success'
              setTimeout(function () {
                Vue.hintShow = false
              }, 2000)
            } else {
              Vue.hintShow = true
              Vue.text = 'error'
              setTimeout(function () {
                Vue.hintShow = false
              }, 2000)
            }
          })
          .catch(function (error) {
            Vue.hintShow = true
            Vue.text = 'error'
            setTimeout(function () {
              Vue.hintShow = false
            }, 2000)
            console.log(error.toString())
          })
      }
    },
    created () {
      let Vue = this
      this.$http.post('api/getAboutMe', null)
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            Vue.content = res.data
          }
        })
        .catch(function (error) {
          console.log(error.toString())
        })
    },
    mounted () {
      var mc = new Hammer(this.$refs.content)

      let Vue = this
      mc.on('swipeleft', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '-50px'
          Vue.$refs.aboutme.style.left = '0'
        }
      })

      mc.on('swiperight', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '0px'
          Vue.$refs.aboutme.style.left = '50px'
        }
      })
    },
    components: {
      markdown: markdown,
      insertpanel: insertpanel
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .aboutme
    position relative
    width 100%
    height 100%
    font-size 0
    transition all .5s ease
    .input-wrapper
      position relative
      vertical-align top
      display inline-block
      width 50%
      height 100%
      background #333
      &:hover
        #insert-img-btn
          display block
      #content
        width 100%
        height 100%
        padding 20px
        line-height 1.5
        font-size 16px
        word-wrap: break-word;
        color #f7f7f7
        background #333
        border none
        box-sizing border-box
        &:focus
          outline none
      #insert-img-btn
        position absolute
        display none
        width 30px
        height 30px
        top: 10px
        right 10px
        font-size 18px
        color #4285f4
        background #f7f7f7
        border none
        border-radius 2px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        cursor pointer
        transition all 0.5s ease
        &:hover
          color #fff
          background #4285f4
      @media (max-width 667px)
        #insert-img-btn
          display block
          top 10px
          right 100px
    @media (max-width 667px)
      .input-wrapper
        width 100%
    .markdown-wrapper
      position relative
      display inline-block
      width 50%
      height 100%
      background #fff
      overflow auto
      box-sizing border-box
      &:hover
        #create-btn
          display block
      #create-btn
        position absolute
        display none
        width 80px
        height 30px
        top: 10px
        right 10px
        font-size 18px
        color #4285f4
        background #f7f7f7
        border none
        border-radius 2px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        cursor pointer
        transition all 0.5s ease
        &:hover
          color #fff
          background #4285f4
      @media (max-width 667px)
        #create-btn
          position absolute
          display block
          top 10px
          right 10px
    @media (max-width 667px)
      .markdown-wrapper
        width 0
        overflow visible
        .markdown
          display none
    .insertpanel-wrapper
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .setpanel-wrapper
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .pop-enter-active, .pop-leave-active
      transition all 0.5s ease
      .insertpanel-inner
        transition all 0.5s ease
      .setpanel-inner
        transition all 0.5s ease
    .pop-enter, .pop-leave-active
      opacity 0
      .insertpanel-inner
        transform translate(0, -200%)
      .setpanel-inner
        transform translate(0, -200%)
    .hint
      position absolute
      z-index 1
      top 0
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
</style>
