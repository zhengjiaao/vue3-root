<template>
  <!--表单组件使用实例-->
  <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { message } from 'ant-design-vue';

interface FormState {
  username: string;
  password: string;
}

export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      username: '',
      password: '',
    });

    const onFinish = (values: any) => {
      console.log('Success:', values);
      message.success('Submit success!');
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      message.error('Submit failed!');
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>