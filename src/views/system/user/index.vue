<script setup lang="ts">
import { ref } from "vue";
import { message } from "@/utils/message";
import { useRouter } from "vue-router";
// import tree from "./tree.vue";
import { useUser } from "./hook";
// import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import Role from "@iconify-icons/ri/admin-line";
// import Password from "@iconify-icons/ri/lock-password-line";
// import More from "@iconify-icons/ep/more-filled";
// import Delete from "@iconify-icons/ep/delete";
// import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import { deleteUser } from "@/api/system";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "User"
});

const formRef = ref();
const router = useRouter();
const {
  form,
  loading,
  // columns,
  dataList,
  // pagination,
  // buttonClass,
  onSearch,
  resetForm
  // handleUpdate,
  // handleDelete,
  // handleSizeChange,
  // handleCurrentChange,
  // handleSelectionChange
} = useUser();
const onClickDetail = (index: number, row: any) => {
  router.push(`/system/user/edit?id=${row.id}`);
};

const onClickCreate = () => {
  router.push(`/system/user/create`);
};

const onClickEdit = (index: number, row: any) => {
  console.log(index, row.id);
  router.push(`/system/user/edit?id=${row.id}`);
};
const onClickDelete = (index: number, row: any) => {
  console.log(index, row);
  deleteUser([row.id]).then(res => {
    if (res.code === 0) {
      message("操作成功", { type: "success" });
    }
  });
};
</script>

<template>
  <div class="main">
    <!-- <tree class="w-[17%] float-left" /> -->

    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color w-[99/100] pl-8 pt-4"
    >
      <el-form-item label="用户名称：" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名称"
          clearable
          class="!w-[160px]"
        />
      </el-form-item>
      <el-form-item label="手机号码：" prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="请输入手机号码"
          clearable
          class="!w-[160px]"
        />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择"
          clearable
          class="!w-[160px]"
        >
          <el-option label="已开启" value="1" />
          <el-option label="已关闭" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <div class="table-wrap">
      <el-button type="primary" @click="onClickCreate">新建用户</el-button>
      <el-table :data="dataList" style="width: 100%; margin-top: 20px">
        <el-table-column
          fixed
          prop="system_nickname"
          label="用户名称"
          width="150"
        />
        <el-table-column prop="system_nickname" label="昵称" width="120" />
        <el-table-column
          prop="system_enterprise_name"
          label="企业名称"
          width="120"
        />
        <el-table-column
          prop="system_supervisor"
          label="是否管理员"
          width="120"
        />
        <el-table-column prop="system_mobile" label="联系方式" width="120" />
        <el-table-column prop="system_status" label="状态" width="120" />
        <el-table-column prop="system_createat" label="创建时间" width="180" />
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="onClickDetail(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="onClickEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              @click="onClickDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-wrap {
  margin-top: 20px;
  background-color: #fff;
  padding: 10px;
}
</style>
