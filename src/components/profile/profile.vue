<template>
  <div class="profile">
    <div class="img-wrapper">
      <img src="../../assets/imgs/deep_space.png" width="230" height="130">
    </div>
    <div class="overview">
      <h1 class="title">{{article.title}}</h1>
      <div class="tag-wrapper">
        <tag v-for="tag in article.tags" :tag="tag" key="key"></tag>
      </div>
      <div class="text">{{article.overview}}</div>
      <div class="meta">
        <span class="browse"><i class="fa fa-eye"></i>{{article.view}}</span>
        <span class="comment"><i class="fa fa-comments"></i>{{article.comment}}</span>
        <span class="like"><i class="fa fa-star"></i>{{article.like}}</span>
        <span class="time"><i class="fa fa-calendar"></i>{{article.date}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import tag from 'components/tag/tag'

  export default {
    props: {
      article: {
        type: Object
      }
    },
    components: {
      tag: tag
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/font-awesome.min.css"

  .profile
    width 800px
    max-width 800px
    height 150px
    font-size 0
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0, 0, 0, 0.26)
    cursor pointer
    .img-wrapper
      display inline-block
      width 230px
      height 130px
      margin 10px
      border-radius 2px
      overflow hidden
      img
        border-radius 2px
        transition all 0.3s linear
        &:hover
          transform scale(1.1)
    .overview
      display inline-block
      width 540px
      height 130px
      margin 10px 10px 10px 0
      vertical-align top
      .title
        font-size 20px
        color #4285f4
      .tag-wrapper
        width 100%
        height 20px
        padding 5px 0
        .tag
          margin-right 10px
      .text
        height 65px
        line-height 18px
        font-size 14px
        overflow hidden
      .meta
        font-size 0
        text-align right
        span
          display inline-block
          margin-right 10px
          font-size 14px
          color #7e8c8d
          &:hover
            color #4285f4
          i
            display inline-block
            margin-right 4px
        span:last-child
          margin 0

</style>
