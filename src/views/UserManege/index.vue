<script setup>
import { deleteUserAPI, getUserListAPI } from '@/api/user'
import { Plus, UserFilled, EditPen, Delete } from '@element-plus/icons-vue'
import UserEditor from './components/UserEditor.vue'

const pageInfo = ref({
  page: 1, // 当前页码
  pageSize: 10 // 页容量
})
// 用户列表
const userNum = ref(0)
const userList = ref([])
const loading = ref(false)
const getUserList = async () => {
  loading.value = true
  window.scrollTo(0, 0)
  const {
    data: { total, records }
  } = await getUserListAPI(pageInfo.value)
  userNum.value = total
  userList.value = records
  loading.value = false
}
onMounted(() => {
  getUserList()
})
watch(
  pageInfo,
  () => {
    getUserList()
  },
  {
    deep: true
  }
)

const userEditor = ref()
const onAddUser = () => {
  userEditor.value.open()
}
const onEditUser = (data) => {
  userEditor.value.open(data)
}

const onDeleteUser = async (id) => {
  await ElMessageBox.confirm('删除此用户后无法恢复，请谨慎操作！', '确认删除此用户吗', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteUserAPI(id)
  getUserList()
  ElMessage.success('删除成功')
}
</script>

<template>
  <div class="user-page">
    <div class="operation">
      <div class="title">用户管理</div>
      <el-button type="primary" :icon="Plus" @click="onAddUser">添加作者</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" style="width: 100%" v-loading="loading">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="image" label="头像" width="150" align="center">
          <template #default="{ row }">
            <el-avatar fit="fill">
              <img v-if="row.image" :src="row.image" alt="" />
              <el-icon v-else><UserFilled /></el-icon>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button type="primary" :icon="EditPen" @click="onEditUser(row)">编辑</el-button>
            <el-button type="danger" :icon="Delete" @click="onDeleteUser(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination" v-if="userNum">
        <el-pagination
          layout="prev, pager, next"
          background
          :total="userNum"
          v-model:current-page="pageInfo.page"
          v-model:page-size="pageInfo.pageSize"
        />
      </div>
    </div>
    <UserEditor ref="userEditor" @success="getUserList" />
  </div>
</template>

<style scoped lang="scss">
.user-page {
  .operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    height: 80px;
    border-radius: 10px;
    background-color: #ffffff;

    .title {
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>
