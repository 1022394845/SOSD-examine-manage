<script setup>
import { DataAnalysis, Files, User, Document, UserFilled, Setting } from '@element-plus/icons-vue'
</script>

<template>
  <el-container class="layout-container">
    <!-- 侧边菜单 -->
    <el-aside width="250px">
      <el-menu
        active-text-color="#ffffff"
        text-color="#a6adb5"
        background-color="#001629"
        :default-active="$route.path"
        router
      >
        <el-menu-item index="/data">
          <el-icon><DataAnalysis /></el-icon>
          <span>数据统计</span>
        </el-menu-item>
        <el-menu-item index="/tag">
          <el-icon><Files /></el-icon>
          <span>标签管理</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <el-icon><Document /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 内容主体 -->
    <el-container>
      <!-- 用户信息 -->
      <el-header>
        <el-icon class="setting"><Setting /></el-icon>
        <div class="username">admin</div>
        <!-- 头像 -->
        <el-avatar class="avatar" fit="fill">
          <el-icon><UserFilled /></el-icon>
        </el-avatar>
      </el-header>

      <!-- 路由主体 -->
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-menu {
    height: 100%;
    padding: 10px;

    .el-menu-item {
      margin-bottom: 5px;
      border-radius: 15px;
    }

    .is-active {
      background-color: #1777ff;
    }
  }

  .el-header {
    display: flex;
    align-items: center;
    background-color: #ffffff;

    .el-icon {
      font-size: 18px;
    }

    .setting {
      flex: 1;
      justify-content: flex-start;
    }

    .username {
      margin-right: 20px;
      font-weight: 700;
    }
  }

  .el-main {
    margin-top: 10px;
    overflow-x: hidden;
  }
}

// 路由切换过渡
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-5%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(5%);
}
</style>
