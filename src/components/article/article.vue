<template>
  <div class="article" ref="article">
    <div class="article-wrapper">
      <transition-group tag="div" name="push">
        <div class="profile-wrapper" v-for="(article, index) in articleList" :key="article.id">
          <profile :article="article"></profile>
          <div class="btn-wrapper">
            <div class="modify-btn" @click="modifyArticle(article)">modify</div>
            <div class="comment-btn" @click="modifyComment(article)">comment</div>
            <div class="del-btn" @click="deleteArticle(index)">delete</div>
          </div>
        </div>
      </transition-group>
      <div class="load-article" v-if="(articleList === null || articleList.length == 0) || loadingShow">
        <span  v-if="(articleList === null || articleList.length == 0) && !loadingShow">no article</span>
        <loading v-if="loadingShow"></loading>
      </div>
      <div class="loading-wrapper" v-if="articleList.length >= 10">
        <div class="more" @click="getMore" v-show="showMore">
          {{text}}
        </div>
        <loading v-show="!showMore"></loading>
      </div>
    </div>
  </div>
</template>
<script>
  import Hammer from 'hammerjs'

  import profile from 'components/profile/profile'
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
        articleList: [],
        page: 1,
        loadingShow: true
      }
    },
    methods: {
      getMore () {
        let Vue = this
        this.showMore = false
        this.$http.post('/api/getArticleList', {page: this.page + 1})
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              if (res.data.articleList.length > 0) {
                Vue.articleList = Vue.articleList.concat(res.data.articleList)
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
      },
      modifyArticle (article) {
        this.$router.push({path: '/admin/write', query: {id: article.id}})
        this.$router.push({path: '/admin/write', query: {id: article.id}})
      },
      modifyComment (article) {
        this.$router.push({path: '/admin/comments', query: {id: article.id}})
        this.$router.push({path: '/admin/comments', query: {id: article.id}})
      },
      deleteArticle (index) {
        let Vue = this
        let token = sessionStorage.getItem('token')
        this.$http.post('/api/deleteArticle', {id: this.articleList[index].id, token: token})
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              Vue.articleList.splice(index, 1)
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      }
    },
    created () {
      let Vue = this
      this.$http.post('/api/getArticleList', {page: this.page})
        .then(function (response) {
          let res = response.data
          if (res.code === OK) {
            Vue.articleList = res.data.articleList
            Vue.loadingShow = false
          }
        })
        .catch(function (error) {
          console.log(error.toString())
        })
    },
    mounted () {
      var mc = new Hammer(this.$refs.article)

      let Vue = this
      mc.on('swipeleft', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '-50px'
          Vue.$refs.article.style.left = '0'
        }
      })

      mc.on('swiperight', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '0px'
          Vue.$refs.article.style.left = '50px'
        }
      })
    },
    components: {
      profile: profile,
      loading: loading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .article
    width 100%
    height 100%
    overflow auto
    -webkit-overflow-scrolling: touch
    .article-wrapper
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
      .profile-wrapper
        width 920px
        margin 0 auto
        font-size 0
        .profile
          display inline-block
          margin 10px 0
        @media (max-width 1024px)
          .profile
            display flex
        .btn-wrapper
          vertical-align top
          display inline-block
          margin 10px 0 10px 10px
          .modify-btn, .comment-btn, .del-btn
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
          .comment-btn, .del-btn
            margin 10px 0 0
        @media (max-width 1024px)
          .btn-wrapper
            flex 0 0 90px
      @media (max-width 1024px)
        .profile-wrapper
          display flex
          width 100%
      .load-article
        width 920px
        height 25px
        margin 10px auto
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
      @media (max-width 1024px)
        .load-article
          width 100%
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
        .loading-wrapper
          width 100%
    @media (max-width 1024px)
      .article-wrapper
        padding 0 10px
        box-sizing border-box
  @media (max-width 667px)
    .article
      position relative
      left 0
      transition all .5s ease
</style>
