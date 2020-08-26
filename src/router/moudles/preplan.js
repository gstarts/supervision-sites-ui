/* Layout */
import Layout from '@/layout'

const router = {
  path: '/preplan',
  name: 'preplan',
  component: Layout,
  // redirect: '/preplanIndex',
  meta: { title: '预配舱单', icon: 'dashboard', noCache: true },
  children: [
    {
      path: 'preplanIndex',
      name: 'preplanIndex',
      component: (resolve) => require(['@/views/page/preplan/index'], resolve),
      meta: { title: '预配舱单', icon: 'dashboard', noCache: true }
    },
    {
      path: 'preplanChange',
      name: 'preplanChange',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: { title: '预配舱单变更申请', icon: 'dashboard', noCache: true }
    },
    {
      path: 'preplanDelete',
      name: 'preplanDelete',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: { title: '预配舱单删除申请', icon: 'dashboard', noCache: true }
    }
  ]
}


 export default router