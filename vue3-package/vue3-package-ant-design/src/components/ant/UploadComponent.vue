<template>
  <div>
    <a-upload
        v-model:file-list="fileList"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        upload
      </a-button>
    </a-upload>
    <br />
    <br />
    <a-upload
        v-model:file-list="fileList1"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture"
        class="upload-list-inline"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        upload
      </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';
const fileList = ref<UploadProps['fileList']>([
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
]);
const fileList1 = ref<UploadProps['fileList']>([
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
]);
</script>
<style scoped>
/* tile uploaded pictures */
.upload-list-inline :deep(.ant-upload-list-item) {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline [class*='-upload-list-rtl'] :deep(.ant-upload-list-item) {
  float: right;
}
</style>
