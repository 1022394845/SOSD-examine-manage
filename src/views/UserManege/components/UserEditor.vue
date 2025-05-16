<script setup>
import { modifyUserInfoAPI } from '@/api/user'
import { Plus } from '@element-plus/icons-vue'

const drawer = ref(false)

const form = ref()
const formModel = ref({})
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入电话号', trigger: 'blur' },
    {
      pattern: /^1[34578]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱号', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '请输入正确的邮箱号',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const open = (data) => {
  if (form.value) form.value.resetFields()
  formModel.value = { ...data }
  drawer.value = true
}
defineExpose({ open })

const imageFile = ref()
const onChangeImage = (file) => {
  imageFile.value = file
  formModel.value.image = URL.createObjectURL(file.raw)
}

const emit = defineEmits(['success'])
const submit = async () => {
  await form.value.validate()
  await modifyUserInfoAPI(formModel.value)
  ElMessage.success('保存成功')
  drawer.value = false
  emit('success')
}
</script>

<template>
  <el-drawer v-model="drawer" size="25%">
    <template #header>
      <div class="title">{{ formModel.id ? '修改作者' : '新增作者' }}</div>
    </template>
    <template #default>
      <el-form
        ref="form"
        :model="formModel"
        :rules="rules"
        label-width="auto"
        hide-required-asterisk
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="formModel.account" disabled />
        </el-form-item>
        <el-form-item label="名称" prop="username">
          <el-input v-model="formModel.username" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formModel.gender">
            <el-radio :value="1">男</el-radio>
            <el-radio :value="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formModel.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formModel.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formModel.password" />
        </el-form-item>
        <el-form-item label="头像" prop="image">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onChangeImage"
          >
            <img v-if="formModel.image" :src="formModel.image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
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

:deep(.avatar-uploader) {
  .avatar {
    display: block;
    width: 100px;
    height: 100px;
  }

  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: var(--el-color-primary);
    }
  }

  .el-icon {
    font-size: 28px;
    width: 100px;
    height: 100px;
    color: #8c939d;
    text-align: center;
  }
}
</style>
