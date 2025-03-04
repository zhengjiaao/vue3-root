import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueAxios from '@/components/VueAxios'
import VueAxiosGet from '@/components/VueAxiosGet'
import VueAxiosPost from '@/components/VueAxiosPost'
import VueAxiosPostFile from '@/components/VueAxiosPostFile'
import VueAxiosPut from '@/components/VueAxiosPut'
import VueAxiosDelete from '@/components/VueAxiosDelete'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/axios',
      name: 'VueAxios',
      component: VueAxios
    },
    {
      path: '/get',
      name: 'VueAxiosGet',
      component: VueAxiosGet
    },
    {
      path: '/post',
      name: 'VueAxiosPost',
      component: VueAxiosPost
    },
    {
      path: '/post/file',
      name: 'VueAxiosPostFile',
      component: VueAxiosPostFile
    },
    {
      path: '/put',
      name: 'VueAxiosPut',
      component: VueAxiosPut
    },
    {
      path: '/delete',
      name: 'VueAxiosDelete',
      component: VueAxiosDelete
    }
  ]
})
