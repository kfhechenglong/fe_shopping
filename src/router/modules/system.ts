export default {
  path: "/system",
  name: "System",
  redirect: "/system/user",
  meta: {
    icon: "homeFilled",
    title: "系统管理",
    rank: 7
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
    },
    {
      path: "/system/company",
      name: "Company",
      component: () => import("@/views/system/company/index.vue"),
      meta: {
        title: "企业信息",
        showParent: true
      }
    },
    {
      path: "/system/menu",
      name: "Menu",
      component: () => import("@/views/system/menu/index.vue"),
      meta: {
        title: "菜单管理",
        showParent: true
      }
    },
    {
      path: "/system/role",
      name: "Role",
      component: () => import("@/views/system/menu/role.vue"),
      meta: {
        title: "角色管理",
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
