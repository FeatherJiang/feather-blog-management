<template>
  <div class="markdown" v-html="content">
    {{content}}
  </div>
</template>
<script>
  import marked from 'marked'
  import highlight from 'highlight.js'

  export default {
    props: {
      text: {
        type: String
      }
    },
    data () {
      return {
        content: null
      }
    },
    created () {
      this.$nextTick(() => {
        this.content = marked(this.text)

        // Using async version of marked
        marked(this.text, function (err, content) {
          if (err) throw err
          console.log(content)
        })

        // Synchronous highlighting with highlight.js
        marked.setOptions({
          highlight: function (code) {
            return highlight.highlightAuto(code).value
          }
        })
      })
    },
    watch: {
      text: function () {
        this.content = marked(this.text)

        // Using async version of marked
        marked(this.text, function (err, content) {
          if (err) throw err
          console.log(content)
        })

        // Synchronous highlighting with highlight.js
        marked.setOptions({
          highlight: function (code) {
            return highlight.highlightAuto(code).value
          }
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/markdown.css"
  .markdown
    width 100%
    padding 20px
    box-sizing border-box
</style>
