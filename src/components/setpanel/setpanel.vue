<template>
  <div class="setpanel">
    <div class="setpanel-main">
      <form class="setpanel-inner" ref="setForm">
        <span class="close" @click="hidePanel"><i class="fa fa-close"></i></span>
        <div class="img-wrapper">
          <img src="/images/default.png" alt="" ref="img">
          <div class="input-wrapper">
            upload
            <input id="file" type="file" @change="addImg" ref="fileImg">
          </div>
        </div>
        <div class="title-wrapper">
          <label class="text" for="title">title</label>
          <input type="text" id="title" v-model="title">
        </div>
        <div class="type-wrapper">
          <label class="text" for="type">type</label>
          <select name="" id="type" v-model="type">
            <option value="1">technology</option>
            <option value="2">life</option>
          </select>
        </div>
        <div class="tag-wrapper">
          <span class="text">tag</span>
          <div class="tags">
            <edittag v-for="(tag, index) in tags" v-on:delTag="delTag" :tag="tag" :index="index" :key="index"></edittag>
            <div class="add-tag">
              <input type="text" id="tag-text" v-show="!icon" v-model="tagText">
              <span class="add-text" @click="addTag">
            <i class="fa" :class="{'fa-plus': icon, 'fa-check': !icon}"></i>
          </span>
            </div>
          </div>
        </div>
        <div class="overview-wrapper">
          <label class="text" for="overview">overview</label>
          <textarea id="overview" v-model="overview"></textarea>
        </div>
        <button id="confirm" type="button" @click="addArticle">confirm</button>
      </form>
    </div>
  </div>
</template>
<script>
  import edittag from 'components/edittag/edittag'

  export default {
    props: {
      panelShow: {
        type: Boolean
      },
      article: {
        type: Object
      }
    },
    data () {
      return {
        title: '',
        tags: [],
        type: 1,
        overview: '',
        tagText: '',
        icon: true
      }
    },
    methods: {
      hidePanel () {
        this.$refs.img.setAttribute('src', '/images/default.png')
        this.title = ''
        this.tags = []
        this.type = 1
        this.overview = ''
        this.$refs.setForm.reset()
        this.$emit('hideSetPanel', false)
      },
      addImg () {
        let resultFile = this.$refs.fileImg.files[0]
        let url = null
        if (window.createObjectURL !== undefined) { // basic
          url = window.createObjectURL(resultFile)
        } else if (window.URL !== undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(resultFile)
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(resultFile)
        }
        if (url) {
          this.$refs.img.setAttribute('src', url)
        }
      },
      addTag () {
        if (this.icon === false) {
          if (this.tagText !== '') {
            this.tags.push(this.tagText)
            this.tagText = ''
          }
        }
        this.icon = !this.icon
      },
      delTag (index) {
        this.tags.splice(index, 1)
      },
      getArticle () {
        this.$refs.img.setAttribute('src', '/images/default.png')
        this.title = ''
        this.tags = []
        this.type = 1
        this.overview = ''
        this.$refs.setForm.reset()
        if (this.article !== null) {
          this.title = this.article.title
          this.type = this.article.type
          this.tags = this.article.tags
          this.overview = this.article.overview
          this.$refs.img.setAttribute('src', this.article.img)
        }
      },
      addArticle () {
        let data = {
          title: this.title,
          type: this.type,
          tags: this.tags.toString(),
          overview: this.overview,
          img: this.$refs.fileImg
        }
        if (this.article === null) {
          this.$emit('addArticle', data)
        } else {
          data.id = this.article.id
          if (this.$refs.fileImg.value === '') {
            data.img = this.article.img
          }
          this.$emit('updataArticle', data)
        }
      }
    },
    watch: {
      panelShow: 'getArticle'
    },
    components: {
      edittag: edittag
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .setpanel
    position fixed
    z-index 99
    top 0
    right 0
    bottom 0
    left 0
    background rgba(0,0,0,0.4)
    overflow auto
    .setpanel-main
      width 500px
      margin 50px auto
      .setpanel-inner
        position relative
        width 100%
        padding 20px 20px
        background #fff
        border-radius 2px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        box-sizing border-box
        .close
          position absolute
          top 10px
          right 10px
          font-size 20px
          color #d1d1d1
          &:hover
            color #4285f4
        .img-wrapper
          img
            display block
            width 300px
            margin 20px auto 0
            border-radius 2px
          .input-wrapper
            position relative
            left 50%
            width 100px
            height 30px
            margin 20px 0 0 -50px
            text-align center
            line-height 30px
            font-size 18px
            color #4285f4
            background #f7f7f7
            border-radius 2px
            box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
            transition all 0.5s ease
            &:hover
              color #fff
              background #4285f4
            #file
              position absolute
              top 0
              left 0
              width 100px
              height 30px
              opacity 0
        .title-wrapper
          width 460px
          height 30px
          margin 20px 0
          font-size 0
          border-radius 5px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          .text
            display inline-block
            width 80px
            height 30px
            vertical-align top
            text-align center
            line-height 30px
            font-size 18px
            color #fff
            background #4285f4
            border-radius 5px 0 0 5px
          #title
            display inline-block
            width 380px
            height 30px
            vertical-align top
            line-height 30px
            font-size 16px
            text-indent 10px
            background #f7f7f7
            border-radius 0 5px 5px 0
            box-sizing border-box
            &:focus
              background #fff
              border 2px solid #4285f4
              border-left none
              outline none
        .type-wrapper
          width 460px
          height 30px
          margin 20px 0
          font-size 0
          border-radius 5px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          .text
            display inline-block
            width 80px
            height 30px
            vertical-align top
            text-align center
            line-height 30px
            font-size 18px
            color #fff
            background #4285f4
            border-radius 5px 0 0 5px
          #type
            width 380px
            height 30px

            font-size 16px
            text-indent 10px

            background #f7f7f7
            border none
            box-sizing border-box
            &:focus
              background #fff
              border 2px solid #4285f4
              border-left 0
              border-radius 0 5px 5px 0
              outline none
        .tag-wrapper
          width 460px
          margin 20px 0
          font-size 0
          border-radius 5px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          .text
            display table-cell
            width 80px
            height 100%
            text-align center
            vertical-align middle
            font-size 18px
            color #fff
            background #4285f4
            border-radius 5px 0 0 5px
          .tags
            display table-cell
            width 380px
            font-size 0
            background #f7f7f7
            border-radius 0 5px 5px 0
            box-sizing border-box
            .tag
              margin 5px 5px
            .add-tag
              display inline-block
              margin 5px
              border-radius 2px
              box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
              #tag-text
                vertical-align top
                width 100px
                height 20px
                margin 0 -2px 0 0
                line-height 16px
                font-size 14px
                text-indent 5px
                border 2px solid #659BF4
                border-right 0
                border-radius 2px 0 0 2px
                box-sizing border-box
                &:focus
                  outline none
              .add-text
                display inline-block
                height 20px
                padding 0 5px
                line-height 20px
                font-size 14px
                color #fff
                background #659BF4
                border-radius 2px
                cursor pointer
                transition all 0.2s
                &:hover
                  background rgba(66, 133, 244, 1)
        .overview-wrapper
          width 460px
          margin 20px 0
          font-size 0
          border-radius 5px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          .text
            vertical-align top
            display inline-block
            width 80px
            height 90px
            text-align center
            line-height 90px
            font-size 18px
            color #fff
            background #4285f4
            border-radius 5px 0 0 5px
          #overview
            display inline-block
            width 380px
            height 90px
            padding 10px
            font-size 16px
            background #f7f7f7
            border none
            border-radius 0 5px 5px 0
            box-sizing border-box
            &:focus
              background #fff
              border 2px solid #4285f4
              border-left none
              outline none
        #confirm
          display block
          width 100px
          height 30px
          margin 0 auto
          font-size 20px
          color #4285f4
          background #f7f7f7
          border none
          border-radius 2px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          transition all 0.5s ease
          &:hover
            color #fff
            background #4285f4
</style>
