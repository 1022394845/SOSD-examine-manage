import request from '@/utils/request'

// 获取用户列表
export const getUserListAPI = (pageInfo, args) =>
  request.get('/admin/users', {
    params: { ...pageInfo, ...args }
  })

// 新增用户
export const addUserAPI = (data) => request.post('/user/addAuthors', data)

// 修改用户信息
export const modifyUserInfoAPI = (data) => request.put('/admin/users', data)

// 删除用户
export const deleteUserAPI = (ids) => request.delete('/admin/users', { params: { ids } })

// 上传头像
export const uploadAvatarAPI = (file) => request.post('/user/common/upload', { file })
