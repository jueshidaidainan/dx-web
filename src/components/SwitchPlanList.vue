<template>
  <a-table :columns="columns" :data-source="plans" :row-key="record => record.planCode" :loading="loading" :pagination="pagination" @change="handleChange">

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'prepareSwitchTime'">
        {{ dayjs(record.prepareSwitchTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>

      <template v-if="column.key === 'status'">
        <a-space>
          <a-tooltip :title="`计划准备完成时间: ${dayjs(record.prepareFinishTime).format('YYYY-MM-DD HH:mm:ss')}`">
            <a-tag color="default">
              <template #icon><info-circle-outlined /></template>
              已计划
            </a-tag>
          </a-tooltip>
          <a-tooltip v-if="record.switchTime" :title="`切换执行时间: ${dayjs(record.switchTime).format('YYYY-MM-DD HH:mm:ss')}`">
            <a-tag color="processing">
              <template #icon><sync-outlined :spin="true" /></template>
              切换中
            </a-tag>
          </a-tooltip>
          <a-tooltip v-if="record.switchFinishTime" :title="`切换完成时间: ${dayjs(record.switchFinishTime).format('YYYY-MM-DD HH:mm:ss')}`">
            <a-tag color="success">
              <template #icon><check-circle-outlined /></template>
              已完成
            </a-tag>
          </a-tooltip>
          <a-tooltip v-else-if="record.switchRevokeTime" :title="`操作撤销时间: ${dayjs(record.switchRevokeTime).format('YYYY-MM-DD HH:mm:ss')}`">
            <a-tag color="error">
              <template #icon><close-circle-outlined /></template>
              已撤销
            </a-tag>
          </a-tooltip>
        </a-space>
      </template>

      <template v-if="column.key === 'action'">
        <a-button type="link" @click="showDetails(record)">查看详情</a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import dayjs from 'dayjs';
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';

// 定义接收的 props
defineProps({
  plans: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  pagination: { type: Object, required: true }, // <--【新增】
});

// 定义要触发的事件
const emit = defineEmits(['show-details', 'change']); // <--【新增 'change'】

const showDetails = (plan) => {
  emit('show-details', plan);
};

// 【新增】
const handleChange = (pager, filters, sorter) => {
  emit('change', pager, filters, sorter);
};

// 定义表格的列
const columns = [
  { title: '切换计划编码', dataIndex: 'planCode', key: 'planCode', width: 200 },
  { title: '中心名称', dataIndex: 'centerCode', key: 'centerCode', width: 150 },
  { title: '计划切换时间', dataIndex: 'prepareSwitchTime', key: 'prepareSwitchTime', width: 200 },
  { title: '执行状态', key: 'status' },
  { title: '操作', key: 'action', width: 120 },
];
</script>
