/* Layout */
import Layout from '@/layout'

const router = {
  path: '/tallyingReport',
  name: 'tallyingReport',
  component: Layout,
  // redirect: '/originalManifestIndex',
  meta: { title: '理货报告', icon: 'dashboard', noCache: true },
  children: [
    {
      path: 'tallyingReportIndex',
      name: 'tallyingReportIndex',
      component: (resolve) => require(['@/views/page/tallyingReport/index'], resolve),
      meta: { title: '进口理货', icon: 'dashboard', noCache: true }
    },
    {
      path: 'tallyingReportChange',
      name: 'tallyingReportChange',
      component: (resolve) => require(['@/views/page/tallyingReport/tallyingReportChange'], resolve),
      meta: { title: '进口理货删除申请', icon: 'dashboard', noCache: true }
    },
    {
      path: 'exitReport',
      name: 'exitReport',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: { title: '出口理货', icon: 'dashboard', noCache: true }
    },
    {
      path: 'tallyingReportDelete',
      name: 'tallyingReportDelete',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: { title: '出口理货删除申请', icon: 'dashboard', noCache: true }
    }
  ]
}


 export default router