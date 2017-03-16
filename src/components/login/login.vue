<template>
  <div class="login">
    <form class="login-panel">
      <a class="logo-wrapper" href="#">
        <img src="../../assets/imgs/feather_white.png" alt="logo" class="logo" width="50" height="50">
      </a>
      <div class="user-wrapper">
        <label for="user-name" class="text">name</label>
        <input type="text" id="user-name" v-model="user.name">
      </div>
      <div class="pwd-wrapper">
        <label for="user-pwd" class="text">password</label>
        <input type="password" id="user-pwd" v-model="user.password">
      </div>
      <div class="btn-wrapper">
        <button type="button" id="login-btn" @click="login">
          <span v-show="true">login</span>
          <div class="loading-wrapper"></div>
        </button>
        <transition name="slip">
          <div class="hint" v-show="hintShow">error</div>
        </transition>
      </div>
    </form>
  </div>
</template>
<script>
  import VueRouter from 'vue-router'
  var router = new VueRouter()

  const OK = 1

  export default {
    data () {
      return {
        hintShow: false,
        user: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        let Vue = this
        this.$http.post('/api/login', this.user)
          .then(function (response) {
            let res = response.data

            if (res.code === OK) {
              sessionStorage.setItem('token', res.data.token)
              router.push('admin')
            } else {
              Vue.hintShow = true
              setTimeout(function () {
                Vue.hintShow = false
              }, 2000)
            }
          })
          .catch(function (error) {
            console.log(error.toString())
          })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .login
    position relative
    width 100%
    height 100%
    .login-panel
      position absolute
      top 50%
      left 50%
      width 300px
      height 260px
      margin -130px 0 0 -150px
      background #fff
      border-radius 2px
      box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
      .logo-wrapper
        display block
        height 50px
        padding 3px 0
        background #4285f4
        border-radius 2px 2px 0 0
        text-align center
      .user-wrapper
        width 260px
        margin 30px 20px
        font-size 0
        border-radius 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        .text
          display inline-block
          width 80px
          text-align center
          line-height 30px
          font-size 18px
          color #fff
          background #4285f4
          border-radius 5px 0 0 5px
        #user-name
          vertical-align top
          display inline-block
          width 180px
          height 30px
          line-height 26px
          font-size 16px
          text-indent 10px
          background #f7f7f7
          border-radius 0 5px 5px 0
          box-sizing border-box
          &:focus
            background #fff
            border 2px solid #4285f4
            border-left 0
            outline none
      .pwd-wrapper
        width 260px
        margin 30px 20px
        font-size 0
        border-radius 5px
        box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        .text
          display inline-block
          width 80px
          text-align center
          line-height 30px
          font-size 18px
          color #fff
          background #4285f4
          border-radius 5px 0 0 5px
        #user-pwd
          vertical-align top
          display inline-block
          width 180px
          height 30px
          line-height 30px
          font-size 16px
          text-indent 10px
          background #f7f7f7
          border-radius 0 5px 5px 0
          box-sizing border-box
          &:focus
            background #fff
            border 2px solid #4285f4
            border-left 0
            outline none
      .btn-wrapper
        position relative
        margin 30px 0
        height 30px
        text-align center
        #login-btn
          position absolute
          z-index 2
          top 0
          left 50%
          width 100px
          height 30px
          margin 0 0 0 -50px
          text-align center
          line-height 30px
          font-size 18px
          color #4285f4
          background #f7f7f7
          border none
          border-radius 5px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
          transition all 0.5s ease
          &:hover
            color #fff
            background #4285f4
        .hint
          position absolute
          z-index 1
          top 30px
          left 50%
          width 80px
          height 20px
          margin 0 0 0 -40px
          text-align center
          line-height 20px
          font-size 16px
          color #f92452
          background #f7f7f7
          border-radius 0 0 5px 5px
          box-shadow 0 2px 5px 0 rgba(0,0,0,0.26)
        .slip-enter-active, .slip-leave-active
          transition all 0.5s
        .slip-enter, .slip-leave-active
          transform translate(0,-30px)
</style>
