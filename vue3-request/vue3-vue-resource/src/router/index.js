import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import Home from "../views/Home.vue";

import VueResourceGet from '../components/VueResourceGet.vue'
import VueResourcePost from '../components/VueResourcePost.vue'
import VueResourcePostFile from '../components/VueResourcePostFile.vue'
import VueResourcePut from '../components/VueResourcePut.vue'
import VueResourceDelete from '../components/VueResourceDelete.vue'
import VueResourceJsonp from '../components/VueResourceJsonp.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        /*{
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue"),
        },*/
        {
            path: '/get',
            name: 'VueResourceGet',
            component: VueResourceGet
        },
        {
            path: '/post',
            name: 'VueResourcePost',
            component: VueResourcePost
        },
        {
            path: '/post/file',
            name: 'VueResourcePostFile',
            component: VueResourcePostFile
        },
        {
            path: '/put',
            name: 'VueResourcePut',
            component: VueResourcePut
        },
        {
            path: '/delete',
            name: 'VueResourceDelete',
            component: VueResourceDelete
        },
        {
            path: '/jsonp',
            name: 'VueResourceJsonp',
            component: VueResourceJsonp
        }
    ],
});

export default router;
