import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages

const Landing = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Landing.vue");
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Profile = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Login = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Login.vue");
const Register = () =>
  import(/* webpackChunkName: "common" */ "@/pages/Register.vue");
const LiveTracking = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/LiveTracking.vue");
const Community = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Community.vue");
const Bills = () =>
  import(/* webpackChunkName: "dashboard" */ "@/pages/Bills.vue");

const routes = [
  {
    path: "/",
    redirect: "index.html"
  },
  {
    path: "/index.html",
    name: "landing",
    component: Landing
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/home",
    component: DashboardLayout,
    /* redirect: "dashboard", */
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "live-tracking",
        name: "live-tracking",
        component: LiveTracking
      },
      {
        path: "community",
        name: "community",
        component: Community
      },
      {
        path: "bills",
        name: "bills",
        component: Bills
      }
    ]
  },

  
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
