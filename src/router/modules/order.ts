const Layout = () => import("@/layout/index.vue");

export default {
  path: "/order",
  name: "Order",
  component: Layout,
  redirect: "/order/index",
  meta: {
    icon: "homeFilled",
    title: "订单管理",
    rank: 2
  },
  children: [
    {
      path: "/order/index",
      name: "orderInder",
      component: () => import("@/views/order/index.vue"),
      meta: {
        showParent: true,
        title: "订单管理"
      }
    }
  ]
} as RouteConfigsTable;
