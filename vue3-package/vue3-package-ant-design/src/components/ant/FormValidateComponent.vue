<template>
  <a-form
      :model="formState"
      :rules="rules"
      ref="formRef"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
      @finish="onFinish"
  >
    <a-form-item label="Username" name="username">
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="Password" name="password" has-feedback>
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item label="Confirm Password" name="confirm" has-feedback>
      <a-input-password v-model:value="formState.confirm" />
    </a-form-item>

    <a-form-item label="Age" name="age">
      <a-input-number v-model:value="formState.age" :min="1" :max="120" />
    </a-form-item>

    <a-form-item label="Website" name="website">
      <a-auto-complete
          v-model:value="formState.website"
          placeholder="website"
          :options="websiteOptions"
          @search="handleWebsiteSearch"
      />
    </a-form-item>

    <a-form-item label="Tags" name="tags">
      <a-select
          v-model:value="formState.tags"
          mode="tags"
          style="width: 100%"
          placeholder="Tags Mode"
          :options="tagOptions"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { Form, message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';

interface FormState {
  username: string;
  password: string;
  confirm: string;
  age: number | undefined;
  website: string;
  tags: string[];
}

export default defineComponent({
  setup() {
    const formRef = ref();
    const formState = reactive<FormState>({
      username: '',
      password: '',
      confirm: '',
      age: undefined,
      website: '',
      tags: [],
    });

    const websiteOptions = ref<{ value: string }[]>([]);
    const tagOptions = ref<{ value: string }[]>([
      { value: 'gold' },
      { value: 'green' },
      { value: 'red' },
      { value: 'blue' },
    ]);

    const validatePass = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the password');
      } else if (value.length < 6) {
        return Promise.reject('Password must be at least 6 characters');
      } else {
        if (formState.confirm !== '') {
          await formRef.value.validateFields('confirm');
        }
        return Promise.resolve();
      }
    };

    const validatePass2 = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please confirm your password!');
      } else if (value !== formState.password) {
        return Promise.reject("Two passwords don't match!");
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      username: [
        { required: true, message: 'Please input your username', trigger: 'blur' },
        { min: 4, max: 16, message: 'Length should be 4 to 16', trigger: 'blur' },
      ],
      password: [{ required: true, validator: validatePass, trigger: 'change' }],
      confirm: [{ required: true, validator: validatePass2, trigger: 'change' }],
      age: [
        { required: true, message: 'Please input your age', type: 'number' },
        { type: 'number', min: 1, max: 120, message: 'Age must be between 1 and 120' },
      ],
      website: [{ required: true, message: 'Please input website' }],
      tags: [{ required: true, message: 'Please select at least one tag', type: 'array' }],
    };

    const handleWebsiteSearch = (value: string) => {
      websiteOptions.value = !value
          ? []
          : [
            { value: `${value}.com` },
            { value: `${value}.org` },
            { value: `${value}.net` },
          ];
    };

    const onFinish = (values: any) => {
      console.log('Success:', values);
      message.success('Submit success!');
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formRef,
      formState,
      rules,
      websiteOptions,
      tagOptions,
      handleWebsiteSearch,
      onFinish,
      resetForm,
    };
  },
});
</script>