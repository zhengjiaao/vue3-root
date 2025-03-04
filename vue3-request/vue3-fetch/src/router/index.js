import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import Home from "../views/Home.vue";

// import VueAxios from '../components/VueAxios.vue'
import VueFetchGet from '../components/VueFetchGet.vue'
import VueFetchPost from '../components/VueFetchPost.vue'
import VueFetchPostFile from '../components/VueFetchPostFile.vue'
import VueFetchPut from '../components/VueFetchPut.vue'
// import VueAxiosDelete from '../components/VueAxiosDelete.vue'

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
            path: "/get",
            name: "VueFetchGet",
            component: VueFetchGet,
        },
        {
            path: "/post",
            name: "VueFetchPost",
            component: VueFetchPost,
        },
        {
            path: "/post/file",
            name: "VueFetchPostFile",
            component: VueFetchPostFile,
        },
        {
            path: "/put",
            name: "VueFetchPut",
            component: VueFetchPut,
        },
        /*{
            path: "/delete",
            name: "VueAxiosDelete",
            component: VueAxiosDelete,
        },*/
    ],
});

export default router;
