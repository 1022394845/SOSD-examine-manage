<script setup>
import { Search, Plus, EditPen, Delete } from '@element-plus/icons-vue'
import TagEditor from './components/TagEditor.vue'
import { changeTagStatusAPI, deleteTagAPI, getTagListAPI } from '@/api/tag'

const tagList = ref([])
const loading = ref(false)
const getTagList = async () => {
  loading.value = true
  const {
    data: { records }
  } = await getTagListAPI()
  tagList.value = records
  searchList.value = records
  loading.value = false
}
onMounted(() => {
  getTagList()
})

// 搜索标签
const searchKey = ref('')
const searchList = ref([])
const onSearch = () => {
  if (!searchKey.value?.trim()) {
    searchList.value = tagList.value
    return
  }
  const query = searchKey.value.trim().toLowerCase()
  searchList.value = tagList.value.filter((item) => item.name.toLowerCase().includes(query))
}

const tagEditor = ref()
const onAddTag = () => {
  tagEditor.value.open()
}

const onEditTag = (data) => {
  tagEditor.value.open(data)
}

const onDeleteTag = async (id) => {
  await ElMessageBox.confirm('删除此标签后无法恢复，请谨慎操作！', '确认删除此标签吗', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteTagAPI(id)
  getTagList()
  ElMessage.success('删除成功')
}

const onChangeStatus = async (row) => {
  row.loading = true
  try {
    const newStatus = row.status ? 0 : 1
    await changeTagStatusAPI(row.id, newStatus)
    row.status = newStatus
    ElMessage.success(`${row.status ? '上线' : '下线'}成功`)
  } finally {
    row.loading = false
  }
}
</script>

<template>
  <div class="tag-page">
    <div class="operation">
      <div class="title">标签管理</div>
      <div class="search-input">
        <div class="label">标签</div>
        <el-input v-model="searchKey" style="width: 240px" placeholder="请输入标签名称" clearable />
      </div>
      <div class="btn-group">
        <el-button type="primary" :icon="Search" @click="onSearch">搜索</el-button>
        <el-button type="primary" :icon="Plus" @click="onAddTag">添加</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="searchList" style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="标签" />
        <el-table-column prop="status" label="上下线" width="150" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              :loading="row.loading"
              :before-change="() => onChangeStatus(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button type="primary" :icon="EditPen" @click="onEditTag(row)">编辑</el-button>
            <el-button type="danger" :icon="Delete" @click="onDeleteTag(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <TagEditor ref="tagEditor" @success="getTagList" />
  </div>
</template>

<style scoped lang="scss">
.tag-page {
  .operation {
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 0 50px;
    height: 80px;
    border-radius: 10px;
    background-color: #ffffff;

    .title {
      font-size: 28px;
      font-weight: bold;
    }

    .search-input {
      margin-left: auto;
      display: flex;
      align-items: center;

      .label {
        margin-right: 10px;
        font-weight: 700;
      }
    }
  }

  .table {
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffffff;
  }
}
</style>
