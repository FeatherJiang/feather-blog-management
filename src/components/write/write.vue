<template>
  <div class="write">
    <div class="input-wrapper">
      <textarea id="content" contenteditable="true" v-model="content"></textarea>
      <button id="insert-img-btn" @click="toggleInsertPanel"><i class="fa fa-picture-o"></i></button>
    </div>
    <div class="markdown-wrapper">
      <markdown :text="content"></markdown>
      <button id="create-btn" @click="toggleSetPanel">create</button>
    </div>
    <transition name="pop">
      <div class="setpanel-wrapper" v-show="setPanelShow">
        <setpanel :panelShow="setPanelShow"></setpanel>
      </div>
    </transition>
    <transition name="pop">
      <div class="insertpanel-wrapper" v-show="insertPanelShow">
        <insertpanel :panelShow="insertPanelShow"></insertpanel>
      </div>
    </transition>
  </div>
</template>
<script>
  import {bus} from '../../assets/js/bus.js'

  import markdown from 'components/markdown/markdown'
  import setpanel from 'components/setpanel/setpanel'
  import insertpanel from 'components/insertpanel/insertpanel'

  export default {
    data () {
      return {
        content: '',
        setPanelShow: false,
        insertPanelShow: false
      }
    },
    methods: {
      toggleInsertPanel () {
        this.insertPanelShow = !this.insertPanelShow
      },
      toggleSetPanel () {
        this.setPanelShow = !this.setPanelShow
      }
    },
    created () {
      bus.$on('hideInsertPanel', (boolean) => {
        this.insertPanelShow = boolean
      })
      bus.$on('hideSetPanel', (boolean) => {
        this.setPanelShow = boolean
      })
    },
    components: {
      markdown: markdown,
      setpanel: setpanel,
      insertpanel: insertpanel
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
    .insertpanel-wrapper
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background rgba(0,0,0,0.4)
    .setpanel-wrapper
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background rgba(0,0,0,0.4)
    .pop-enter-active, .pop-leave-active
      transition all 0.5s ease
      .insertpanel
        transition all 0.5s ease
      .setpanel
        transition all 0.5s ease
    .pop-enter, .pop-leave-active
      opacity 0
      .insertpanel
        transform translate(0, -200%)
      .setpanel
        transform translate(0, -200%)
</style>
