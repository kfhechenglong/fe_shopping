<template>
  <el-dialog
    v-model="dialogVisible"
    :title="props.title"
    width="600px"
    class="main"
  >
    <div class="form-wrap">
      <el-form
        ref="formRef"
        label-position="right"
        label-width="160px"
        :rules="rules"
        :model="form"
      >
        <el-form-item label="用户名称：" prop="systemUsername">
          <el-input
            v-model="form.systemUsername"
            placeholder="请输入用户名称"
            clearable
            class="user-input"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="用户昵称：" prop="systemNickname">
          <el-input
            v-model="form.systemNickname"
            placeholder="请输入用户名称"
            clearable
            class="user-input"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="联系电话：" prop="systemMobile">
          <el-input
            v-model="form.systemMobile"
            placeholder="请输入联系电话"
            clearable
          />
        </el-form-item>
        <el-form-item label="联系邮箱：" prop="systemEmail">
          <el-input
            v-model="form.systemEmail"
            placeholder="请输入联系邮箱"
            clearable
          />
        </el-form-item>
        <el-form-item label="性别：" prop="systemSex">
          <el-radio-group
            v-model="form.systemSex"
            placeholder="请选择"
            clearable
          >
            <el-radio
              :label="item.label"
              v-for="item in SexOptions"
              :key="item.label"
              >{{ item.value }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否超级管理员：" prop="systemSupervisor">
          <el-radio-group
            v-model="form.systemSupervisor"
            placeholder="请选择"
            clearable
          >
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码：" prop="systemPwd">
          <el-input
            v-model="form.systemPwd"
            placeholder="请输入用户密码"
            clearable
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="再次确认密码：" prop="repeatPassword">
          <el-input
            v-model="form.repeatPassword"
            placeholder="请输入用户密码"
            clearable
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { createUser, updateUser } from "@/api/system";
import { validatorEmail, validatorContactsType } from "@/utils/validator";
import { FormInstance, FormRules } from "element-plus";
import { ref, reactive, watch } from "vue";
import { message } from "@/utils/message";
import { SexOptions } from "./hook";

defineOptions({
  name: "UserCreate"
});

const props = defineProps({
  title: String,
  isEidt: Boolean,
  userInfo: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
const emits = defineEmits(["update"]);
const dialogVisible = ref(false);
const formRef = ref<FormInstance>();
// 组件暴露的值
defineExpose({
  dialogVisible
});
// do not use same name with ref
const form = reactive({
  systemUsername: "",
  systemNickname: "",
  systemEmail: "",
  systemMobile: "",
  systemSex: "0",
  systemSupervisor: "1",
  systemPwd: "",
  repeatPassword: ""
});
const rules = reactive<FormRules>({
  systemUsername: [
    { required: true, message: "请输入用户名称", trigger: "blur" }
  ],
  systemMobile: [
    {
      required: true,
      message: "请输入联系电话",
      trigger: "blur"
    },
    {
      pattern: validatorContactsType,
      message: "联系电话格式错误",
      trigger: "blur"
    }
  ],
  systemEmail: [
    {
      pattern: validatorEmail,
      message: "邮箱格式错误",
      trigger: "blur"
    }
  ],
  systemSupervisor: [
    {
      required: true,
      message: "请选择",
      trigger: "change"
    }
  ],
  systemPwd: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    },
    {
      message: "8-20位字符，至少包含大、小写字母、数字、特殊字符两种组合",
      pattern: /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/,
      trigger: "change"
    }
  ],
  repeatPassword: [
    {
      required: true,
      trigger: "change",
      validator: (rule, value: string, callback) => {
        if (value) {
          if (
            !/^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(
              value
            )
          ) {
            callback(
              new Error(
                "8-20位字符，至少包含大、小写字母、数字、特殊字符两种组合"
              )
            );
          } else if (value !== form.systemPwd) {
            callback(new Error("两次输入的密码不一致"));
          } else {
            callback();
          }
        } else {
          callback(new Error("请再次输入密码"));
        }
      }
    }
  ]
});
// 监听是否是编辑
watch(dialogVisible, value => {
  if (value && props.isEidt) {
    form.systemUsername = props.userInfo.systemUsername;
    form.systemNickname = props.userInfo.systemNickname;
    form.systemEmail = props.userInfo.systemEmail;
    form.systemMobile = props.userInfo.systemMobile;
    form.systemSex = props.userInfo.systemSex;
    form.systemSupervisor =
      props.userInfo.systemSupervisor === "是" ? "0" : "1";
  }
});
const handleClose = () => {
  dialogVisible.value = false;
  formRef.value.resetFields();
};
// 操作成功，更新信息
const updatedInfo = () => {
  emits("update", true);
};
const onSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(valid => {
    if (valid) {
      const api = props.isEidt ? updateUser : createUser;
      const params: any = {
        systemUsername: form.systemUsername,
        systemNickname: form.systemNickname,
        systemEmail: form.systemEmail,
        systemMobile: form.systemMobile,
        systemSex: form.systemSex,
        systemSupervisor: form.systemSupervisor,
        systemPwd: form.systemPwd
      };
      if (props.isEidt) {
        params.id = props.userInfo.id;
      }
      api(params).then(res => {
        if (res.code === 0) {
          message("操作成功", { type: "success" });
          handleClose();
          updatedInfo();
        } else {
          message(res.message || "操作失败", { type: "error" });
        }
      });
    } else {
      console.log("error submit!", form);
    }
  });
};
</script>

<style scoped lang="scss">
.main {
  padding: 20px;
  background-color: #fff;
}
.form-wrap {
  width: 500px;
}
</style>
