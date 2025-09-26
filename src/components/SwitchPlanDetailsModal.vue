<template>
  <a-modal
    :open="visible"
    :title="`切换计划详情 - ${plan?.planCode}`"
    :footer="null"
    @cancel="closeModal"
    width="800px"
  >
    <a-descriptions v-if="plan" bordered :column="2" size="small">
      <a-descriptions-item label="计划编码">{{ plan.planCode }}</a-descriptions-item>
      <a-descriptions-item label="中心名称">{{ plan.centerCode }}</a-descriptions-item>
      <a-descriptions-item label="计划准备完成时间" :span="2">
        {{ dayjs(plan.prepareFinishTime).format('YYYY-MM-DD HH:mm:ss') }}
      </a-descriptions-item>
      <a-descriptions-item label="预计切换时间" :span="2">
        {{ dayjs(plan.prepareSwitchTime).format('YYYY-MM-DD HH:mm:ss') }}
      </a-descriptions-item>

      <a-descriptions-item label="高轨 (GEO) 当前状态"><StatusTag :status="plan.geoCurrentStatus" /></a-descriptions-item>
      <a-descriptions-item label="高轨 (GEO) 目标状态"><StatusTag :status="plan.geoTargetStatus" /></a-descriptions-item>
      <a-descriptions-item label="低轨 (LEO) 当前状态"><StatusTag :status="plan.leoCurrentStatus" /></a-descriptions-item>
      <a-descriptions-item label="低轨 (LEO) 目标状态"><StatusTag :status="plan.leoTargetStatus" /></a-descriptions-item>

      <template v-if="plan.switchCode">
        <a-descriptions-item label="切换指令编码" :span="2">{{ plan.switchCode }}</a-descriptions-item>
        <a-descriptions-item label="切换执行时间" :span="2">{{ dayjs(plan.switchTime).format('YYYY-MM-DD HH:mm:ss') }}</a-descriptions-item>
      </template>

      <template v-if="plan.switchRevokeCode">
        <a-descriptions-item label="撤销指令编码" :span="2">{{ plan.switchRevokeCode }}</a-descriptions-item>
        <a-descriptions-item label="撤销执行时间" :span="2">{{ dayjs(plan.switchRevokeTime).format('YYYY-MM-DD HH:mm:ss') }}</a-descriptions-item>
      </template>

      <template v-if="plan.switchFinishCode">
        <a-descriptions-item label="完成指令编码" :span="2">{{ plan.switchFinishCode }}</a-descriptions-item>
        <a-descriptions-item label="完成执行时间" :span="2">{{ dayjs(plan.switchFinishTime).format('YYYY-MM-DD HH:mm:ss') }}</a-descriptions-item>
        <a-descriptions-item label="高轨 (GEO) 完成后状态"><StatusTag :status="plan.geoFinishStatus" /></a-descriptions-item>
        <a-descriptions-item label="低轨 (LEO) 完成后状态"><StatusTag :status="plan.leoFinishStatus" /></a-descriptions-item>
      </template>

    </a-descriptions>
  </a-modal>
</template>

<script setup>
import { defineProps, defineEmits, h } from 'vue';
import dayjs from 'dayjs';
import { Tag as ATag } from 'ant-design-vue';

defineProps({
  plan: Object,
  visible: Boolean,
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

// 封装一个状态标签组件，方便复用
const StatusTag = (props) => {
  const { status } = props;
  if (status === 1) return h(ATag, { color: 'blue' }, () => '主状态');
  if (status === 2) return h(ATag, { color: 'gold' }, () => '备状态');
  return 'N/A';
};
</script>
