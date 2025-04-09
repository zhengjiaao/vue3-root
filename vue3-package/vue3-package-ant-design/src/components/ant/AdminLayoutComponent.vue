<template>
  <!--通用的管理端页面-->
  <a-layout class="admin-layout">
    <!-- 侧边栏 -->
    <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        width="220"
        theme="light"
    >
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo" v-if="!collapsed"/>
        <h1 v-if="!collapsed">Admin System</h1>
      </div>
      <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="light"
          mode="inline"
          @click="handleMenuClick"
      >
        <a-menu-item key="dashboard">
          <template #icon>
            <dashboard-outlined/>
          </template>
          <span>Dashboard</span>
        </a-menu-item>
        <a-sub-menu key="user">
          <template #icon>
            <user-outlined/>
          </template>
          <template #title>User Management</template>
          <a-menu-item key="user-list">User List</a-menu-item>
          <a-menu-item key="role">Roles</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="settings">
          <template #icon>
            <setting-outlined/>
          </template>
          <span>Settings</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 主内容区 -->
    <a-layout>
      <!-- 顶部导航 -->
      <a-layout-header class="header">
        <div class="header-left">
          <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
              v-else
              class="trigger"
              @click="() => (collapsed = !collapsed)"
          />
          <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>{{ currentMenu }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="header-right">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              <a-avatar
                  size="small"
                  src="https://randomuser.me/api/portraits/men/1.jpg"
              />
              <span class="username">Admin</span>
              <down-outlined/>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <user-outlined/>
                  <span>Profile</span>
                </a-menu-item>
                <a-menu-item>
                  <setting-outlined/>
                  <span>Settings</span>
                </a-menu-item>
                <a-menu-divider/>
                <a-menu-item @click="handleLogout">
                  <logout-outlined/>
                  <span>Logout</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 内容区 -->
      <a-layout-content class="content">
        <div class="content-wrapper">
          <!-- 页面标题和操作按钮 -->
          <div class="page-header">
            <h2 class="page-title">User Management</h2>
            <div class="page-actions">
              <a-button type="primary" @click="showCreateModal">
                <template #icon>
                  <plus-outlined/>
                </template>
                Add User
              </a-button>
              <a-button @click="handleRefresh">
                <template #icon>
                  <reload-outlined/>
                </template>
                Refresh
              </a-button>
            </div>
          </div>

          <!-- 搜索区域 -->
          <a-card class="search-card">
            <a-form layout="inline" :model="searchForm">
              <a-form-item label="Username">
                <a-input
                    v-model:value="searchForm.username"
                    placeholder="Please input"
                />
              </a-form-item>
              <a-form-item label="Status">
                <a-select
                    v-model:value="searchForm.status"
                    placeholder="Please select"
                    style="width: 120px"
                >
                  <a-select-option value="">All</a-select-option>
                  <a-select-option value="1">Active</a-select-option>
                  <a-select-option value="0">Inactive</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Date">
                <a-range-picker v-model:value="searchForm.dateRange"/>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="handleSearch">
                  <template #icon>
                    <search-outlined/>
                  </template>
                  Search
                </a-button>
                <a-button style="margin-left: 8px" @click="resetSearch">
                  Reset
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>

          <!-- 数据表格 -->
          <a-card class="table-card">
            <a-table
                :columns="columns"
                :data-source="dataSource"
                :pagination="pagination"
                :loading="loading"
                :row-selection="rowSelection"
                @change="handleTableChange"
                bordered
                rowKey="id"
            >
              <template #status="{ text }">
                <a-tag :color="text === 1 ? 'green' : 'red'">
                  {{ text === 1 ? 'Active' : 'Inactive' }}
                </a-tag>
              </template>

              <template #action="{ record }">
                <a-button type="link" size="small" @click="showEditModal(record)">
                  <edit-outlined/>
                  Edit
                </a-button>
                <a-divider type="vertical"/>
                <a-popconfirm
                    title="Are you sure delete this user?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="handleDelete(record.id)"
                >
                  <a-button type="link" size="small" danger>
                    <delete-outlined/>
                    Delete
                  </a-button>
                </a-popconfirm>
              </template>
            </a-table>
          </a-card>
        </div>
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer class="footer">
        Admin System ©2023 Created by Ant Design Vue
      </a-layout-footer>
    </a-layout>

    <!-- 新增/编辑用户模态框 -->
    <a-modal
        v-model:open="modalVisible"
        :title="modalTitle"
        :confirm-loading="confirmLoading"
        @ok="handleModalOk"
        @cancel="handleModalCancel"
        width="600px"
    >
      <a-form
          ref="formRef"
          :model="formState"
          :rules="rules"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="Username" name="username">
          <a-input v-model:value="formState.username"/>
        </a-form-item>
        <a-form-item label="Email" name="email">
          <a-input v-model:value="formState.email"/>
        </a-form-item>
        <a-form-item label="Phone" name="phone">
          <a-input v-model:value="formState.phone"/>
        </a-form-item>
        <a-form-item label="Status" name="status">
          <a-radio-group v-model:value="formState.status">
            <a-radio :value="1">Active</a-radio>
            <a-radio :value="0">Inactive</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Roles" name="roles">
          <a-select
              v-model:value="formState.roles"
              mode="multiple"
              placeholder="Please select roles"
          >
            <a-select-option value="admin">Admin</a-select-option>
            <a-select-option value="editor">Editor</a-select-option>
            <a-select-option value="viewer">Viewer</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Description" name="description">
          <a-textarea v-model:value="formState.description" :rows="4"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, computed, onMounted} from 'vue';
import {message, Modal} from 'ant-design-vue';
import type {Rule} from 'ant-design-vue/es/form';
import type {TableColumnType} from 'ant-design-vue';
import type {Dayjs} from 'dayjs';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  LogoutOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';

interface UserItem {
  id: string;
  username: string;
  email: string;
  phone: string;
  status: number;
  roles: string[];
  createTime: string;
  description?: string;
}

interface SearchForm {
  username: string;
  status: string;
  dateRange?: [Dayjs, Dayjs];
}

interface FormState {
  id?: string;
  username: string;
  email: string;
  phone: string;
  status: number;
  roles: string[];
  description: string;
}

export default defineComponent({
  name: 'AdminLayout',
  components: {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
    LogoutOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
  },
  setup() {
    // 布局状态
    const collapsed = ref(false);
    const selectedKeys = ref<string[]>(['user-list']);
    const currentMenu = computed(() => {
      const key = selectedKeys.value[0];
      if (key === 'dashboard') return 'Dashboard';
      if (key === 'user-list') return 'User List';
      if (key === 'role') return 'Roles';
      if (key === 'settings') return 'Settings';
      return '';
    });

    // 表格数据
    const loading = ref(false);
    const dataSource = ref<UserItem[]>([]);
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number) => `Total ${total} items`,
    });

    // 搜索表单
    const searchForm = reactive<SearchForm>({
      username: '',
      status: '',
    });

    // 表格列定义
    const columns: TableColumnType[] = [
      {
        title: 'Username',
        dataIndex: 'username',
        width: 150,
        sorter: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: 200,
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        width: 150,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 100,
        slots: {customRender: 'status'},  // 不再需要 slots 属性，使用 v-slot:bodyCell 替代
        filters: [ // 移除 filters 属性，使用 v-slot:filterDropdown 替代
          {text: 'Active', value: 1},
          {text: 'Inactive', value: 0},
        ],
      },
      {
        title: 'Roles',
        dataIndex: 'roles',
        width: 150,
        customRender: ({text}: { text: string[] }) => text.join(', '),
      },
      {
        title: 'Create Time',
        dataIndex: 'createTime',
        width: 180,
        sorter: true,
      },
      {
        title: 'Action',
        key: 'action',
        width: 150,
        slots: {customRender: 'action'}, // 不再需要 slots 属性，使用 v-slot:bodyCell 替代
      },
    ];

    // 行选择
    const selectedRowKeys = ref<string[]>([]);
    const rowSelection = computed(() => ({
      selectedRowKeys: selectedRowKeys.value,
      onChange: (keys: string[]) => {
        selectedRowKeys.value = keys;
      },
    }));

    // 模态框
    const modalVisible = ref(false);
    const modalTitle = ref('Add User');
    const confirmLoading = ref(false);
    const formRef = ref();
    const formState = reactive<FormState>({
      username: '',
      email: '',
      phone: '',
      status: 1,
      roles: [],
      description: '',
    });
    const isEditMode = ref(false);

    // 表单验证规则
    const rules: Record<string, Rule[]> = {
      username: [
        {required: true, message: 'Please input username', trigger: 'blur'},
        {min: 4, max: 16, message: 'Length should be 4 to 16', trigger: 'blur'},
      ],
      email: [
        {required: true, message: 'Please input email', trigger: 'blur'},
        {type: 'email', message: 'Please input valid email', trigger: 'blur'},
      ],
      phone: [
        {required: true, message: 'Please input phone number', trigger: 'blur'},
        {pattern: /^1[3-9]\d{9}$/, message: 'Please input valid phone number'},
      ],
      status: [{required: true, message: 'Please select status', trigger: 'change'}],
      roles: [{required: true, message: 'Please select roles', trigger: 'change'}],
    };

    // 模拟获取数据
    const fetchData = async (params: any = {}) => {
      loading.value = true;
      try {
        // 这里应该是API调用
        console.log('Fetching data with params:', params);

        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 800));

        // 模拟数据
        const mockData: UserItem[] = Array.from({length: 35}, (_, i) => ({
          id: `${i + 1}`,
          username: `user${i + 1}`,
          email: `user${i + 1}@example.com`,
          phone: `138${Math.floor(10000000 + Math.random() * 90000000)}`,
          status: Math.random() > 0.3 ? 1 : 0,
          roles: ['admin', 'editor', 'viewer'].filter(() => Math.random() > 0.5),
          createTime: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
          description: Math.random() > 0.5 ? `This is user ${i + 1} description` : undefined,
        }));

        // 模拟搜索过滤
        let filteredData = [...mockData];
        if (params.username) {
          filteredData = filteredData.filter(item =>
              item.username.includes(params.username)
          );
        }
        if (params.status) {
          filteredData = filteredData.filter(item =>
              item.status === parseInt(params.status)
          );
        }

        // 模拟分页
        const start = (pagination.current - 1) * pagination.pageSize;
        const end = start + pagination.pageSize;
        dataSource.value = filteredData.slice(start, end);
        pagination.total = filteredData.length;
      } catch (error) {
        console.error('Failed to fetch data:', error);
        message.error('Failed to fetch data');
      } finally {
        loading.value = false;
      }
    };

    // 表格变化处理
    const handleTableChange = (pag: any, filters: any, sorter: any) => {
      console.log('Table changed:', pag, filters, sorter);
      pagination.current = pag.current;
      pagination.pageSize = pag.pageSize;
      fetchData({
        ...searchForm,
        ...filters,
        sortField: sorter.field,
        sortOrder: sorter.order,
      });
    };

    // 搜索处理
    const handleSearch = () => {
      pagination.current = 1;
      fetchData(searchForm);
    };

    // 重置搜索
    const resetSearch = () => {
      searchForm.username = '';
      searchForm.status = '';
      searchForm.dateRange = undefined;
      handleSearch();
    };

    // 刷新数据
    const handleRefresh = () => {
      fetchData(searchForm);
    };

    // 显示创建模态框
    const showCreateModal = () => {
      modalTitle.value = 'Add User';
      isEditMode.value = false;
      Object.assign(formState, {
        id: undefined,
        username: '',
        email: '',
        phone: '',
        status: 1,
        roles: [],
        description: '',
      });
      modalVisible.value = true;
    };

    // 显示编辑模态框
    const showEditModal = (record: UserItem) => {
      modalTitle.value = 'Edit User';
      isEditMode.value = true;
      Object.assign(formState, {
        id: record.id,
        username: record.username,
        email: record.email,
        phone: record.phone,
        status: record.status,
        roles: [...record.roles],
        description: record.description || '',
      });
      modalVisible.value = true;
    };

    // 处理模态框确定
    const handleModalOk = async () => {
      try {
        await formRef.value.validate();
        confirmLoading.value = true;

        // 这里应该是API调用
        console.log('Submitting form:', formState);
        await new Promise(resolve => setTimeout(resolve, 800));

        message.success(isEditMode.value ? 'User updated successfully' : 'User created successfully');
        modalVisible.value = false;
        fetchData(searchForm);
      } catch (error) {
        console.log('Validation failed:', error);
      } finally {
        confirmLoading.value = false;
      }
    };

    // 处理模态框取消
    const handleModalCancel = () => {
      formRef.value.resetFields();
      modalVisible.value = false;
    };

    // 删除用户
    const handleDelete = async (id: string) => {
      try {
        // 这里应该是API调用
        console.log('Deleting user:', id);
        await new Promise(resolve => setTimeout(resolve, 500));

        message.success('User deleted successfully');
        fetchData(searchForm);
      } catch (error) {
        console.error('Failed to delete user:', error);
        message.error('Failed to delete user');
      }
    };

    // 批量删除
    const handleBatchDelete = () => {
      if (selectedRowKeys.value.length === 0) {
        message.warning('Please select at least one user');
        return;
      }

      Modal.confirm({
        title: 'Are you sure delete selected users?',
        content: `You have selected ${selectedRowKeys.value.length} users`,
        onOk: async () => {
          try {
            // 这里应该是API调用
            console.log('Deleting users:', selectedRowKeys.value);
            await new Promise(resolve => setTimeout(resolve, 800));

            message.success('Users deleted successfully');
            selectedRowKeys.value = [];
            fetchData(searchForm);
          } catch (error) {
            console.error('Failed to delete users:', error);
            message.error('Failed to delete users');
          }
        },
      });
    };

    // 菜单点击处理
    const handleMenuClick = (e: { key: string }) => {
      console.log('Menu clicked:', e.key);
      // 这里可以添加路由跳转逻辑
    };

    // 退出登录
    const handleLogout = () => {
      Modal.confirm({
        title: 'Are you sure you want to logout?',
        onOk: () => {
          message.success('Logout successfully');
          // 这里添加退出登录逻辑
        },
      });
    };

    // 初始化加载数据
    onMounted(() => {
      fetchData();
    });

    return {
      // 布局相关
      collapsed,
      selectedKeys,
      currentMenu,

      // 表格相关
      columns,
      dataSource,
      pagination,
      loading,
      rowSelection,
      handleTableChange,

      // 搜索相关
      searchForm,
      handleSearch,
      resetSearch,
      handleRefresh,

      // 模态框相关
      modalVisible,
      modalTitle,
      confirmLoading,
      formRef,
      formState,
      rules,
      showCreateModal,
      showEditModal,
      handleModalOk,
      handleModalCancel,

      // 操作相关
      handleDelete,
      handleBatchDelete,

      // 菜单相关
      handleMenuClick,
      handleLogout,
    };
  },
});
</script>

<style lang="less" scoped>
.admin-layout {
  min-height: 100vh;

  .logo {
    height: 64px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;

    img {
      height: 32px;
      margin-right: 8px;
    }

    h1 {
      margin: 0;
      font-size: 18px;
      white-space: nowrap;
    }
  }

  .header {
    background: #fff;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .header-left {
      display: flex;
      align-items: center;

      .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .breadcrumb {
        margin-left: 16px;
      }
    }

    .header-right {
      .ant-dropdown-link {
        display: flex;
        align-items: center;

        .username {
          margin: 0 8px;
        }
      }
    }
  }

  .content {
    margin: 24px;

    .content-wrapper {
      background: #fff;
      padding: 24px;
      border-radius: 2px;

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        .page-title {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
        }

        .page-actions {
          button {
            margin-left: 8px;
          }
        }
      }

      .search-card {
        margin-bottom: 16px;
      }

      .table-card {
        margin-bottom: 16px;
      }
    }
  }

  .footer {
    text-align: center;
    padding: 16px 50px;
  }
}
</style>