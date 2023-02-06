const Layout = () => import("@/layout/index.vue");

export default {
  path: "/scorecard",
  name: "Scorecard",
  component: Layout,
  redirect: "/scorecard/logs",
  meta: {
    icon: "homeFilled",
    title: "积分管理",
    rank: 4
  },
  children: [
    {
      path: "/scorecard/logs",
      name: "ScorecardLogs",
      component: () => import("@/views/scorecard/logs/index.vue"),
      meta: {
        title: "积分管理"
      }
    }
  ]
} as RouteConfigsTable;
