<script setup>
import { createTagAPI, modifyTagAPI } from '@/api/tag'

const drawer = ref(false)

const form = ref()
const formModel = ref({})
const rules = {
  name: [{ required: true, message: '请输入标签名', trigger: 'blur' }]
}

const open = (data) => {
  if (form.value) form.value.resetFields()
  formModel.value = { ...data }
  drawer.value = true
}
defineExpose({ open })

const emit = defineEmits(['success'])
const submit = async () => {
  await form.value.validate()
  if (formModel.value.id) await modifyTagAPI(formModel.value)
  else await createTagAPI(formModel.value)
  ElMessage.success('保存成功')
  drawer.value = false
  emit('success')
}
</script>

<template>
  <el-drawer v-model="drawer" size="25%">
    <template #header>
      <div class="title">{{ formModel.id ? '修改标签' : '新增标签' }}</div>
    </template>
    <template #default>
      <el-form
        ref="form"
        :model="formModel"
        :rules="rules"
        label-width="auto"
        hide-required-asterisk
      >
        <el-form-item label="标签" prop="name">
          <el-input v-model="formModel.name" />
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.title {
  font-size: 16px;
  font-weight: 700;
}
</style>
