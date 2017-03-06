<template>
  <div class="write">
    <div class="input-wrapper">
      <textarea id="content" contenteditable="true" v-model="content"></textarea>
    </div>
    <div class="markdown-wrapper">
      <markdown :text="content"></markdown>
      <button id="create-btn" @click="togglePanel">create</button>
    </div>
    <transition name="pop">
      <div class="setpanel-wrapper" v-show="panelShow">
        <setpanel :panelShow="panelShow"></setpanel>
      </div>
    </transition>
  </div>
</template>
<script>
  import {bus} from '../../assets/js/bus.js'

  import markdown from 'components/markdown/markdown'
  import setpanel from 'components/setpanel/setpanel'

  export default {
    data () {
      return {
        content: '',
        panelShow: false
      }
    },
    methods: {
      togglePanel () {
        this.panelShow = !this.panelShow
      }
    },
    created () {
      bus.$on('hidePanel', (boolean) => {
        this.panelShow = boolean
      })
    },
    components: {
      markdown: markdown,
      setpanel: setpanel
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .write
    position relative
    width 100%
    height 100%
    font-size 0
    .input-wrapper
      vertical-align top
      display inline-block
      width 50%
      height 100%
      background #333
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
        width 60px
        height 30px
        top: 20px
        right 20px
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
    .setpanel-wrapper
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background rgba(0,0,0,0.4)
    .pop-enter-active, .pop-leave-active
      transition all 0.5s ease
      .setpanel
        transition all 0.5s ease
    .pop-enter, .pop-leave-active
      opacity 0
      .setpanel
        transform translate(0, -200%)
</style>
