<script setup>
import { Search, Plus, EditPen, Delete } from '@element-plus/icons-vue'
import TagEditor from './components/TagEditor.vue'
import { changeTagStatusAPI, deleteTagAPI } from '@/api/tag'

const searchKey = ref('')

const tagList = ref([
  { id: 1, name: 'Java', status: true },
  { id: 2, name: '前端', status: true },
  { id: 3, name: 'AI', status: false },
  { id: 4, name: '后端', status: true }
])

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
  await deleteTagAPI([id])
  ElMessage.success('删除成功')
}

const onChangeStatus = async (data) => {
  await changeTagStatusAPI(data.id, data.status)
  ElMessage.success(`${data.status ? '上线' : '下线'}成功`)
}
</script>

<template>
  <div class="tag-page">
    <div class="operation">
      <div class="search-input">
        <div class="label">名称</div>
        <el-input v-model="searchKey" style="width: 240px" placeholder="请输入标签名称" />
      </div>
      <el-button type="primary" :icon="Search">搜索</el-button>
      <el-button type="primary" :icon="Plus" @click="onAddTag">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="tagList" style="width: 100%">
        <el-table-column prop="name" label="标签" min-width="40%" />
        <el-table-column prop="status" label="上下线" min-width="30%">
          <template #default="{ row }">
            <el-switch v-model="row.status" @click="onChangeStatus(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="15%">
          <template #default="{ row }">
            <el-button type="primary" :icon="EditPen" @click="onEditTag(row)">编辑</el-button>
            <el-button type="danger" :icon="Delete" @click="onDeleteTag(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <TagEditor ref="tagEditor" />
  </div>
</template>

<style scoped lang="scss">
.tag-page {
  .operation {
    display: flex;
    align-items: center;
    padding: 0 50px;
    height: 80px;
    border-radius: 10px;
    background-color: #ffffff;

    .search-input {
      flex: 1;
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
