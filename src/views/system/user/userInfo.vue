<template>
  <el-dialog
    v-model="dialogVisible"
    title="用户详情"
    width="600px"
    class="main"
  >
    <ul class="ul-wrap">
      <li>
        <span> 用户名称： </span>
        <span>{{ props.userInfo.systemUsername }}</span>
      </li>
      <li>
        <span> 用户昵称： </span>
        <span>{{ props.userInfo.systemNickname }}</span>
      </li>
      <li>
        <span> 联系电话： </span>
        <span>{{ props.userInfo.systemMobile }}</span>
      </li>
      <li>
        <span> 联系邮箱： </span>
        <span>{{ props.userInfo.systemEmail }}</span>
      </li>
      <li>
        <span> 性别： </span>
        <span>{{ sexOptionsObj[props.userInfo.systemSex] || "--" }}</span>
      </li>
      <li>
        <span> 是否超级管理员： </span>
        <span>{{ props.userInfo.systemSupervisor }}</span>
      </li>
    </ul>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { SexOptions } from "./hook";

defineOptions({
  name: "userInfo"
});
const sexOptionsObj = computed(() => {
  const obj = {};
  SexOptions.forEach(item => {
    obj[item.label] = item.value;
  });
  return obj;
});
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
const dialogVisible = ref(false);
// 组件暴露的值
defineExpose({
  dialogVisible
});
const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<style scoped lang="scss">
.main {
  padding: 20px;
  background-color: #fff;
}
.ul-wrap {
  width: 500px;
  li {
    margin: 5px;
    font-size: 14px;
    span {
      &:first-child {
        display: inline-block;
        width: 120px;
        font-weight: 600;
      }
    }
  }
}
</style>
