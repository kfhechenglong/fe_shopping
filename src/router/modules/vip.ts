const Layout = () => import("@/layout/index.vue");

export default {
  path: "/vip",
  name: "Vip",
  component: Layout,
  redirect: "/vip/index",
  meta: {
    icon: "homeFilled",
    title: "会员管理",
    rank: 3
  },
  children: [
    {
      path: "/vip/address",
      name: "VipAddress",
      component: () => import("@/views/vip/address/index.vue"),
      meta: {
        showParent: true,
        title: "会员信息"
      }
    },
    {
      path: "/vip/info",
      name: "VipInfo",
      component: () => import("@/views/vip/info/index.vue"),
      meta: {
        showParent: true,
        title: "会员信息"
      }
    }
  ]
} as RouteConfigsTable;
