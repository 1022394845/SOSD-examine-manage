import request from '@/utils/request'

// 获取文章列表
export const getArticleListAPI = (pageInfo, args) =>
  request.get('/admin/articles', {
    params: { ...pageInfo, ...args }
  })

// 批量删除文章
export const deleteArticleAPI = (ids) =>
  request.delete('/admin/articles', {
    data: { ids }
  })

// 修改置顶状态
export const changeTopStatusAPI = (id, isTop) =>
  request.post(`/admin/articles/top/${isTop}`, { id })

// 修改推荐状态
export const changeRecommendStatusAPI = (id, isRecommend) =>
  request.post(`/admin/articles/recommend/${isRecommend}`, { id })

// 修改发布状态
export const changePublishStatusAPI = (id, status) => request.put('/admin/articles', { id, status })
