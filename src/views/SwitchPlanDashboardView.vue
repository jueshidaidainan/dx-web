<template>
  <div class="page-container">
    <h1>双中心双活切换计划看板</h1>
    <p>这里展示了所有已下发、执行中、已完成或已撤销的切换计划。</p>

    <a-divider />

    <SwitchPlanList
      :plans="plans"
      :loading="loading"
      @show-details="handleShowDetails"
    />

    <SwitchPlanDetailsModal
      :plan="selectedPlan"
      :visible="isModalVisible"
      @close="handleCloseModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

// 导入子组件
import SwitchPlanList from '../components/SwitchPlanList.vue';
import SwitchPlanDetailsModal from '../components/SwitchPlanDetailsModal.vue';

// --- 响应式状态定义 ---
const plans = ref([]); // 存储从后端获取的计划列表
const loading = ref(false); // 控制表格的加载动画
const selectedPlan = ref(null); // 存储当前用户点击“详情”的那个计划对象
const isModalVisible = ref(false); // 控制详情弹窗是否显示

// --- 数据获取逻辑 ---
const fetchPlans = async () => {
  loading.value = true;
  try {
    // 请求 /api/... Vite会自动将此请求代理到您在 vite.config.js 中配置的后端地址
    const response = await axios.get('/api/harmonize-toggles'); // 假设后端的接口是这个
    plans.value = response.data; // 将获取到的数据赋值给 plans
  } catch (error) {
    console.error("加载切换计划数据失败:", error);
    message.error('加载切换计划数据失败，请检查网络或联系管理员！');
  } finally {
    loading.value = false; // 无论成功或失败，都结束加载动画
  }
};

// --- Vue生命周期钩子 ---
// onMounted 会在组件第一次加载到页面上时执行
onMounted(() => {
  fetchPlans();
});

// --- 事件处理方法 ---
// 当列表组件触发 'show-details' 事件时，此方法被调用
const handleShowDetails = (plan) => {
  selectedPlan.value = plan;
  isModalVisible.value = true;
};

// 当弹窗组件触发 'close' 事件时，此方法被调用
const handleCloseModal = () => {
  isModalVisible.value = false;
};
</script>

<style scoped>
.page-container {
  padding: 24px;
}
h1 {
  font-size: 24px;
}
</style>
