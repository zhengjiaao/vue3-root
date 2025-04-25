<script setup lang="ts">
// import { ref, onMounted } from 'vue'
import { ref, markRaw, onMounted } from 'vue'
import * as echarts from 'echarts'
import {
  Monitor,
  User,
  Document,
  Setting,
  // ArrowUp,
  SuccessFilled
} from '@element-plus/icons-vue'

// 推荐使用 markRaw 来标记组件对象，因为它明确地告诉 Vue 这些对象不应该被转换为响应式的，从而避免潜在的性能问题。

// 统计数据
/*const stats = ref([
  { title: '用户总数', value: 1024, icon: User, color: '#409EFF' },
  { title: '系统日志', value: 568, icon: Document, color: '#67C23A' },
  { title: '监控指标', value: 24, icon: Monitor, color: '#E6A23C' },
  { title: '配置项', value: 12, icon: Setting, color: '#F56C6C' }
])*/

// 标记组件为原始对象
const stats = ref([
  { title: '用户总数', value: 1024, icon: markRaw(User), color: '#409EFF' },
  { title: '系统日志', value: 568, icon: markRaw(Document), color: '#67C23A' },
  { title: '监控指标', value: 24, icon: markRaw(Monitor), color: '#E6A23C' },
  { title: '配置项', value: 12, icon: markRaw(Setting), color: '#F56C6C' }
])

// 活动日志
const activities = ref([
  { id: 1, user: '管理员', action: '创建了新用户', time: '10分钟前', status: 'success' },
  { id: 2, user: '审计员', action: '查看了系统日志', time: '30分钟前', status: 'info' },
  { id: 3, user: '系统', action: '执行了定时任务', time: '2小时前', status: 'warning' },
  { id: 4, user: '管理员', action: '更新了系统配置', time: '5小时前', status: 'success' }
])

// 初始化图表
onMounted(() => {
  initChart()
})

const initChart = () => {
  // 性能图表
  const perfChart = echarts.init(document.getElementById('perf-chart'))
  perfChart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['CPU', '内存', '磁盘', '网络'] },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['00:00', '06:00', '12:00', '18:00', '24:00'] },
    yAxis: { type: 'value' },
    series: [
      { name: 'CPU', type: 'line', data: [12, 18, 15, 22, 10] },
      { name: '内存', type: 'line', data: [45, 52, 58, 65, 48] },
      { name: '磁盘', type: 'line', data: [30, 25, 35, 40, 32] },
      { name: '网络', type: 'line', data: [18, 25, 22, 30, 15] }
    ]
  })

  // 资源图表
  const resourceChart = echarts.init(document.getElementById('resource-chart'))
  resourceChart.setOption({
    tooltip: { trigger: 'item' },
    legend: { top: '5%', left: 'center' },
    series: [
      {
        name: '资源分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: {
          label: { show: true, fontSize: '18', fontWeight: 'bold' }
        },
        labelLine: { show: false },
        data: [
          { value: 1048, name: '计算资源' },
          { value: 735, name: '存储资源' },
          { value: 580, name: '网络资源' },
          { value: 484, name: '其他资源' }
        ]
      }
    ]
  })

  // 窗口大小变化时重绘图表
  window.addEventListener('resize', () => {
    perfChart.resize()
    resourceChart.resize()
  })
}
</script>

<template>
  <div class="dashboard-container">
    <h2 class="page-title">系统概览</h2>

    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col v-for="item in stats" :key="item.title" :xs="24" :sm="12" :md="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" :style="{ backgroundColor: item.color }">
              <el-icon :size="24">
                <component :is="item.icon" />
              </el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-title">{{ item.title }}</div>
              <div class="stat-value">{{ item.value }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :xs="24" :lg="16">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <span>系统性能监控</span>
          </template>
          <div id="perf-chart" style="width: 100%; height: 350px;"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="8">
        <el-card shadow="hover" class="chart-card">
          <template #header>
            <span>资源分布</span>
          </template>
          <div id="resource-chart" style="width: 100%; height: 350px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 活动日志 -->
    <el-card shadow="hover" class="activity-card">
      <template #header>
        <span>最近活动</span>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="activity in activities"
          :key="activity.id"
          :timestamp="activity.time"
          placement="top"
        >
          <el-card shadow="never">
            <div class="activity-item">
              <el-tag
                :type="activity.status as any"
                size="small"
                class="activity-tag"
              >
                {{ activity.user }}
              </el-tag>
              <span class="activity-action">{{ activity.action }}</span>
              <el-icon v-if="activity.status === 'success'" class="activity-icon">
                <success-filled />
              </el-icon>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  padding: 15px;

  .page-title {
    margin-bottom: 20px;
    font-size: 22px;
    color: #333;
  }

  .stats-row {
    margin-bottom: 20px;

    .stat-card {
      margin-bottom: 20px;
      height: 100%;

      .stat-content {
        display: flex;
        align-items: center;

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-right: 15px;
        }

        .stat-info {
          flex: 1;

          .stat-title {
            font-size: 14px;
            color: #909399;
            margin-bottom: 5px;
          }

          .stat-value {
            font-size: 22px;
            font-weight: bold;
            color: #303133;
          }
        }
      }
    }
  }

  .chart-row {
    margin-bottom: 20px;

    .chart-card {
      margin-bottom: 20px;
      height: 100%;
    }
  }

  .activity-card {
    .activity-item {
      display: flex;
      align-items: center;

      .activity-tag {
        margin-right: 10px;
      }

      .activity-action {
        flex: 1;
      }

      .activity-icon {
        color: #67c23a;
      }
    }
  }
}
</style>
