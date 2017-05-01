<template>
  <div class="loading">
    <span class="lt">
      <span class="line-top"></span>
      <span class="line-bottom"></span>
    </span>
    <span class="slash">
      <span class="line"></span>
    </span>
    <span class="gt">
      <span class="line-top"></span>
      <span class="line-bottom"></span>
    </span>
  </div>
</template>
<script>

</script>
<style lang="stylus" rel="stylesheet/stylus">
  color = #4285f4

  .loading
    width 50px
    height 25px
    font-size 0
    .lt, .gt
      position relative
      display inline-block
      width 15px
      height 25px
    .lt
      animation loading1 0.5s ease infinite alternate
      .line-top
        position absolute
        top 32%
        display inline-block
        width 15px
        height 2.5px
        background color
        border-radius 5px
        transform rotate(-30deg)
      .line-bottom
        position absolute
        bottom 32%
        display inline-block
        width 15px
        height 2.5px
        background color
        border-radius 5px
        transform rotate(30deg)
    .gt
      animation loading3 0.5s ease infinite alternate
      .line-top
        position absolute
        top 32%
        display inline-block
        width 15px
        height 2.5px
        background color
        border-radius 5px
        transform rotate(30deg)
      .line-bottom
        position absolute
        bottom 32%
        display inline-block
        width 15px
        height 2.5px
        background color
        border-radius 5px
        transform rotate(-30deg)
    .slash
      display inline-block
      width 15px
      height 25px
      text-align center
      .line
        display inline-block
        width 3px
        height 25px
        background color
        border-radius 5px
        transform rotate(30deg)
        animation loading2 1s ease infinite
  @keyframes loading1
    0% {
      transform translate(0, 0)
    }
    100% {
      transform translate(-10px, 0)
    }

  @keyframes loading2
    0% {
      transform rotate(30deg)
    }
    100% {
      transform rotate(390deg)
    }

  @keyframes loading3
    0% {
      transform translate(0, 0)
    }
    100% {
      transform translate(10px, 0)
    }
</style>
