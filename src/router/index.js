import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import DataManage from '@/views/DataManage/index.vue'
import TagManage from '@/views/TagManage/index.vue'
import UserManage from '@/views/UserManege/index.vue'
import ArticleManage from '@/views/ArticleManage/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/data',
      children: [
        {
          path: '/data',
          component: DataManage
        },
        {
          path: '/tag',
          component: TagManage
        },
        {
          path: '/user',
          component: UserManage
        },
        {
          path: '/article',
          component: ArticleManage
        }
      ]
    }
  ],
  // 路由视口置顶
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
