<template>
  <!--表格组件使用实例-->
  <a-table
      :columns="columns"
      :data-source="data"
      :pagination="{ pageSize: 5 }"
      row-key="id"
  >
    <template #action="{ record }">
      <a-button type="link" @click="showDetail(record)">View</a-button>
      <a-button type="link" danger @click="confirmDelete(record)">Delete</a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Modal, message } from 'ant-design-vue';

interface DataItem {
  id: string;
  name: string;
  age: number;
  address: string;
}

export default defineComponent({
  setup() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' },
      },
    ];

    const data = ref<DataItem[]>([
      {
        id: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        id: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      // 更多数据...
    ]);

    const showDetail = (record: DataItem) => {
      Modal.info({
        title: 'User Info',
        content: `Name: ${record.name}, Age: ${record.age}, Address: ${record.address}`,
      });
    };

    const confirmDelete = (record: DataItem) => {
      Modal.confirm({
        title: 'Are you sure delete this record?',
        content: `Delete user: ${record.name}`,
        onOk() {
          data.value = data.value.filter(item => item.id !== record.id);
          message.success('Delete success!');
        },
      });
    };

    return {
      columns,
      data,
      showDetail,
      confirmDelete,
    };
  },
});
</script>