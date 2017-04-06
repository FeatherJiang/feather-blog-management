<template>
  <div class="commentitem">
    <div class="avatar">
      <img :src="comment.avatar" alt="">
    </div>
    <div class="comment-main">
      <div class="comment-content">
        <span class="name">{{comment.name}}: </span>
        <span class="text">{{comment.content}}</span>
      </div>
      <div class="comment-time">{{comment.date}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      comment: {
        type: Object
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .commentitem
    position relative
    display flex
    padding 20px
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
    .avatar
      flex 0 0 50px
      height 50px
      margin 0 10px 0 0
      img
        width 100%
        height 100%
        border-radius 50%
    .comment-main
      vertical-align top
      flex 1 1 auto
      line-height 14px
      .comment-content
        .name
          font-size 14px
          color #4285f4
        .text
          font-size 14px
          word-break break-all
      .comment-time
        position absolute
        right 20px
        bottom 8px
        text-align right
        font-size 14px
        color #7e8c8d
</style>
