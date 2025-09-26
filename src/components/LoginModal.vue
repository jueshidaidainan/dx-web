<template>
  <a-modal
    :open="open"
    title="用户登录"
    ok-text="登录"
    cancel-text="取消"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :model="formState" layout="vertical">
      <a-form-item label="用户名">
        <a-input v-model:value="formState.username" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from 'vue';
import { message } from 'ant-design-vue';

// 通过 props 接收父组件传来的 open 状态
defineProps({
  open: Boolean,
});

// 定义要触发的事件
const emit = defineEmits(['ok', 'cancel']);

const formState = reactive({
  username: '',
  password: '',
});

const handleOk = () => {
  // 在这里可以添加登录逻辑，比如调用 axios
  console.log('Login Info:', formState);
  message.success('登录请求已发送');
  emit('ok'); // 通知父组件“确认”事件
};

const handleCancel = () => {
  emit('cancel'); // 通知父组件“取消”事件
};
</script>
