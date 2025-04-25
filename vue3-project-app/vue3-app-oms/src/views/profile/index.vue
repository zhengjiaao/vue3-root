<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import {updateUserProfile, changePassword, uploadAvatar} from '@/api/user'
import { ElMessage } from 'element-plus'
import { User, Lock, Message, Phone } from '@element-plus/icons-vue'

const userStore = useUserStore()

// 用户信息表单
const profileForm = reactive({
  id: userStore.id || null,
  username: userStore.username || '',
  role: userStore.role || '',
  email: 'user@example.com',
  phone: '13800138000',
  department: '运维部',
  position: '系统管理员'
})

// 密码表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 当前激活的tab
const activeTab = ref('profile')

// 保存个人信息
const saveProfile = async () => {
  try {
    console.log('保存个人信息：', profileForm)
    await updateUserProfile(profileForm);

    // 写法没问题，就是类型检测不匹配
    // userStore.updateUser({ ...userStore.$state, username: profileForm.username })

    const updatedUser = {
      id: userStore.id || null,
      token: userStore.token || '', // 默认值为空字符串
      role: userStore.role || '',   // 默认值为空字符串
      username: profileForm.username || '', // 默认值为空字符串
      avatar: userStore.avatar || '', // 头像url，同时也支持 base64 字符串
    };

    userStore.updateUser(updatedUser)

    ElMessage.success('个人信息更新成功')
  } catch (error) {
    console.log('更新失败：', error)
    ElMessage.error('更新失败')
  }
}

// 修改密码
const handleChangePassword = async () => {
  try {
    await changePassword({
      id: userStore.id || null,
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword
    })
    ElMessage.success('密码修改成功')
    // 清空表单
    Object.assign(passwordForm, {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  } catch (error) {
    const err = error as Error;
    console.error(err)
    ElMessage.error(`密码修改失败: ${err.message || '未知错误'}`);
  }
}


// 处理头像上传之前的回调
const beforeAvatarUpload = (file: File) => {
  // const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2

  // if (!isJPG) {
  //   ElMessage.error('上传头像图片只能是 JPG 格式!')
  // }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
}

// 自定义上传逻辑
const customUpload =  async (file: File) => {
  console.log('上传头像：', file)
  try {
    const res = await uploadAvatar(file);  // 上传头像到服务器
    // 处理上传成功的回调
    handleAvatarSuccess(res, file); // 处理上传成功的回调 UserAvatar
    console.log('头像上传成功')
  }catch (error){
    console.error('上传头像失败：',error);
    ElMessage.error('头像上传失败');
  }
};

// 处理头像上传成功的回调
const handleAvatarSuccess = (response: any, file: File) => {
  // console.log('上传的response：', response)
  if (!response || !response.data) {
    console.error('上传的文件：', file)
    ElMessage.error('头像上传失败');
    return;
  }
  if (!response.data.avatarUrl && !response.data.avatarBase64) {
    ElMessage.error(response.message || '头像上传失败，未返回有效数据');
    return;
  }

  // 没啥问题，就是类型检测不匹配
  /*const updatedUser = {
    ...userStore.$state, // 使用当前用户状态作为基础
    avatar: response.data.avatarUrl,
  };*/

  // 确保 updatedUser 的字段类型与 userStore.updateUser 的参数类型一致
  const updatedUser = {
    token: userStore.token || '', // 默认值为空字符串
    role: userStore.role || '',   // 默认值为空字符串
    username: userStore.username || '', // 默认值为空字符串
    avatar: response.data.avatarUrl, // 头像url，同时也支持 base64 字符串
    // avatar: response.data.avatarBase64, // 头像base64 字符串
  };

  userStore.updateUser(updatedUser); // 更新用户信息
  ElMessage.success('头像上传成功');
}
</script>

<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <div class="profile-header">
          <h2>个人中心</h2>
        </div>
      </template>

      <el-tabs v-model="activeTab" class="profile-tabs">
        <!-- 个人信息标签页 -->
        <el-tab-pane label="个人信息" name="profile">
          <el-form
            :model="profileForm"
            label-width="100px"
            class="profile-form"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="profileForm.username"
                placeholder="请输入用户名"
              >
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="profileForm.email"
                placeholder="请输入邮箱"
              >
                <template #prefix>
                  <el-icon><Message /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="profileForm.phone"
                placeholder="请输入手机号"
              >
                <template #prefix>
                  <el-icon><Phone /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="角色">
              <el-input
                v-model="profileForm.role"
                placeholder="请输入角色"
                disabled
              />
            </el-form-item>

            <el-form-item label="部门">
              <el-input
                v-model="profileForm.department"
                placeholder="请输入部门"
                disabled
              />
            </el-form-item>

            <el-form-item label="职位">
              <el-input
                v-model="profileForm.position"
                placeholder="请输入职位"
                disabled
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveProfile">
                保存修改
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 修改密码标签页 -->
        <el-tab-pane label="修改密码" name="password">
          <el-form
            :model="passwordForm"
            :rules="rules"
            label-width="100px"
            class="password-form"
          >
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input
                v-model="passwordForm.oldPassword"
                type="password"
                placeholder="请输入当前密码"
                show-password
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="newPassword">
              <el-input
                v-model="passwordForm.newPassword"
                type="password"
                placeholder="请输入新密码"
                show-password
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                v-model="passwordForm.confirmPassword"
                type="password"
                placeholder="请再次输入新密码"
                show-password
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleChangePassword">
                确认修改
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 用户头像 -->
    <!-- 采用直接调用接口上传 action="/api/user/avatar" -->
    <!-- 采用自定义函数上传 :http-request="customUpload" ，需要移除 :on-success="handleAvatarSuccess" -->
    <div class="avatar-section">
      <el-upload
        class="avatar-uploader"
        action="/api/user/avatar"
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        accept="image/*"
      >
    <!--<div class="avatar-section">-->
    <!--  <el-upload-->
    <!--    class="avatar-uploader"-->
    <!--    :http-request="customUpload"-->
    <!--    :before-upload="beforeAvatarUpload"-->
    <!--    :show-file-list="false"-->
    <!--    accept="image/*"-->
    <!--  >-->
        <el-avatar :size="120" :src="userStore.avatar || ''">
          {{ userStore.username?.charAt(0).toUpperCase() }}
        </el-avatar>
        <div class="avatar-edit">
          <el-icon><Edit /></el-icon>
        </div>
      </el-upload>
      <div class="user-name">{{ userStore.username }}</div>
      <div class="user-role">{{ userStore.role }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .profile-card {
    flex: 1;
    margin-right: 20px;

    .profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .profile-tabs {
      :deep(.el-tabs__content) {
        padding: 0 20px;
      }

      .profile-form,
      .password-form {
        max-width: 600px;
      }
    }
  }

  .avatar-section {
    width: 200px;
    text-align: center;

    .avatar-uploader {
      position: relative;
      margin-bottom: 15px;

      .avatar-edit {
        position: absolute;
        right: 10px;
        bottom: 10px;
        background: rgba(255, 255, 255, 0.8);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }

    .user-name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .user-role {
      color: #666;
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column-reverse;

    .profile-card {
      margin-right: 0;
      margin-top: 20px;
    }

    .avatar-section {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
