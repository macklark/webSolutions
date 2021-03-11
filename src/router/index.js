import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import Dashboard from "@/views/Dashboard.vue";
import Newform from "@/views/Newform.vue";
import { firebaseAuth } from "../firebase/config";
import Notauth from "@/views/Notauth.vue";
import Singlepost from "@/views/Singlepost.vue";
import Profile from "@/views/Profile.vue";

const authGuard = (to, from, next) => {
    let currentUser = firebaseAuth.currentUser;
    if (!currentUser) {
        next({ name: "Notauth" });
    } else {
        next();
    }
};

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/About",
        name: "About",
        component: About,
    },
    {
        path: "/new",
        name: "Newform",
        component: Newform,
        beforeEnter: authGuard,
    },
    {
        path: "/Not-auth",
        name: "Notauth",
        component: Notauth,
    },
    {
        path: "/:id",
        name: "Singlepost",
        component: Singlepost,
        props: true,
    },
    {
        path: "/profile/:id",
        name: "Profile",
        component: Profile,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
