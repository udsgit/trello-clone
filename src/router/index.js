import { createRouter, createWebHistory} from "vue-router";
import store from "../store/index.js";
import AuthView from "../views/AuthView.vue";

const routes = [
    {
        path: "/",
        name: "auth",
        component: AuthView
    },
    {
        path: "/board",
        name: "board",
        component: () => import("../views/BoardView.vue"),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: "card/:id",
                name: "card",
                component: () => import("../views/CardView.vue")
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("../views/NotFoundView.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})



router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta?.requiresAuth)
    const user = await store.dispatch("user/getUser");

    if(requiresAuth && !user){
        next("/");
    }else if (to.name === "auth" && user){
        next("/board");
    } else {
        next();
    }
})

export default router;