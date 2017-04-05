<template>
  <div class="profile">
    <div class="img-wrapper">
      <img :src="article.img" width="230" height="134">
    </div>
    <div class="overview">
      <h1 class="title">{{article.title}}</h1>
      <div class="tag-wrapper">
        <tag v-for="tag in article.tags" :tag="tag" key="key"></tag>
      </div>
      <div class="text">
        <img :src="article.img">
        <span>{{article.overview}}</span>
      </div>
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
    min-height 150px
    font-size 0
    background #fff
    border-radius 2px
    box-shadow 0 2px 5px 0 rgba(0, 0, 0, 0.26)
    cursor pointer
    transition all .4s ease
    &:hover
      box-shadow 0 3px 8px 2px rgba(0, 0, 0, 0.26)
    .img-wrapper
      display inline-block
      width 230px
      height 130px
      margin 10px 0 10px 10px
      border-radius 2px
      overflow hidden
      img
        border-radius 2px
        transition all 0.3s linear
        &:hover
          transform scale(1.1)
    @media (max-width 1200px)
      .img-wrapper
        flex 0 0 230px
    @media (max-width 667px)
      .img-wrapper
        display none
    .overview
      display inline-block
      max-width 540px
      min-height 134px
      margin 10px
      vertical-align top
      .title
        font-size 20px
        color #4285f4
      .tag-wrapper
        width 100%
        min-height 20px
        padding 5px 0
        .tag
          margin-right 10px
      .text
        height 65px
        overflow hidden
        span
          line-height 17px
          font-size 14px
      @media (min-width 1200px)
        .text
          img
            display none
      @media (max-width 1200px)
        .text
          img
            display none
      @media (max-width 667px)
        .text
          img
            display inline-block
            float left
            vertical-align top
            width 100px
            height 65px
            margin 0 10px 0 0
            border-radius 2px
      .meta
        padding 5px 0 0 0
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
    @media (max-width 1024px)
      .overview
        flex 1 1 auto
  @media (max-width 1024px)
    .profile
      display flex
      flex 1 1 auto
</style>
