<template>
  <div class="nav">
    <a class="logo-wrapper" href="#">
      <img src="../../assets/imgs/feather_white.png" alt="" class="logo" width="40" height="40">
    </a>
    <div class="navitem-wrapper" v-for="item in itemList">
      <navitem :routerLink="item.routerLink" :fontClass="item.fontClass" :hintText="item.hintText"></navitem>
    </div>
  </div>
</template>
<script>
  import navitem from 'components/navitem/navitem'

  export default {
    data () {
      return {
        itemList: [
          {
            routerLink: '/admin/write',
            fontClass: 'fa-pencil-square-o',
            hintText: 'write'
          },
          {
            routerLink: '/admin/article',
            fontClass: 'fa-file',
            hintText: 'article'
          },
          {
            routerLink: '/admin/banner',
            fontClass: 'fa-star',
            hintText: 'banner'
          },
          {
            routerLink: '/admin/aboutme',
            fontClass: 'fa-id-card',
            hintText: 'aboutme'
          }
        ]
      }
    },
    components: {
      navitem: navitem
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .nav
    background #4285f4
    .logo-wrapper
      display block
      padding 5px
</style>
