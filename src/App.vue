<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view> </router-view>
  </el-config-provider>
</template>

<style>
html {
  scroll-behavior: smooth;
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
</style>
