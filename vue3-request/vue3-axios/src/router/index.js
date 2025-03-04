import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import Home from "../views/Home.vue";

import VueAxios from '../components/VueAxios.vue'
import VueAxiosGet from '../components/VueAxiosGet.vue'
import VueAxiosPost from '../components/VueAxiosPost.vue'
import VueAxiosPostFile from '../components/VueAxiosPostFile.vue'
import VueAxiosPut from '../components/VueAxiosPut.vue'
import VueAxiosDelete from '../components/VueAxiosDelete.vue'

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
            path: "/axios",
            name: "VueAxios",
            component: VueAxios,
        },
        {
            path: "/get",
            name: "VueAxiosGet",
            component: VueAxiosGet,
        },
        {
            path: "/post",
            name: "VueAxiosPost",
            component: VueAxiosPost,
        },
        {
            path: "/post/file",
            name: "VueAxiosPostFile",
            component: VueAxiosPostFile,
        },
        {
            path: "/put",
            name: "VueAxiosPut",
            component: VueAxiosPut,
        },
        {
            path: "/delete",
            name: "VueAxiosDelete",
            component: VueAxiosDelete,
        },
    ],
});

export default router;
