<template>
  <div>
    <!--模态框与消息提示-->
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-button @click="showMessage">Show Message</a-button>
    <a-button @click="showNotification">Show Notification</a-button>

    <a-modal
        v-model:visible="visible"
        title="Basic Modal"
        @ok="handleOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Modal, message, notification } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      visible.value = false;
      message.success('Modal closed');
    };

    const showMessage = () => {
      message.loading('Action in progress..', 2.5)
          .then(() => message.success('Loading finished', 2.5))
          .then(() => message.info('Loading finished is finished', 2.5));
    };

    const showNotification = () => {
      notification.open({
        message: 'Notification Title',
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    };

    return {
      visible,
      showModal,
      handleOk,
      showMessage,
      showNotification,
    };
  },
});
</script>