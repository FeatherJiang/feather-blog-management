<template>
  <div class="write" ref="write">
    <div class="input-wrapper">
      <div id="content" v-model="content"></div>
      <textarea id="media-content" v-model="content" ref="content"></textarea>
      <div id="insert-img-btn" @click="toggleInsertPanel"><i class="fa fa-picture-o"></i></div>
    </div>
    <div class="markdown-wrapper">
      <markdown :text="content"></markdown>
      <div id="create-btn" @click="toggleSetPanel">create</div>
    </div>
    <transition name="pop">
      <div class="setpanel-wrapper" v-show="setPanelShow">
        <setpanel @hideSetPanel="hideSetPanel" @addArticle="addArticle" @updataArticle="updataArticle" :panelShow="setPanelShow" :article="article"></setpanel>
      </div>
    </transition>
    <transition name="pop">
      <div class="insertpanel-wrapper" v-show="insertPanelShow">
        <insertpanel @hideInsertPanel="hideInsertPanel" @insertImg="insertImg" :panelShow="insertPanelShow"></insertpanel>
      </div>
    </transition>
  </div>
</template>
<script>
  import {urlParse} from '../../assets/js/urlParse'
  import Hammer from 'hammerjs'
  import axios from 'axios'

  import markdown from 'components/markdown/markdown'
  import setpanel from 'components/setpanel/setpanel'
  import insertpanel from 'components/insertpanel/insertpanel'

  const OK = 1

  export default {
    props: {
      nav: {
        type: HTMLDivElement
      }
    },
    data () {
      return {
        content: '',
        article: null,
        setPanelShow: false,
        insertPanelShow: false,
        cancel: null,
        editor: null
      }
    },
    methods: {
      toggleInsertPanel () {
        this.insertPanelShow = !this.insertPanelShow
      },
      toggleSetPanel () {
        this.setPanelShow = !this.setPanelShow
      },
      hideInsertPanel (boolean) {
        this.insertPanelShow = boolean
      },
      hideSetPanel (boolean) {
        this.setPanelShow = boolean
      },
      insertImg (imgLink) {
        this.content = this.content + '\n' + `![](${imgLink})`
      },
      addArticle (data) {
        let oDate = new Date()
        let date = oDate.getFullYear() + '-'
        date += oDate.getMonth() + 1 + '-'
        date += oDate.getDate()

        let article = {
          title: data.title,
          type: data.type,
          tags: data.tags,
          overview: data.overview,
          content: this.content,
          date: date
        }
        let formData = new FormData()
        formData.append('token', sessionStorage.getItem('token'))
        formData.append('article', JSON.stringify(article))
        formData.append('img', data.img.files[0])

        let Vue = this

        if (Vue.cancel !== null) {
          Vue.cancel()
        }

        var CancelToken = axios.CancelToken

        this.$http.post('/api/addArticle', formData, {
          cancelToken: new CancelToken(function executor (c) {
            // An executor function receives a cancel function as a parameter
            Vue.cancel = c
          })
        })
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              Vue.toggleSetPanel()
              Vue.content = ''
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      },
      updataArticle (data) {
        let article = {
          title: data.title,
          type: data.type,
          tags: data.tags,
          overview: data.overview,
          content: this.content,
          id: data.id
        }
        let formData = new FormData()
        formData.append('token', sessionStorage.getItem('token'))
        formData.append('article', JSON.stringify(article))
        if (data.img.files !== undefined) {
          formData.append('img', data.img.files[0])
        } else {
          formData.append('img', data.img)
        }

        let Vue = this
        this.$http.post('/api/updateArticle', formData)
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              Vue.toggleSetPanel()
              Vue.content = ''
              Vue.$router.push({path: '/admin/article'})
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      }
    },
    created () {
      let Vue = this

      let param = urlParse()
      if (param.id !== undefined) {
        this.$http.post('api/getArticleById', param)
          .then(function (response) {
            let res = response.data
            if (res.code === OK) {
              Vue.content = res.data.article.content
              Vue.article = res.data.article
              Vue.editor.setValue(Vue.content)
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      }
    },
    mounted () {
      let Vue = this
      this.editor = window.ace.edit('content')
      this.editor.setTheme('ace/theme/monokai')
      this.editor.getSession().setMode('ace/mode/markdown')
      this.editor.getSession().on('change', function (e) {
        Vue.content = Vue.editor.getValue()
      })
      this.editor.setOption('wrap', 'free')
      delete Hammer.defaults.cssProps.userSelect
      var mc = new Hammer(this.$refs.content)

      mc.on('swipeleft', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '-50px'
          Vue.$refs.write.style.left = '0'
        }
      })

      mc.on('swiperight', function (ev) {
        if (window.screen.width < 667) {
          Vue.nav.style.left = '0px'
          Vue.$refs.write.style.left = '50px'
        }
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
        line-height 1.5
        font-size 16px
        word-wrap: break-word;
        color #f7f7f7
        background #333
        border none
        box-sizing border-box
        transition all .5s ease
        -webkit-overflow-scrolling: touch
        &:focus
          outline none
      @media (max-width 667px)
        #content
          display none
      #media-content
        display none
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
        transition all .5s ease
        -webkit-overflow-scrolling: touch
        &:focus
          outline none
      @media (max-width 667px)
        #media-content
          display inline-block
      #insert-img-btn
        position absolute
        z-index 1
        display none
        width 30px
        height 30px
        top: 10px
        right 10px
        text-align center
        line-height 30px
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
      @media (max-width 667px)
        #insert-img-btn
          display block
          top 10px
          right 80px
    @media (max-width 667px)
      .input-wrapper
        width 100%
    .markdown-wrapper
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
        text-align center
        line-height 30px
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
      @media (max-width 667px)
        #create-btn
          position absolute
          display block
          z-index 5
          top 10px
          right 10px
    @media (max-width 667px)
      .markdown-wrapper
        width 0
        overflow visible
        .markdown
          display none
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
  @media (max-width 667px)
    .write
      position relative
      left 0
      transition all .5s ease
</style>
