<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import { login } from '@/api/auth'
import { useUserStore } from '@/stores/user'
import VerifyCode from '@/components/Verify/VerifyCode.vue'

const router = useRouter()
const userStore = useUserStore()

const formData = ref({
  username: '',
  password: '',
  code: '' // 验证码输入
})

const verifyCode = ref('') // 实际验证码值
const loading = ref(false)
const formRef = ref<InstanceType<typeof ElForm>>()

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, message: '用户名至少5位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, message: '密码至少5位', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value.toLowerCase() !== verifyCode.value.toLowerCase()) {
          callback(new Error('验证码错误'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const handleLogin = async () => {
  if (!formRef.value) return

  formRef.value.validate(async (valid) => {
    if (!valid) {
      ElMessage.error('表单验证失败，请检查输入')
      return
    }

    try {
      loading.value = true
      const res = await login({
        username: formData.value.username,
        password: formData.value.password,
        captchaCode: formData.value.code // 发送实际验证码值进行校验
      })
      userStore.setUser(res.data)
      console.log('登录成功', res)
      router.push('/')
    } catch (error) {
      const err = error as Error;
      console.error('登录失败', err)
      ElMessage.error(`登录失败: ${err.message || '未知错误'}`)
    } finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-box">
      <h2 class="login-title">OMS运维系统登录</h2>
      <el-form ref="formRef" :model="formData" :rules="rules" @submit.prevent="handleLogin" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div class="code-input">
            <el-input
              v-model="formData.code"
              placeholder="请输入验证码"
              class="code-input-field"
            />
            <VerifyCode
              v-model="verifyCode"
              class="code-input-image"
            />
          </div>
        </el-form-item>
        <el-button type="primary" native-type="submit" class="login-btn">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.login-box {
  width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.code-input {
  display: flex;
  align-items: center;
  width: 100%;
}

.code-input-field {
  width: 60%;
  margin-right: 1%; /* 增加输入框和验证码组件之间的间距 */
}

.code-input-image {
  width: 40%;
}

.code-input .el-input__inner {
  height: 32px; /* 设置输入框的高度 */
}

.code-input-image {
  height: 32px; /* 设置验证码组件的高度 */
}

.login-btn {
  width: 100%;
  margin-top: 20px; /* 增加登录按钮的上边距 */
}
</style>
