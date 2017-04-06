import Vue from 'vue'
import Router from 'vue-router'

import login from 'components/login/login'
import admin from 'components/admin/admin'
import write from 'components/write/write'
import article from 'components/article/article'
import banner from 'components/banner/banner'
import aboutme from 'components/aboutme/aboutme'
import comments from 'components/comments/comments'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [
        {
          path: 'write',
          name: 'write',
          component: write
        },
        {
          path: 'article',
          name: 'article',
          component: article
        },
        {
          path: 'banner',
          name: 'banner',
          component: banner
        },
        {
          path: 'aboutme',
          name: 'aboutme',
          component: aboutme
        },
        {
          path: 'comments',
          name: 'comments',
          component: comments
        }
      ]
    }
  ]
})
