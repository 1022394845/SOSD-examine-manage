import request from '@/utils/request'

// 获取文章列表
export const getArticleListAPI = (pageInfo, args) =>
  request.get('/admin/articles', {
    params: { ...pageInfo, ...args }
  })

// 批量删除文章
export const deleteArticleAPI = (ids) =>
  request.delete('/admin/articles', {
    params: { ids }
  })

// 修改置顶状态
export const changeTopStatusAPI = (id, isTop) =>
  request.put(`/admin/articles/top/${isTop}`, null, { params: { id } })

// 修改推荐状态
export const changeRecommendStatusAPI = (id, isRecommend) =>
  request.put(`/admin/articles/recommend/${isRecommend}`, null, { params: { id } })

// 修改发布状态
export const changePublishStatusAPI = (id, status) => request.put('/admin/articles', { id, status })
