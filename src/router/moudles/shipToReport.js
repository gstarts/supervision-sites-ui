/* Layout */
import Layout from '@/layout'

const router = {
  path: '/shipToReport',
  name: 'shipToReport',
  component: Layout,
  // redirect: '/originalManifestIndex',
  meta: { title: '运抵报告', icon: 'dashboard', noCache: true},
  children: [
    {
      path: 'shipToReportIndex',
      name: 'shipToReportIndex',
      component: (resolve) => require(['@/views/page/shipToReport/index'], resolve),
      meta: { title: '出口运抵报告', icon: 'dashboard', noCache: true}
    },
    {
      path: 'shipToReportDelete',
      name: 'shipToReportDelete',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: { title: '出口运抵报告删除申请', icon: 'dashboard', noCache: true}
    }
  ]
}


 export default router