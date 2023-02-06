<script setup lang="ts">
import { createUser } from "@/api/system";
import { FormInstance, FormRules } from "element-plus";
import { ref, reactive } from "vue";

import { useRouter } from "vue-router";

defineOptions({
  name: "UserCreate"
});

defineProps<{
  onChange: (values: any) => void;
}>();

const formRef = ref<FormInstance>();
const router = useRouter();

// do not use same name with ref
const form = reactive({
  systemUsername: "",
  systemNickname: "",
  systemMobile: "",
  systemSex: 2,
  systemSupervisor: 1,
  systemPwd: ""
});
const rules = reactive<FormRules>({
  systemUsername: [{ required: true, message: "请输入", trigger: "blur" }],
  systemMobile: [
    {
      required: true,
      message: "请输入",
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
      message: "请输入",
      trigger: "blur"
    }
  ]
});

const onSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(valid => {
    if (valid) {
      console.log("submit!", form);
      createUser(form).then(res => {
        console.log(res);
      });
    } else {
      console.log("error submit!", form);
    }
  });
};
</script>

<template>
  <div class="main">
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
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="手机号码：" prop="systemMobile">
          <el-input
            v-model="form.systemMobile"
            placeholder="请输入手机号码"
            clearable
          />
        </el-form-item>
        <el-form-item label="性别：" prop="systemSex">
          <el-radio-group
            v-model="form.systemSex"
            placeholder="请选择"
            clearable
          >
            <el-radio label="男" value="0" />
            <el-radio label="女" value="1" />
            <el-radio label="保密" value="2" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否超级管理员：" prop="systemSupervisor">
          <el-radio-group
            v-model="form.systemSupervisor"
            placeholder="请选择"
            clearable
          >
            <el-radio label="是" value="0" />
            <el-radio label="否" value="1" />
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding: 20px;
  background-color: #fff;
}
.form-wrap {
  width: 600px;
}
</style>
