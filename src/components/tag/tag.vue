<template>
  <span class="tag">
    {{tag}}
  </span>
</template>
<script>
  export default {
    props: {
      tag: {
        type: String,
        default: 'other'
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .tag
    display inline-block
    height 20px
    padding 0 5px
    line-height 20px
    font-size 14px
    color #fff
    background rgba(66, 133, 244, 0.8)
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    cursor pointer
    transition all 0.2s
    &:hover
      background rgba(66, 133, 244, 1)
</style>
