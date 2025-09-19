<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// --- 状态定义 (State) ---

// 1. 存储从后端获取的列表数据
const listData = ref([])

// 2. 控制弹窗是否显示
const isModalVisible = ref(false)

// 3. 存储弹窗里要显示的详细信息
const modalContent = ref(null)

// 4. (可选) 用于显示加载状态，提升用户体验
const isLoadingList = ref(false)
const isLoadingModal = ref(false)


// --- API 请求逻辑 ---

// 获取主列表数据的方法
async function fetchListData() {
  isLoadingList.value = true
  try {
    // 模拟请求第一页，每页10条数据
    // !!! 请将 '/api/data-list' 替换成你真实的后端接口地址
    const response = await axios.get('/api/data-list?page=1&size=10')
    // 假设后端返回的数据在 response.data.records 里
    listData.value = response.data.records 
  } catch (error) {
    console.error('获取列表数据失败:', error)
    // 这里可以添加错误提示逻辑
  } finally {
    isLoadingList.value = false
  }
}

// 获取弹窗详细数据的方法
async function fetchDetailData(item, attributeKey) {
  isLoadingModal.value = true
  modalContent.value = null // 先清空旧数据
  try {
    // 模拟请求，把行ID和被点击的属性名传给后端
    // !!! 请将 '/api/data-detail' 替换成你真实的后端接口地址
    const response = await axios.get(`/api/data-detail?id=${item.id}&attribute=${attributeKey}`)
    modalContent.value = response.data
  } catch (error) {
    console.error('获取详细数据失败:', error)
    modalContent.value = { error: '加载失败，请重试。' }
  } finally {
    isLoadingModal.value = false
  }
}


// --- 事件处理 ---

// 点击可点击属性时触发的方法
function handleAttributeClick(item, attributeKey) {
  isModalVisible.value = true // 显示弹窗
  fetchDetailData(item, attributeKey) // 去获取弹窗内容
}


// --- 生命周期钩子 ---

// onMounted 会在组件挂载到页面后执行一次，非常适合用来做初始化数据请求
onMounted(() => {
  fetchListData()
})

</script>

<template>
  <div class="data-list-page">
    <h1>数据列表展示</h1>

    <div v-if="isLoadingList">正在加载列表...</div>

    <ul v-else class="data-list">
      <li v-for="item in listData" :key="item.id" class="list-item">
        <p><strong>ID:</strong> {{ item.id }}</p>
        <p><strong>名称:</strong> {{ item.name }}</p>
        
        <div v-if="item.attr1">
          <strong>属性1:</strong>
          <button @click="handleAttributeClick(item, 'attr1')">
            {{ item.attr1 }} (点击查看详情)
          </button>
        </div>

        <div v-if="item.attr2">
          <strong>属性2:</strong>
          <button @click="handleAttributeClick(item, 'attr2')">
            {{ item.attr2 }} (点击查看详情)
          </button>
        </div>

        <div v-if="item.attr3">
          <strong>属性3:</strong>
          <button @click="handleAttributeClick(item, 'attr3')">
            {{ item.attr3 }} (点击查看详情)
          </button>
        </div>
      </li>
    </ul>

    <div v-if="isModalVisible" class="modal-overlay" @click.self="isModalVisible = false">
      <div class="modal-content">
        <button class="modal-close" @click="isModalVisible = false">×</button>
        <h2>详细信息</h2>
        
        <div v-if="isLoadingModal">正在加载详情...</div>
        
        <div v-else>
          <pre>{{ modalContent }}</pre>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* 给页面一些基本样式 */
.data-list-page {
  font-family: sans-serif;
  padding: 20px;
}

.data-list {
  list-style: none;
  padding: 0;
}

.list-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.list-item button {
  margin-left: 10px;
  cursor: pointer;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px 40px;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
  max-width: 80%;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

/* pre 标签用于格式化显示 JSON 对象，方便调试 */
pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>