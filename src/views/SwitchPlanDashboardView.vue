<template>
  <div class="page-container">
    <h1>双中心双活切换计划看板</h1>
    <p>这里展示了所有已下发、执行中、已完成或已撤销的切换计划。</p>

    <a-divider />

  <SwitchPlanList
    :plans="plans"
    :loading="loading"
    :pagination="pagination"
    @show-details="handleShowDetails"
    @change="handleTableChange" />

    <!--属性向下传递，事件向上通知-->
  <SwitchPlanDetailsModal
    :plan="selectedPlan"
    :visible="isModalVisible"
    @close="handleCloseModal"
  />
  </div>
</template>

<script setup>
// 从 'vue' 导入 reactive，用于创建响应式对象
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

import SwitchPlanList from '../components/SwitchPlanList.vue';
import SwitchPlanDetailsModal from '../components/SwitchPlanDetailsModal.vue';

// --- 状态定义 ---
const plans = ref([]);
const loading = ref(false);
const selectedPlan = ref(null);
const isModalVisible = ref(false);

// 新增：创建一个响应式的分页对象
const pagination = reactive({
  current: 1, // 当前页码
  pageSize: 20, // 每页数量
  total: 0, // 总数据条数
  // 可以添加 pageSizeOptions 和 showSizeChanger 来自定义每页数量切换
  pageSizeOptions: ['10', '20', '50', '100'],
  showSizeChanger: true,
});


// --- 修改数据获取逻辑 ---
const fetchPlans = async () => {
  loading.value = true;
  try {
    // 将分页参数附加到请求中
    const response = await axios.get('/api/harmonize-toggles', {
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    // 根据新的返回格式来更新数据
    plans.value = response.data.items;
    pagination.total = response.data.total;

  } catch (error) {
    console.error("加载切换计划数据失败:", error);
    message.error('加载切换计划数据失败！');
  } finally {
    loading.value = false;
  }
};

// --- Vue生命周期钩子 ---
onMounted(() => {
  fetchPlans();
});

// 新增：处理表格变化（分页、排序等）的事件
const handleTableChange = (pager) => {
  pagination.current = pager.current;
  pagination.pageSize = pager.pageSize;
  fetchPlans(); // 重新获取数据
};

// --- 事件处理方法 (这部分不变) ---
const handleShowDetails = (plan) => {
  selectedPlan.value = plan;
  isModalVisible.value = true;
};
const handleCloseModal = () => {
  isModalVisible.value = false;
};
</script>

<!-- <script setup>
import { ref, onMounted } from 'vue';
// import axios from 'axios'; // 我们暂时不需要axios了，可以先注释掉
import { message } from 'ant-design-vue';

// 导入子组件
import SwitchPlanList from '../components/SwitchPlanList.vue';
import SwitchPlanDetailsModal from '../components/SwitchPlanDetailsModal.vue';

// --- 1. 定义模拟数据 (Mock Data) ---
// 我们创建了一个数组，包含了您业务逻辑中所有可能的状态
const mockData = [
  {
    planCode: '2206600214667784349',
    prepareFinishTime: '2025-09-26T10:00:00',
    prepareSwitchTime: '2025-09-26T11:00:00',
    centerCode: 'SOCC-XA',
    geoCurrentStatus: 2,
    geoTargetStatus: 1,
    leoCurrentStatus: 1,
    leoTargetStatus: 2,
    switchCode: null,
    switchTime: null,
    switchRevokeCode: null,
    switchRevokeTime: null,
    switchFinishCode: null,
    switchFinishTime: null,
    geoFinishStatus: null,
    leoFinishStatus: null,
  },
  {
    planCode: '2206600214667784500',
    prepareFinishTime: '2025-09-27T14:00:00',
    prepareSwitchTime: '2025-09-27T15:00:00',
    centerCode: 'SOCC-CQ',
    geoCurrentStatus: 1,
    geoTargetStatus: 2,
    leoCurrentStatus: 2,
    leoTargetStatus: 1,
    switchCode: '2206600214667784500-20250927150005123',
    switchTime: '2025-09-27T15:00:05', // 有切换时间，状态为“切换中”
    switchRevokeCode: null,
    switchRevokeTime: null,
    switchFinishCode: null,
    switchFinishTime: null,
    geoFinishStatus: null,
    leoFinishStatus: null,
  },
  {
    planCode: '2206600214667784501',
    prepareFinishTime: '2025-09-18T14:00:00',
    prepareSwitchTime: '2025-09-18T14:30:00',
    centerCode: 'SOCC-XA',
    geoCurrentStatus: 2,
    geoTargetStatus: 1,
    leoCurrentStatus: 2,
    leoTargetStatus: 1,
    switchCode: '2206600214667784501-20250918143010456',
    switchTime: '2025-09-18T14:30:10',
    switchRevokeCode: null,
    switchRevokeTime: null,
    switchFinishCode: '2206600214667784501-20250918144520789',
    switchFinishTime: '2025-09-18T14:45:20', // 有完成时间，状态为“已完成”
    geoFinishStatus: 1,
    leoFinishStatus: 1,
  },
  {
    planCode: '2206600214667784502',
    prepareFinishTime: '2025-09-15T08:00:00',
    prepareSwitchTime: '2025-09-15T09:00:00',
    centerCode: 'SOCC-CQ',
    geoCurrentStatus: 1,
    geoTargetStatus: 2,
    leoCurrentStatus: 1,
    leoTargetStatus: 2,
    switchCode: null,
    switchTime: null,
    switchRevokeCode: '2206600214667784502-20250915083015999',
    switchRevokeTime: '2025-09-15T08:30:15', // 有撤销时间，状态为“已撤销”
    switchFinishCode: null,
    switchFinishTime: null,
    geoFinishStatus: null,
    leoFinishStatus: null,
  },
];


// --- 响应式状态定义 (这部分不变) ---
const plans = ref([]);
const loading = ref(false);
const selectedPlan = ref(null);
const isModalVisible = ref(false);

// --- 2. 修改数据获取逻辑 ---
const fetchPlans = async () => {
  loading.value = true;

  // 我们用一个 Promise 和 setTimeout 来模拟网络请求的延迟
  await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟1秒的加载时间

  try {
    // **这里是关键**：不再调用 axios，而是直接使用我们的模拟数据
    plans.value = mockData;
  } catch (error) {
    console.error("加载模拟数据出错:", error);
    message.error('加载模拟数据出错！');
  } finally {
    loading.value = false;
  }
};

// --- Vue生命周期钩子 (这部分不变) ---
onMounted(() => {
  fetchPlans();
});

// --- 事件处理方法 (这部分不变) ---
const handleShowDetails = (plan) => {
  selectedPlan.value = plan;
  isModalVisible.value = true;
};

const handleCloseModal = () => {
  isModalVisible.value = false;
};
</script> -->

<style scoped>
.page-container {
  padding: 24px;
}
h1 {
  font-size: 24px;
}
</style>
