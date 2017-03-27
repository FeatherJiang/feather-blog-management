<template>
  <div class="aboutme">
    <div class="input-wrapper">
      <textarea id="content" contenteditable="true" v-model="content"></textarea>
      <button id="insert-img-btn" @click="toggleInsertPanel"><i class="fa fa-picture-o"></i></button>
    </div>
    <div class="markdown-wrapper">
      <markdown :text="content"></markdown>
      <button id="create-btn" @click="">update</button>
    </div>
    <transition name="pop">
      <div class="insertpanel-wrapper" v-show="insertPanelShow">
        <insertpanel @hideInsertPanel="hideInsertPanel" @insertImg="insertImg" :panelShow="insertPanelShow"></insertpanel>
      </div>
    </transition>
  </div>
</template>
<script>
  import markdown from 'components/markdown/markdown'
  import insertpanel from 'components/insertpanel/insertpanel'

  const OK = 1

  export default {
    data () {
      return {
        content: '',
        insertPanelShow: false
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
        this.$http.post('api/updateAboutMe', {content: this.content})
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      }
    },
    created () {
      this.$http.post('api/getAboutMe', null)
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            this.content = res.data
          }
        })
        .catch(function (error) {
          console.log(error.toString())
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
</style>
