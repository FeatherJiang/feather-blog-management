<template>
  <div class="write">
    <div class="input-wrapper">
      <textarea id="content" contenteditable="true" v-model="content"></textarea>
    </div>
    <div class="markdown-wrapper">
      <markdown :text="content"></markdown>
    </div>
  </div>
</template>
<script>
  import markdown from 'components/markdown/markdown'

  export default {
    data () {
      return {
        content: ''
      }
    },
    components: {
      markdown: markdown
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .write
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
      display inline-block
      width 50%
      height 100%
      background #fff
      overflow auto
      box-sizing border-box
</style>
