import request from '@/utils/request'

// 创建标签
export const createTagAPI = (data) => request.post('/admin/tag', data)

// 修改标签
export const modifyTagAPI = (data) => request.put('/admin/tag', { data })

// 删除标签
export const deleteTagAPI = (ids) => request.delete('/admin/tag', { ids })

// 上下线标签
export const changeTagStatusAPI = (id, status) =>
  request.post(`/admin/tag/status/${status}`, { id })
