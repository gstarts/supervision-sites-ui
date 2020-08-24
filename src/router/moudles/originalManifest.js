/* Layout */
import Layout from '@/layout'

const router = {
  path: '/originalManifest',
  name: 'originalManifest',
  component: Layout,
  // redirect: '/originalManifestIndex',
  meta: { title: '原始舱单', icon: 'dashboard', noCache: true },
  children: [
    {
      path: 'originalManifestIndex',
      name: 'originalManifestIndex',
      component: (resolve) => require(['@/views/page/originalManifest/index'], resolve),
      meta: { title: '原始舱单', icon: 'dashboard', noCache: true }
    },
    {
      path: 'originalManifestChange',
      name: 'originalManifestChange',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: { title: '原始舱单变更申请', icon: 'dashboard', noCache: true }
    },
    {
      path: 'originalManifestDelete',
      name: 'originalManifestDelete',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: { title: '原始舱单删除申请', icon: 'dashboard', noCache: true }
    }
  ]
}


 export default router