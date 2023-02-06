const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Commodity",
  component: Layout,
  redirect: "/commodityClassify",
  meta: {
    icon: "homeFilled",
    title: "商品管理",
    rank: 1
  },
  children: [
    {
      path: "/commodityClassify",
      name: "CommodityClassify",
      component: () => import("@/views/commodity/commodityClassify/index.vue"),
      meta: {
        title: "商品分类"
      }
    },
    {
      path: "/commodityType",
      name: "CommodityType",
      component: () => import("@/views/commodity/commodityType/index.vue"),
      meta: {
        title: "商品属性"
      }
    },
    {
      path: "/brand",
      name: "Brand",
      component: () => import("@/views/commodity/brand/index.vue"),
      meta: {
        title: "品牌管理"
      }
    },
    {
      path: "/production",
      name: "Production",
      component: () => import("@/views/commodity/production/index.vue"),
      meta: {
        title: "产品管理"
      }
    },
    {
      path: "/commodity",
      name: "Commodity",
      component: () => import("@/views/commodity/commodity/index.vue"),
      meta: {
        title: "商品管理"
      }
    },
    {
      path: "/productionSpecification",
      name: "ProductionSpecification",
      component: () =>
        import("@/views/commodity/productionSpecification/index.vue"),
      meta: {
        title: "产品规格"
      }
    }
  ]
} as RouteConfigsTable;
