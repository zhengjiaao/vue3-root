<template>
  <div class="settings-view">
    <h1>设置</h1>
    <!-- 添加提示信息 -->
    <el-alert
      title="提示"
      type="info"
      :closable="false"
      :description="alertDescription"
      show-icon
    />
    <el-form :model="form" :rules="rules" ref="formRef" label-width="150px">
      <el-form-item label="DeepSeek API Key:" prop="apiKey">
        <el-input
          id="api-key"
          v-model="form.apiKey"
          type="text"
          placeholder="请输入您的 DeepSeek API Key"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useChatStore } from '@/stores/chat.ts';
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElAlert } from 'element-plus';

const router = useRouter();
const store = useChatStore();
const formRef = ref<InstanceType<typeof ElForm>>();
const form = ref({
  apiKey: '',
});

// 定义换行后的提示信息
const alertDescription = `如果您还没有注册 DeepSeek API Key，请前往官网注册：
https://platform.deepseek.com/api_keys
示例：sk-56289b45f4fe4652ae460cfd9fbb8a4t`;

const rules = {
  apiKey: [
    { required: true, message: '请输入 DeepSeek API Key', trigger: 'blur' },
    { min: 32, message: 'API Key 至少 32 个字符', trigger: 'blur' },
  ],
};

onMounted(() => {
  form.value.apiKey = store.apiKey || '';
});

const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      localStorage.setItem('deepseek_api_key', form.value.apiKey);
      store.apiKey = form.value.apiKey;
      router.push('/'); // 保存成功后跳转到首页
    } else {
      ElMessage.error('请输入有效的 DeepSeek API Key');
    }
  });
};
</script>

<style lang="scss" scoped>
.settings-view {
  padding: 20px;
  background: #f5f5f5;
  height: 100vh;

  h1 {
    margin-bottom: 20px;
  }

  .el-alert {
    margin-bottom: 20px;
    word-break: break-word; // 确保长链接自动换行
  }

  .el-form {
    max-width: 500px;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-button {
    align-self: flex-start;
  }
}
</style>
