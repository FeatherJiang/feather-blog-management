<template>
  <div id="app">
    <transition name="login">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background url("assets/imgs/e.jpg") no-repeat
    background-size 100% 100%
  .login-enter-active, .login-leave-active
    transition all 0.5s ease
  .login-enter
    position fixed
    transform translate(0, 100%)
  .login-leave-active
    position fixed
    transform translate(0, -100%)
</style>
