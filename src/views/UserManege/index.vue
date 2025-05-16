<script setup>
import { getUserListAPI } from '@/api/user'
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
  const {
    data: { total, record }
  } = await getUserListAPI(pageInfo.value)
  userNum.value = total
  userList.value = record
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
const onEditUser = (data) => {
  userEditor.value.open(data)
}
</script>

<template>
  <div class="user-page">
    <div class="operation">
      <el-button type="primary" :icon="Plus">添加作者</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" style="width: 100%" v-loading="loading">
        <el-table-column prop="username" label="作者名称" min-width="40%" />
        <el-table-column prop="image" label="作者头像" min-width="30%">
          <template #default="{ row }">
            <el-avatar fit="fill">
              <img v-if="row.image" :src="row.image" alt="" />
              <el-icon v-else><UserFilled /></el-icon>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="15%">
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
          v-model:current-page="pageInfo.page_num"
          v-model:page-size="pageInfo.page_size"
        />
      </div>
    </div>
    <UserEditor ref="userEditor" />
  </div>
</template>

<style scoped lang="scss">
.user-page {
  .operation {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 50px;
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
