import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/password-reset',
    component: () => import('@/views/system-module/org/administrator/password_reset'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [
      {
        path: '/apps/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '??????', affix: true }
      }
    ]
  },

  {
    path: '/apps/oss/commerce/commodity',
    component: Layout,
    children: [
      {
        path: 'approval-pending',
        component: () => import('@/views/commodity-module/product/approval-pending-list'),
        name: 'Approval-Pending',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },

  {
    path: '/apps/commodity',
    component: Layout,
    children: [
      {
        path: 'brand',
        component: () => import('@/views/commodity-module/brand/list'),
        name: 'Brand',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'category',
        component: () => import('@/views/commodity-module/category/list'),
        name: 'Category',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: ':id/categoryAttribute',
        component: () => import('@/views/commodity-module/category/category-attribute'),
        name: 'CategoryAttribute',
        meta: { title: '?????? / ???????????? / ??????????????????' }
      },
      {
        path: 'attribute',
        component: () => import('@/views/commodity-module/attribute/attr-list'),
        name: 'Attribute',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: ':id/attributeVal',
        component: () => import('@/views/commodity-module/attribute/attrval-list'),
        name: 'AttributeVal',
        meta: { title: '?????? / ???????????? / ???????????????' }
      },
      {
        path: 'product',
        component: () => import('@/views/commodity-module/product/list'),
        name: 'Product',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'productAddPage/:id',
        component: () => import('@/views/commodity-module/product/product-template'),
        name: 'ProductAddPage',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: ':id/productDetails',
        component: () => import('@/views/commodity-module/product/product-details'),
        name: 'ProductDetails',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: '/skuListDetails/:id/:categoryNode',
        component: () => import('@/views/commodity-module/product/sku-list'),
        name: 'SkuListDetails',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'product-inventory-batchupdate',
        component: () => import('@/views/commodity-module/product/inventory-price-list'),
        name: 'Inventory-Batchupdate',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'product-price-batchupdate',
        component: () => import('@/views/commodity-module/product/inventory-price-list'),
        name: 'Inventory-Batchupdate',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: ':id/inventoryPriceDetails',
        component: () => import('@/views/commodity-module/product/inventory-price-item-list'),
        name: 'InventoryPriceDetails',
        meta: { title: '?????? / ???????????? / ???????????????????????????' }
      },
      {
        path: 'salescategory',
        component: () => import('@/views/commodity-module/salescategory/sales-category-list'),
        name: 'SalesCategory',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'salescategory-product/:id',
        component: () => import('@/views/commodity-module/salescategory/sales-category-product-list'),
        name: 'SalesCategoryProduct',
        meta: { title: '?????? / ???????????? / ???????????? / ???????????? ' }
      },
      {
        path: 'salesplanning',
        component: () => import('@/views/commodity-module/schedule/list'),
        name: 'SalesPlanning',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'salesplanning-item',
        component: () => import('@/views/commodity-module/schedule/list-item'),
        name: 'SalesPlanningItem',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },

  {
    path: '/apps/marketing/promotion',
    component: Layout,
    children: [
      {
        path: 'activity',
        component: () => import('@/views/marketing-module/promotion/promotion-list'),
        name: 'Activity',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'rules/:id',
        component: () => import('@/views/marketing-module/promotion/promotion-rules'),
        name: 'Rules',
        meta: { title: '?????? / ???????????? / ???????????? / ????????????' }
      },
      {
        path: 'coupon-list',
        component: () => import('@/views/marketing-module/coupon/coupon-list'),
        name: 'Coupon-List',
        meta: { title: '?????? / ???????????? / ???????????????' }
      },
      {
        path: 'coupon-template/:id',
        component: () => import('@/views/marketing-module/coupon/coupon-template'),
        name: 'Coupon-Template',
        meta: { title: '?????? / ???????????? / ???????????????' }
      }
    ]
  },

  {
    path: '/apps/trade/oms',
    component: Layout,
    children: [
      {
        path: 'order',
        component: () => import('@/views/trade-module/oms/order-list'),
        name: 'Order',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'order-detail/:orderCode',
        component: () => import('@/views/trade-module/oms/order-template'),
        name: 'Order-Detail',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },
  {
    path: '/apps/trade/aftersale',
    component: Layout,
    children: [
      {
        path: 'returns-list',
        component: () => import('@/views/trade-module/aftersales/returns-list'),
        name: 'Retruns-List',
        meta: { title: '?????? / ???????????? / ???????????? / ????????????' }
      },
      {
        path: 'refund-list',
        component: () => import('@/views/trade-module/aftersales/refund-list'),
        name: 'Refund-List',
        meta: { title: '?????? / ???????????? / ???????????? / ????????????' }
      }
    ]
  },

  {
    path: '/apps/finance',
    component: Layout,
    children: [
      {
        path: 'promotion-coupon-list',
        component: () => import('@/views/finance-module/promotion/coupon-list'),
        name: 'Promotion-Coupon-List',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'payment-flow-list',
        component: () => import('@/views/finance-module/payment/payment-list'),
        name: 'Payment-Flow-List',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },

  {
    path: '/apps/tms',
    component: Layout,
    children: [
      {
        path: 'freight-template',
        component: () => import('@/views/tms-module/freight/freight-list'),
        name: 'Freight-Template',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'freight-modify-template/:id',
        component: () => import('@/views/tms-module/freight/freight-update-template'),
        name: 'Freight-Modify-Template',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },

  {
    path: '/apps/wms/oms',
    component: Layout,
    children: [
      {
        path: 'wms-order',
        component: () => import('@/views/wms-module/oms/order-list'),
        name: 'WMS-Order',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },

  {
    path: '/apps/wms/aftersale',
    component: Layout,
    children: [
      {
        path: 'exchanged-address',
        component: () => import('@/views/wms-module/exchanged-address/list'),
        name: 'Exchanged-Address',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },

  {
    path: '/apps/srm/supplier',
    component: Layout,
    children: [
      {
        path: 'supplier-list',
        component: () => import('@/views/srm-module/supplier/supplier-list'),
        name: 'Supplier-List',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },

  {
    path: '/apps/member/user',
    component: Layout,
    children: [
      {
        path: 'profile',
        component: () => import('@/views/member-module/profile/list'),
        name: 'Profile',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'details/:id',
        component: () => import('@/views/member-module/profile/details'),
        name: 'ProfileDetail',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },
  {
    path: '/apps/member',
    component: Layout,
    children: [
      {
        path: 'grade',
        component: () => import('@/views/member-module/grade/grade-list'),
        name: 'Grade',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },

{
  path: '/apps/oss/commerce/mop',
  component: Layout,
  children: [
    {
      path: 'merchant',
      component: () => import('@/views/commerce/mop-module/merchant/merchant-list'),
      name: 'Merchant',
      meta: { title: '?????? / ???????????? / ????????????' }
    },
    {
      path: 'account',
      component: () => import('@/views/commerce/mop-module/account/user-list'),
      name: 'Account',
      meta: { title: '?????? / ???????????? / ????????????' }
    },
    {
      path: 'permission',
      component: () => import('@/views/commerce/mop-module/permission/role-list'),
      name: 'Permission',
      meta: { title: '?????? / ???????????? /????????????' }
    },
    {
      path: 'authorization2MopRole',
      component: () => import('@/views/commerce/mop-module/permission/role-permission'),
      name: 'Authorization2MOPRole',
      meta: { title: '???????????? / ????????????' }
    },
  ]
},


  {
    path: '/apps/system/setting', 
    component: Layout,
    children: [
      {
        path: 'dict',
        component: () => import('@/views/system-module/setting/dict/list'),
        name: 'Dictionary',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'sub-dict',
        component: () => import('@/views/system-module/setting/dict/item-list'),
        name: 'Sub-Dictionary',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'area',
        component: () => import('@/views/system-module/setting/area/list'),
        name: 'Area',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },
  {
    path: '/apps/system/org/',
    component: Layout,
    children: [
      {
        path: 'hierarchy',
        component: () => import('@/views/system-module/org/hierarchy/list'),
        name: 'Hierarchy',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'position',
        component: () => import('@/views/system-module/org/position/position-list'),
        name: 'Position',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'administrator',
        component: () => import('@/views/system-module/org/administrator/list'),
        name: 'Administrator',
        meta: { title: '?????? / ???????????? / ????????????' }
      },
      {
        path: 'authorization2User/:id',
        component: () => import('@/views/system-module/org/administrator/authrization'),
        name: 'Authorization2User',
        meta: { title: '?????? / ???????????? / ????????????' }
      }
    ]
  },

  {
    path: '/apps/system/permission',
    component: Layout,
    meta: { title: '??????' },
    children: [
      {
        path: 'biz',
        component: () => import('@/views/system-module/permission/biz/list'),
        name: 'BIZ',
        meta: { title: '???????????? / ????????????' }
      },
      {
        path: 'role',
        component: () => import('@/views/system-module/permission/role/role-list'),
        name: 'Role',
        meta: { title: '???????????? / ????????????' }
      },
      {
        path: 'authorization2Role',
        component: () => import('@/views/system-module/permission/role/role-permission'),
        name: 'Authorization2Role',
        meta: { title: '???????????? / ????????????' }
      },
      {
        path: 'menu',
        component: () => import('@/views/system-module/permission/menu/list'),
        name: 'Menu',
        meta: { title: '???????????? / ????????????' }
      }
    ]
  },
  {
    path: '/apps/topic',
    component: Layout,
    meta: { title: '??????' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/topic-module/topic/index'),
        name: 'TopicList'
      },
      {
        name: 'topicEditor',
        path: 'edit/:id',
        component: () => import('@/views/topic-module/topic/editor/index'),
        meta: { title: '??????', affix: true }
      },
      {
        name: 'topicPcEditor',
        path: 'pcEdit/:id',
        component: () => import('@/views/topic-module/topic/pc-editor/index'),
        meta: { title: '??????', affix: true }
      }
    ]
  },
  {
    path: '/apps/operation',
    component: Layout,
    meta: { title: '?????????' },
    children: [{
      name: 'Operation',
      path: 'index',
      component: () => import('@/views/topic-module/operation/OperatePositionTable')
    },
      {
        name: 'OperationContent',
        path: 'content',
        component: () => import('@/views/topic-module/operation/OperateContentTable')
      }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
