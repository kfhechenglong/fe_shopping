const Layout = () => import("@/layout/index.vue");

export default {
  path: "/pay",
  name: "Pay",
  component: Layout,
  redirect: "/pay/logs",
  meta: {
    icon: "homeFilled",
    title: "支付管理",
    rank: 5
  },
  children: [
    {
      path: "/pay/logs",
      name: "PayLogs",
      component: () => import("@/views/pay/logs/index.vue"),
      meta: {
        showParent: true,
        title: "支付流水"
      }
    }
  ]
} as RouteConfigsTable;
