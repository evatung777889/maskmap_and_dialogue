import Vue from 'vue'
import Router from 'vue-router'
import maskmap from '@/components/maskmap'
import dialogue from '@/components/dialogue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'maskmap',
      component: maskmap
    },
    {
      path: '/dialogue',
      name: 'dialogue',
      component: dialogue
    },
  ]
})
