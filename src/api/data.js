import request from '@/utils/request'

// 获取访问总数
export const getVisitNumAPI = () => request.get('/admin/data/visit')

// 获取用户总数
export const getUserNumAPI = () => request.get('/admin/data/users')

// 获取文章总数
export const getArticleNumAPI = () => request.get('/admin/data/articles')

// 获取专栏总数
export const getCategoryNumAPI = () => request.get('/admin/data/category')

// 获取数据统计图表数据
export const getDataChartInfoAPI = () => request.get('/admin/data/count')
