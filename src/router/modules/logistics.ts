const Layout = () => import("@/layout/index.vue");

export default {
  path: "/logistics",
  name: "Logistics",
  component: Layout,
  redirect: "/logistics/index",
  meta: {
    icon: "homeFilled",
    title: "物流管理",
    rank: 6
  },
  children: [
    {
      path: "/logistics/index",
      name: "LogisticsInder",
      component: () => import("@/views/logistics/logisticsIndex/index.vue"),
      meta: {
        title: "物流管理"
      }
    },
    {
      path: "/logistics/distribution",
      name: "Distribution",
      component: () => import("@/views/logistics/distribution/index.vue"),
      meta: {
        title: "订单配送"
      }
    }
  ]
} as RouteConfigsTable;
