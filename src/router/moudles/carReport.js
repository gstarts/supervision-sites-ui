/* Layout */
import Layout from '@/layout'

const router = {
  path: '/carReport',
  name: 'carReport',
  component: Layout,
  // redirect: '/originalManifestIndex',
  meta: { title: '车辆进出境确报告', icon: 'dashboard', noCache: true},
  children: [
    {
      path: 'carReportInReport',
      name: 'carReportInReport',
      component: (resolve) => require(['@/views/page/carReport/carReportInReport'], resolve),
      meta: { title: '载货车辆进境确报', icon: 'dashboard', noCache: true}
    },
    {
      path: 'carReportDelete',
      name: 'carReportDelete',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: { title: '载货车辆进境确报删除申请', icon: 'dashboard', noCache: true}
    }
  ]
}


 export default router