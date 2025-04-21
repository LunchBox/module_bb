import { createRouter, createWebHistory } from "vue-router";

import { useAuth } from "@/composables/useAuth";

const routes = [
  {
    path: "/",
    name: "ClientIndex",
    component: () => import("../views/Client/Index.vue"),
  },
  {
    path: "/track/:trackingNumber",
    name: "TrackPackage",
    component: () => import("../views/Client/TrackPackage.vue"),
  },
  {
    path: "/signin",
    name: "ClientSignIn",
    component: () => import("../views/Client/SignIn.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/signup",
    name: "ClientSignUp",
    component: () => import("../views/Client/SignUp.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/send",
    name: "SendPackage",
    component: () => import("../views/Client/SendPackage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mypackages",
    name: "MyPackages",
    component: () => import("../views/Client/MyPackages.vue"),
    meta: { requiresAuth: true },
  },

  // 员工路由
  {
    path: "/staff",
    name: "StaffSignIn",
    component: () => import("../views/Staff/SignIn.vue"),
    meta: { requiresStaffGuest: true },
  },
  {
    path: "/staff/courier",
    component: () => import("../views/Staff/Courier/Pending.vue"),
    meta: { requiresStaffAuth: true, role: "courier" },
    children: [
      {
        path: "pending",
        name: "CourierPending",
        component: () => import("../views/Staff/Courier/Pending.vue"),
      },
      {
        path: "carried",
        name: "CourierCarried",
        component: () => import("../views/Staff/Courier/Carried.vue"),
      },
      {
        path: "account",
        name: "CourierAccount",
        component: () => import("../views/Staff/Courier/Account.vue"),
      },
    ],
  },
  {
    path: "/staff/trucker",
    component: () => import("../views/Staff/Trucker/Operate.vue"),
    meta: { requiresStaffAuth: true, role: "trucker" },
    children: [
      {
        path: "operate",
        name: "TruckerOperate",
        component: () => import("../views/Staff/Trucker/Operate.vue"),
      },
      {
        path: "route",
        name: "TruckerRoute",
        component: () => import("../views/Staff/Trucker/Route.vue"),
      },
      {
        path: "account",
        name: "TruckerAccount",
        component: () => import("../views/Staff/Trucker/Account.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 客户端认证守卫
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "ClientSignIn" });
  } else if (to.meta.requiresGuest && isAuthenticated.value) {
    next({ name: "ClientIndex" });
  } else if (to.meta.requiresStaffAuth) {
    const { isStaffAuthenticated, staffRole } = useAuth();
    if (!isStaffAuthenticated.value) {
      next({ name: "StaffSignIn" });
    } else if (to.meta.role && staffRole.value !== to.meta.role) {
      next({
        name:
          staffRole.value === "courier" ? "CourierPending" : "TruckerOperate",
      });
    } else {
      next();
    }
  } else if (to.meta.requiresStaffGuest) {
    const { isStaffAuthenticated } = useAuth();
    if (isStaffAuthenticated.value) {
      const { staffRole } = useAuth();
      next({
        name:
          staffRole.value === "courier" ? "CourierPending" : "TruckerOperate",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
