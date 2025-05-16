import request from '@/utils/request'

// 获取用户列表
export const getUserListAPI = (pageInfo, args) =>
  request.get('/admin/users', {
    params: { ...pageInfo, ...args }
  })

// 修改用户信息
export const modifyUserInfoAPI = (data) => request.put('/admin/users', data)
