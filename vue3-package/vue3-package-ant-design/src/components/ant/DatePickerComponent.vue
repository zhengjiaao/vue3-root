<template>
  <!--日期和时间选择器-->
  <div>
    <a-space direction="vertical" size="large">
      <a-date-picker v-model:value="date" show-time />
      <a-range-picker
          v-model:value="rangeDate"
          :ranges="ranges"
          show-time
          format="YYYY/MM/DD HH:mm:ss"
      />
      <a-time-picker v-model:value="time" use12-hours format="h:mm:ss A" />
      <a-month-picker v-model:value="month" placeholder="Select month" />
      <a-week-picker v-model:value="week" placeholder="Select week" />
    </a-space>
    <div style="margin-top: 16px">
      <a-button type="primary" @click="logValues">Log Values</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export default defineComponent({
  setup() {
    const date = ref<Dayjs>();
    const rangeDate = ref<[Dayjs, Dayjs]>();
    const time = ref<Dayjs>();
    const month = ref<Dayjs>();
    const week = ref<Dayjs>();

    const ranges = {
      'Today': [dayjs(), dayjs()],
      'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
    };

    const logValues = () => {
      console.log('Date:', date.value?.format('YYYY-MM-DD HH:mm:ss'));
      console.log('Range Date:', rangeDate.value?.map(d => d.format('YYYY-MM-DD HH:mm:ss')));
      console.log('Time:', time.value?.format('HH:mm:ss'));
      console.log('Month:', month.value?.format('YYYY-MM'));
      console.log('Week:', week.value?.format('YYYY-wo'));
    };

    return {
      date,
      rangeDate,
      time,
      month,
      week,
      ranges,
      logValues,
    };
  },
});
</script>