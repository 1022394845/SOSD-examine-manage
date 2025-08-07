<script setup>
import {
  changePublishStatusAPI,
  changeRecommendStatusAPI,
  changeTopStatusAPI,
  deleteArticleAPI,
  getArticleListAPI
} from '@/api/article'
import {
  CirclePlus,
  UserFilled,
  EditPen,
  Delete,
  Brush,
  Search,
  Check
} from '@element-plus/icons-vue'

const formModel = ref({
  author: null,
  title: null,
  status: null,
  isTop: null,
  isRecommend: null
})
const clear = () => {
  formModel.value = {
    author: null,
    title: null,
    status: null,
    isTop: null,
    isRecommend: null
  }
  getArticleList()
}

const pageInfo = ref({
  page: 1, // 当前页码
  pageSize: 10 // 页容量
})
// 文章列表
const articleNum = ref(0)
const articleList = ref([])
const loading = ref(false)
const getArticleList = async () => {
  loading.value = true
  window.scrollTo(0, 0)
  const {
    data: { total, records }
  } = await getArticleListAPI(pageInfo.value, formModel.value)
  articleNum.value = total
  articleList.value = records
  loading.value = false
}
onMounted(() => {
  getArticleList()
})
watch(
  pageInfo,
  () => {
    getArticleList()
  },
  {
    deep: true
  }
)

const onSearch = () => {
  if (formModel.value) {
    for (let key in formModel.value) {
      if (formModel.value[key] === '') formModel.value[key] = null
    }
  }
  getArticleList()
}

const onDelete = ref(false)
const deleteIds = ref(new Set())
const onBatchDelete = async () => {
  if (!onDelete.value) onDelete.value = true
  else {
    if (deleteIds.value.size) {
      await ElMessageBox.confirm('删除文章后无法恢复，请谨慎操作！', '确认删除文章吗', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await deleteArticleAPI(Array.from(deleteIds.value))
      getArticleList()
      ElMessage.success('删除成功')
    }
    onDelete.value = false
  }
}
const toggleDeleteStatus = (id) => {
  if (deleteIds.value.has(id)) deleteIds.value.delete(id)
  else deleteIds.value.add(id)
}

const onChangeTopStatus = async (row) => {
  row.topLoading = true
  try {
    const newStatus = !row.isTop
    await changeTopStatusAPI(row.id, newStatus ? 1 : 0)
    ElMessage.success('修改成功')
    row.isTop = newStatus
  } finally {
    row.topLoading = false
  }
}

const onChangeRecommendStatus = async (row) => {
  row.recommendLoading = true
  try {
    const newStatus = !row.isRecommend
    await changeRecommendStatusAPI(row.id, newStatus ? 1 : 0)
    ElMessage.success('修改成功')
    row.isRecommend = newStatus
  } finally {
    row.recommendLoading = false
  }
}

const onChangePublishStatus = async (row) => {
  await changePublishStatusAPI(row.id, row.status)
  ElMessage.success('修改成功')
}
</script>

<template>
  <div class="article-page">
    <div class="operation">
      <el-input v-model="formModel.author" placeholder="请输入作者名" style="width: 150px" />
      <el-input v-model="formModel.title" placeholder="请输入标题" style="width: 200px" />
      <el-select v-model="formModel.status" placeholder="选择状态" style="width: 100px">
        <el-option label="未发布" :value="0" />
        <el-option label="审核中" :value="1" />
        <el-option label="已发布" :value="2" />
      </el-select>
      <el-select v-model="formModel.isTop" placeholder="是否置顶" style="width: 100px">
        <el-option label="否" :value="false" />
        <el-option label="是" :value="true" />
      </el-select>
      <el-select v-model="formModel.isRecommend" placeholder="是否推荐" style="width: 100px">
        <el-option label="否" :value="false" />
        <el-option label="是" :value="true" />
      </el-select>
      <el-button type="primary" size="small" @click="clear">清空筛选</el-button>
      <div class="button">
        <el-button type="primary" :icon="Search" class="btn" @click="onSearch" />
        <el-button type="primary" :icon="CirclePlus" class="btn" />
        <el-button
          type="danger"
          :icon="onDelete ? Check : Delete"
          class="btn"
          @click="onBatchDelete"
        />
      </div>
    </div>
    <div class="table">
      <el-table :data="articleList" style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="updateTime" label="修改时间" width="200" align="center" />
        <el-table-column prop="image" label="作者" width="80" align="center">
          <template #default="{ row }">
            <el-avatar fit="fill">
              <img v-if="row.image" :src="row.image" alt="" />
              <el-icon v-else><UserFilled /></el-icon>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="isTop" label="置顶" width="80" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.isTop"
              :loading="row.topLoading"
              :before-change="() => onChangeTopStatus(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="isRecommend" label="推荐" width="80" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.isRecommend"
              :loading="row.recommendLoading"
              :before-change="() => onChangeRecommendStatus(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-select v-model="row.status" placeholder="状态" @change="onChangePublishStatus(row)">
              <el-option label="未发布" :value="0" />
              <el-option label="审核中" :value="1" />
              <el-option label="已发布" :value="2" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button type="primary" :icon="EditPen" class="btn" />
            <el-button type="primary" :icon="Brush" class="btn" />
            <el-button
              type="danger"
              :icon="Delete"
              class="btn"
              v-if="onDelete"
              @click="toggleDeleteStatus(row.id)"
              :plain="!deleteIds.has(row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination" v-if="articleNum">
        <el-pagination
          layout="prev, pager, next"
          background
          :total="articleNum"
          v-model:current-page="pageInfo.page"
          v-model:page-size="pageInfo.pageSize"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-page {
  .btn {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }

  .operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 80px;
    border-radius: 10px;
    background-color: #ffffff;
  }

  .table {
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffffff;

    .pagination {
      margin-top: 30px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
