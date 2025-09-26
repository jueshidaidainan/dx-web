<template>
  <a-modal
    :open="open"
    title="规则输入"
    ok-text="提交"
    cancel-text="取消"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <p>请输入要下发的规则内容，提交后将调用后端接口。</p>
    <a-textarea
      v-model:value="ruleContent"
      placeholder="请在此处输入规则..."
      :rows="4"
    />
  </a-modal>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { message } from 'ant-design-vue';

defineProps({
  open: Boolean,
});

const emit = defineEmits(['ok', 'cancel']);
const ruleContent = ref('');

const handleOk = () => {
  // 在这里调用后端的 Nginx 接口
  console.log('Rule content to submit:', ruleContent.value);
  message.success('规则已提交');
  emit('ok');
};

const handleCancel = () => {
  emit('cancel');
};
</script>
