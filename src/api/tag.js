import request from '@/utils/request'

// 创建标签
export const createTagAPI = (data) => request.post('/admin/tag', data)

// 修改标签
export const modifyTagAPI = (data) => request.put('/admin/tag', { data })
