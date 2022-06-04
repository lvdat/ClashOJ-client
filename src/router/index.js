import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

// lazy-loaded
const Profile = () => import("../components/Profile.vue")
const BoardAdmin = () => import("../components/BoardAdmin.vue")
const BoardModerator = () => import("../components/BoardModerator.vue")
const BoardUser = () => import("../components/BoardUser.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Trang chủ - ClashOJ - Hệ thống thi đấu coding thời gian thực!' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/testapi',
      name: 'testapi',
      component: () => import('../views/TestAPI.vue'),
      meta: { title: 'Test API ClashOJ' }
    },
    {
      path: '/submission',
      name: 'submission',
      component: () => import('../views/Submission.vue'),
      meta: { title: 'Submission - ClashOJ' }
    },
    {
      path: '/problems',
      name: 'problems',
      component: () => import('../views/Problems.vue'),
      meta: { title: 'Problems - ClashOJ' }
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: Profile,
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: BoardAdmin,
    },
    {
      path: "/mod",
      name: "moderator",
      // lazy-loaded
      component: BoardModerator,
    },
    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: BoardUser,
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
