<script setup lang="ts">
import {ref, computed, watchEffect} from 'vue'
import {h} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {useUserStore} from '@/stores/user.ts'
import {ElScrollbar} from 'element-plus'
// 定义路由类型
import type {RouteRecordRaw} from 'vue-router';
import { logout } from '@/api/auth'

import {
  Menu as IconMenu,
  Monitor,
  User,
  Setting,
  Document,
  Operation,
  Compass,
  Fold,
  Expand,
  ArrowDown
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 状态管理
const isCollapse = ref(false)
const activeMenu = ref('')
const breadcrumbList = ref<Array<{ title: string; path?: string }>>([])

// 动态图标映射
const iconMap: Record<string, any> = {
  system: Setting,
  user: User,
  role: Operation,
  log: Document,
  monitor: Monitor,
  dashboard: Compass
}

// 获取权限路由
// const permissionRoutes = computed(() => {
//   return router.getRoutes()
//     .filter(route =>
//       route.meta?.title &&
//       !route.meta.hidden &&
//       (!route.meta.roles || route.meta.roles.includes(userStore.role || ''))
//         .sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0))
// })

const permissionRoutes = computed(() => {
  return router.getRoutes()
    .filter((route: RouteRecordRaw) =>
      route.meta?.title &&
      !route.meta.hidden &&
      (!route.meta.roles || route.meta.roles.includes(userStore.role || ''))
    )
    .sort((a: RouteRecordRaw, b: RouteRecordRaw) => (a.meta.order || 0) - (b.meta.order || 0));
});

// 生成面包屑
const generateBreadcrumb = () => {
  const matched = route.matched.filter(item => item.meta.title)
  breadcrumbList.value = matched.map(item => ({
    title: item.meta.title as string,
    path: item.path
  }))
}

// 生成菜单项
// const renderMenuItem = (route: any) => {
//   if (!route.children || route.children.length === 0) {
//     return (
//       <el-menu-item
//     index={route.path}
//     onClick={() => router.push(route.path)}
//   >
//     <el-icon>{route.meta.icon ? h(iconMap[route.meta.icon]) : h(IconMenu)}</el-icon>
//     <span>{route.meta.title}</span>
//     </el-menu-item>
//   )
//   }
//
//   return (
//     <el-sub-menu index={route.path}>
//     {{
//     title: () => (
//       <>
//         <el-icon>{route.meta.icon ? h(iconMap[route.meta.icon]) : h(IconMenu)}</el-icon>
//       <span>{route.meta.title}</span>
//       </>
//     ),
//   default: () => route.children.map((child: any) => renderMenuItem(child))
//   }}
//   </el-sub-menu>
// )
// }

const renderMenuItem = (route: any) => {
  if (!route.children || route.children.length === 0) {
    return h(
      'el-menu-item',
      {
        index: route.path,
        onClick: () => router.push(route.path),
      },
      [
        h('el-icon', {}, route.meta.icon ? h(iconMap[route.meta.icon]) : h(IconMenu)),
        h('span', {}, route.meta.title),
      ]
    );
  }

  return h(
    'el-sub-menu',
    {index: route.path},
    {
      default: () =>
        route.children.map((child: any) => renderMenuItem(child)),
      title: () => [
        h('el-icon', {}, route.meta.icon ? h(iconMap[route.meta.icon]) : h(IconMenu)),
        h('span', {}, route.meta.title),
      ],
    }
  );
};

// 退出登录
const handleLogout = async () => {
  // userStore.logout()
  // router.push('/login')

  try {
    const isLogout = await logout();
    if (isLogout) {
      userStore.removeUser()
    }
    console.log('登出成功')
  } catch (error) {
    console.error('登出失败', error)
  }

  router.push('/login')
}

// 监听路由变化
watchEffect(() => {
  activeMenu.value = route.path
  generateBreadcrumb()
})

// 检查是否是普通用户
const isNormalUser = computed(() => userStore.role === 'user')

// 如果是普通用户，直接跳转无权限页面
watchEffect(() => {
  if (isNormalUser.value) {
    router.push('/no-permission')
  }
})
</script>

<template>
  <div class="layout-container">
    <!-- 侧边栏 -->
    <div class="sidebar-container" :class="{ 'is-collapse': isCollapse }">
      <div class="logo-container">
        <!--<img src="@/assets/logo.png" class="logo" />-->
        <img src="../../assets/logo.svg" class="logo"/>
        <span v-show="!isCollapse" class="title">OMS Pro</span>
      </div>

      <el-scrollbar class="menu-scrollbar">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :collapse-transition="false"
          :unique-opened="true"
          background-color="#001529"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
        >
          <template v-for="route in permissionRoutes" :key="route.path">
            <component :is="renderMenuItem(route)"/>
          </template>
        </el-menu>
      </el-scrollbar>

      <div class="collapse-btn" @click="isCollapse = !isCollapse">
        <el-icon :size="20">
          <component :is="isCollapse ? Expand : Fold"/>
        </el-icon>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-container" :class="{ 'is-collapse': isCollapse }">
      <!-- 顶部导航栏 -->
      <div class="navbar">
        <div class="left-menu">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.title">
              <router-link v-if="item.path" :to="item.path">{{ item.title }}</router-link>
              <span v-else>{{ item.title }}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="right-menu">
          <el-dropdown trigger="click">
            <div class="avatar-wrapper">
              <!--<el-avatar size="small" :icon="User"/>-->
              <!-- 根据 avatarUrl 显示头像或默认图标 -->
              <el-avatar size="small" :src="userStore.avatar" :icon="userStore.avatar ? undefined : User"/>
              <span class="username">{{ userStore.username }}</span>
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/profile')">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 内容区 -->
      <div class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .sidebar-container {
    width: 210px;
    height: 100%;
    background-color: #001529;
    transition: width 0.3s;
    position: relative;

    &.is-collapse {
      width: 64px;

      .logo-container .title {
        display: none;
      }
    }

    .logo-container {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      overflow: hidden;
      border-bottom: 1px solid #002140;

      .logo {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }

      .title {
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        white-space: nowrap;
      }
    }

    .menu-scrollbar {
      height: calc(100% - 90px);

      :deep(.el-menu) {
        border-right: none;
      }

      :deep(.el-sub-menu__title),
      :deep(.el-menu-item) {
        &:hover {
          background-color: #000c17 !important;
        }

        &.is-active {
          background-color: #1890ff !important;
        }
      }
    }

    .collapse-btn {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
      border-top: 1px solid #002140;

      &:hover {
        background-color: #002140;
      }
    }
  }

  .main-container {
    flex: 1;
    overflow: hidden;
    transition: margin-left 0.3s;

    .navbar {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      background-color: #fff;

      .left-menu {
        flex: 1;
      }

      .right-menu {
        .avatar-wrapper {
          display: flex;
          align-items: center;
          cursor: pointer;

          .username {
            margin: 0 8px;
          }
        }
      }
    }

    .app-main {
      height: calc(100vh - 50px);
      padding: 15px;
      overflow: auto;
      background-color: #f0f2f5;
    }
  }
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
