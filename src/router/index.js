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
        meta: { title: '首页', affix: true }
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
        meta: { title: '商城 / 商品管理 / 商品审核' }
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
        meta: { title: '商城 / 商品管理 / 品牌信息' }
      },
      {
        path: 'category',
        component: () => import('@/views/commodity-module/category/list'),
        name: 'Category',
        meta: { title: '商城 / 商品管理 / 基础类目' }
      },
      {
        path: ':id/categoryAttribute',
        component: () => import('@/views/commodity-module/category/category-attribute'),
        name: 'CategoryAttribute',
        meta: { title: '商城 / 商品管理 / 配置类目规格' }
      },
      {
        path: 'attribute',
        component: () => import('@/views/commodity-module/attribute/attr-list'),
        name: 'Attribute',
        meta: { title: '商城 / 预置属性 / 属性管理' }
      },
      {
        path: ':id/attributeVal',
        component: () => import('@/views/commodity-module/attribute/attrval-list'),
        name: 'AttributeVal',
        meta: { title: '商城 / 预置属性 / 属性值管理' }
      },
      {
        path: 'product',
        component: () => import('@/views/commodity-module/product/list'),
        name: 'Product',
        meta: { title: '商城 / 商品管理 / 商品信息' }
      },
      {
        path: 'productAddPage/:id',
        component: () => import('@/views/commodity-module/product/product-template'),
        name: 'ProductAddPage',
        meta: { title: '商城 / 商品管理 / 创建商品' }
      },
      {
        path: ':id/productDetails',
        component: () => import('@/views/commodity-module/product/product-details'),
        name: 'ProductDetails',
        meta: { title: '商城 / 商品管理 / 商品详情' }
      },
      {
        path: '/skuListDetails/:id/:categoryNode',
        component: () => import('@/views/commodity-module/product/sku-list'),
        name: 'SkuListDetails',
        meta: { title: '商城 / 商品管理 / 商品规格' }
      },
      {
        path: 'product-inventory-batchupdate',
        component: () => import('@/views/commodity-module/product/inventory-price-list'),
        name: 'Inventory-Batchupdate',
        meta: { title: '商城 / 商品管理 / 批量库存' }
      },
      {
        path: 'product-price-batchupdate',
        component: () => import('@/views/commodity-module/product/inventory-price-list'),
        name: 'Inventory-Batchupdate',
        meta: { title: '商城 / 商品管理 / 批量价格' }
      },
      {
        path: ':id/inventoryPriceDetails',
        component: () => import('@/views/commodity-module/product/inventory-price-item-list'),
        name: 'InventoryPriceDetails',
        meta: { title: '商城 / 商品管理 / 价格、库存变更明细' }
      },
      {
        path: 'salescategory',
        component: () => import('@/views/commodity-module/salescategory/sales-category-list'),
        name: 'SalesCategory',
        meta: { title: '商城 / 商品运营 / 运营类目' }
      },
      {
        path: 'salescategory-product/:id',
        component: () => import('@/views/commodity-module/salescategory/sales-category-product-list'),
        name: 'SalesCategoryProduct',
        meta: { title: '商城 / 商品运营 / 运营类目 / 商品列表 ' }
      },
      {
        path: 'salesplanning',
        component: () => import('@/views/commodity-module/schedule/list'),
        name: 'SalesPlanning',
        meta: { title: '商城 / 商品运营 / 卖场排期' }
      },
      {
        path: 'salesplanning-item',
        component: () => import('@/views/commodity-module/schedule/list-item'),
        name: 'SalesPlanningItem',
        meta: { title: '商城 / 商品运营 / 卖场明细' }
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
        meta: { title: '商城 / 营销管理 / 促销活动' }
      },
      {
        path: 'rules/:id',
        component: () => import('@/views/marketing-module/promotion/promotion-rules'),
        name: 'Rules',
        meta: { title: '商城 / 营销管理 / 促销活动 / 活动规则' }
      },
      {
        path: 'coupon-list',
        component: () => import('@/views/marketing-module/coupon/coupon-list'),
        name: 'Coupon-List',
        meta: { title: '商城 / 营销管理 / 优惠券管理' }
      },
      {
        path: 'coupon-template/:id',
        component: () => import('@/views/marketing-module/coupon/coupon-template'),
        name: 'Coupon-Template',
        meta: { title: '商城 / 营销管理 / 优惠券信息' }
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
        meta: { title: '商城 / 订单中心 / 订单管理' }
      },
      {
        path: 'order-detail/:orderCode',
        component: () => import('@/views/trade-module/oms/order-template'),
        name: 'Order-Detail',
        meta: { title: '商城 / 订单中心 / 订单详情' }
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
        meta: { title: '商城 / 订单中心 / 售后服务 / 售后申请' }
      },
      {
        path: 'refund-list',
        component: () => import('@/views/trade-module/aftersales/refund-list'),
        name: 'Refund-List',
        meta: { title: '商城 / 订单中心 / 售后服务 / 退款明细' }
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
        meta: { title: '商城 / 财务管理 / 营销预算' }
      },
      {
        path: 'payment-flow-list',
        component: () => import('@/views/finance-module/payment/payment-list'),
        name: 'Payment-Flow-List',
        meta: { title: '商城 / 财务管理 / 交易流水' }
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
        meta: { title: '商城 / 物流配送 / 运费模板' }
      },
      {
        path: 'freight-modify-template/:id',
        component: () => import('@/views/tms-module/freight/freight-update-template'),
        name: 'Freight-Modify-Template',
        meta: { title: '商城 / 物流配送 / 修改模板' }
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
        meta: { title: '商城 / 订单中心 / 仓储发货' }
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
        meta: { title: '商城 / 订单中心 / 退货地址' }
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
        meta: { title: '商城 / 商家中心 / 商家管理' }
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
        meta: { title: '会员 / 会员管理 / 会员信息' }
      },
      {
        path: 'details/:id',
        component: () => import('@/views/member-module/profile/details'),
        name: 'ProfileDetail',
        meta: { title: '会员 / 会员管理 / 会员详情' }
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
        meta: { title: '会员 / 会员权益 / 等级权益' }
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
      meta: { title: '商户 / 商户管理 / 商户信息' }
    },
    {
      path: 'account',
      component: () => import('@/views/commerce/mop-module/account/user-list'),
      name: 'Account',
      meta: { title: '商户 / 商户管理 / 商品账号' }
    },
    {
      path: 'permission',
      component: () => import('@/views/commerce/mop-module/permission/role-list'),
      name: 'Permission',
      meta: { title: '商户 / 商户管理 /商户角色' }
    },
    {
      path: 'authorization2MopRole',
      component: () => import('@/views/commerce/mop-module/permission/role-permission'),
      name: 'Authorization2MOPRole',
      meta: { title: '权限管理 / 角色授权' }
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
        meta: { title: '设置 / 系统管理 / 数据字典' }
      },
      {
        path: 'sub-dict',
        component: () => import('@/views/system-module/setting/dict/item-list'),
        name: 'Sub-Dictionary',
        meta: { title: '设置 / 系统管理 / 数据字典' }
      },
      {
        path: 'area',
        component: () => import('@/views/system-module/setting/area/list'),
        name: 'Area',
        meta: { title: '设置 / 系统管理 / 行政区域' }
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
        meta: { title: '设置 / 组织管理 / 组织架构' }
      },
      {
        path: 'position',
        component: () => import('@/views/system-module/org/position/position-list'),
        name: 'Position',
        meta: { title: '设置 / 组织管理 / 岗位管理' }
      },
      {
        path: 'administrator',
        component: () => import('@/views/system-module/org/administrator/list'),
        name: 'Administrator',
        meta: { title: '设置 / 组织管理 / 用户管理' }
      },
      {
        path: 'authorization2User/:id',
        component: () => import('@/views/system-module/org/administrator/authrization'),
        name: 'Authorization2User',
        meta: { title: '设置 / 组织管理 / 用户授权' }
      }
    ]
  },

  {
    path: '/apps/system/permission',
    component: Layout,
    meta: { title: '设置' },
    children: [
      {
        path: 'biz',
        component: () => import('@/views/system-module/permission/biz/list'),
        name: 'BIZ',
        meta: { title: '权限管理 / 角色管理' }
      },
      {
        path: 'role',
        component: () => import('@/views/system-module/permission/role/role-list'),
        name: 'Role',
        meta: { title: '权限管理 / 角色管理' }
      },
      {
        path: 'authorization2Role',
        component: () => import('@/views/system-module/permission/role/role-permission'),
        name: 'Authorization2Role',
        meta: { title: '权限管理 / 角色授权' }
      },
      {
        path: 'menu',
        component: () => import('@/views/system-module/permission/menu/list'),
        name: 'Menu',
        meta: { title: '权限管理 / 功能菜单' }
      }
    ]
  },
  {
    path: '/apps/topic',
    component: Layout,
    meta: { title: '专题' },
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
        meta: { title: '编辑', affix: true }
      },
      {
        name: 'topicPcEditor',
        path: 'pcEdit/:id',
        component: () => import('@/views/topic-module/topic/pc-editor/index'),
        meta: { title: '编辑', affix: true }
      }
    ]
  },
  {
    path: '/apps/operation',
    component: Layout,
    meta: { title: '运营位' },
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
