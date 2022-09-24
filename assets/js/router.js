const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
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
        path: "/list",
        name: "list",
        // lazy-loaded
        component: List,
    },
    {
        path: "/order",
        name: "order",
        // lazy-loaded
        component: Order,
    },
    {
        path: "/buy",
        name: "buy",
        // lazy-loaded
        component: Buy,
    }
];
  
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    //history: VueRouter.createMemoryHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/'];
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