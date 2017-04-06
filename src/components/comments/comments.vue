<template>
  <div class="comments" ref="comments">
    <div class="comments-wrapper">
      <transition-group tag="div" name="push">
        <div class="comment-list" v-for="(comment, index) in comments" :key="comment.id">
          <div class="commentitem-wrapper">
            <commentitem :comment="comment"></commentitem>
          </div>
          <div class="btn-wrapper">
            <div class="delete-btn" @click="deleteComment(index)">delete</div>
          </div>
        </div>
      </transition-group>
      <div class="load-article" v-if="(comments === null || comments.length == 0) || loadingShow">
        <span  v-if="(comments === null || comments.length == 0) && !loadingShow">no article</span>
        <loading v-if="loadingShow"></loading>
      </div>
      <div class="loading-wrapper" v-if="comments.length >= 10">
        <div class="more" @click="getMore" v-show="showMore">
          {{text}}
        </div>
        <loading v-show="!showMore"></loading>
      </div>
    </div>
  </div>
</template>
<script>
  import {urlParse} from '../../assets/js/urlParse'
  import Hammer from 'hammerjs'

  import commentitem from 'components/commentitem/commentitem'
  import loading from 'components/loading/loading'

  const OK = 1

  export default {
    props: {
      nav: {
        type: HTMLDivElement
      }
    },
    data () {
      return {
        text: 'more',
        showMore: true,
        loadingShow: true,
        comments: [],
        page: 1
      }
    },
    methods: {
      getMore () {
        let Vue = this
        this.showMore = false
        let param = urlParse()
        if (param.id !== undefined) {
          this.$http.post('/api/getCommentList', {page: this.page + 1})
            .then(function (response) {
              let res = response.data
              if (res.code === OK) {
                if (res.data.comments.length > 0) {
                  Vue.comments = Vue.comments.concat(res.data.comments)
                  Vue.page += 1
                } else {
                  Vue.text = 'no more'
                }
                Vue.showMore = true
              }
            })
            .catch(function (error) {
              console.log(error.toString())
            })
        }
      },
      deleteComment (index) {
        let Vue = this
        let param = urlParse()
        let token = sessionStorage.getItem('token')
        if (param.id !== undefined) {
          this.$http.post('/api/deleteComment', {articleId: param.id, commentId: this.comments[index].id, token: token})
            .then(function (response) {
              let res = response.data
              if (res.code === OK) {
                Vue.comments.splice(index, 1)
              }
            })
            .catch(function (error) {
              console.log(error.toString())
            })
        }
      }
    },
    created () {
      let Vue = this
      let param = urlParse()
      if (param.id !== undefined) {
        this.$http.post('api/getCommentList', {id: param.id, page: this.page})
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              Vue.comments = res.data.comments
              Vue.loadingShow = false
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      }
    },
    mounted () {
      delete Hammer.defaults.cssProps.userSelect
      var mc = new Hammer(this.$refs.comments)

      let Vue = this
      mc.on('swipeleft', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '-50px'
          Vue.$refs.comments.style.left = '0'
        }
      })

      mc.on('swiperight', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '0px'
          Vue.$refs.comments.style.left = '50px'
        }
      })
    },
    components: {
      commentitem: commentitem,
      loading: loading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .comments
    width 100%
    height 100%
    overflow auto
    -webkit-overflow-scrolling: touch
    .comments-wrapper
      width 100%
      .push-move
        transition all .5s ease
      .push-enter-active, .push-leave-active
        transition all .5s ease
      .push-enter, .push-leave-active
        opacity 0
        transform translate(100%, 0)
      .push-leave-active
        position absolute
      .comment-list
        width 920px
        margin 0 auto
        font-size 0
        .commentitem-wrapper
          display inline-block
          width 800px
          .commentitem
            margin 10px 0
        .btn-wrapper
          vertical-align top
          display inline-block
          margin 10px 0 10px 10px
          .delete-btn
            display block
            width 90px
            height 30px
            text-align center
            line-height 30px
            font-size 20px
            color #4285f4
            background #f7f7f7
            border none
            border-radius 2px
            box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
            cursor pointer
            transition all .5s ease
            &:hover
              color #fff
              background #4285f4
            &:focus
              outline none
        @media (max-width 1024px)
          .btn-wrapper
            flex 0 0 90px
      @media (max-width 1024px)
        .comment-list
          display flex
          width 100%
      .load-article
        width 100%
        height 25px
        margin 10px 0
        padding 5px 0
        text-align center
        line-height 25px
        font-size 20px
        color #4285f4
        background #fff
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        border-radius 2px
        .loading
          text-align justify
          margin 0 auto
      .loading-wrapper
        width 920px
        margin 10px auto 20px
        background #fff
        border-radius 2px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        cursor pointer
        .more
          margin 0 auto
          line-height 35px
          font-size 20px
          text-align center
          color #4285f4
        .loading
          margin 0 auto
          padding 5px 0
    @media (max-width 1024px)
      .comments-wrapper
        padding 0 10px
        box-sizing border-box
  @media (max-width 667px)
    .comments
      position relative
      transition all .5s ease
</style>
