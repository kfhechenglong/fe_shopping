export default {
  path: "/system",
  name: "System",
  redirect: "/system/user",
  meta: {
    icon: "homeFilled",
    title: "系统管理",
    rank: 0
  },
  children: [
    {
      path: "/system/user",
      name: "User",
      component: () => import("@/views/system/user/index.vue"),
      meta: {
        title: "用户信息",
        showParent: true
      }
    },
    {
      path: "/system/user/create",
      name: "UserCreate",
      component: () => import("@/views/system/user/create.vue"),
      meta: {
        title: "新建用户",
        showParent: true,
        showLink: false
      }
    },
    {
      path: "/system/user/edit",
      name: "UserEdit",
      component: () => import("@/views/system/user/edit.vue"),
      meta: {
        title: "编辑用户",
        showParent: true,
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
