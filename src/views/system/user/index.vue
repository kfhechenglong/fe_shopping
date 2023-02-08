<script setup lang="ts">
import { ref, nextTick } from "vue";
import { message } from "@/utils/message";
// import { useRouter } from "vue-router";
import userDialog from "./userDialog.vue";
import userInfoEle from "./userInfo.vue";
import { useUser } from "./hook";
import { ElMessageBox } from "element-plus";
// import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import Role from "@iconify-icons/ri/admin-line";
// import Password from "@iconify-icons/ri/lock-password-line";
// import More from "@iconify-icons/ep/more-filled";
// import Delete from "@iconify-icons/ep/delete";
// import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import { deleteUser, getUser } from "@/api/system";
// import AddFill from "@iconify-icons/ri/add-circle-line";

defineOptions({
  name: "User"
});
const formRef = ref();
const userDialogRef = ref();
const userDialogTitle = ref("新增用户");
const userInfoRef = ref();
const userInfo = ref({});
const isEidt = ref(false);
const {
  form,
  loading,
  dataList,
  pagination,
  onSearch,
  resetForm,
  handleSizeChange,
  handleCurrentChange
} = useUser();
// 获取用户信息
const getUserInfo = (id: string) => {
  return new Promise((resolve, reject) => {
    getUser({ id }).then(res => {
      if (res.code === 0) {
        resolve(res.data);
      } else {
        reject(null);
      }
    });
  });
};
const onClickDetail = async (row: any) => {
  // router.push(`/system/user/edit?id=${row.id}`);
  userInfo.value = await getUserInfo(row.id);
  nextTick(() => {
    userInfoRef.value.dialogVisible = true;
  });
};

const onClickCreate = () => {
  userDialogRef.value.dialogVisible = true;
  isEidt.value = false;
  userDialogTitle.value = "新增用户";
};
const onClickEdit = async (index: number, row: any) => {
  userInfo.value = await getUserInfo(row.id);
  userDialogTitle.value = "编辑用户";
  isEidt.value = true;
  nextTick(() => {
    userDialogRef.value.dialogVisible = true;
  });
};
const onClickDelete = (row: any) => {
  ElMessageBox.confirm(
    `确认要<strong>删除</strong><strong style='color:var(--el-color-primary)'>${row.system_username}</strong>用户吗?`,
    "删除提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
      draggable: true
    }
  )
    .then(() => {
      deleteUser([row.id]).then(res => {
        if (res.code === 0) {
          onSearch();
          message("操作成功", { type: "success" });
        } else {
          message(res.message || "操作失败", { type: "error" });
        }
      });
    })
    .catch(() => {});
};
</script>

<template>
  <div class="main">
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="bg-bg_color form-warp"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户名称：" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码：" prop="mobile">
            <el-input
              v-model="form.mobile"
              placeholder="请输入手机号码"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态：" prop="status">
            <el-select v-model="form.status" placeholder="请选择" clearable>
              <el-option label="已开启" value="0" />
              <el-option label="已关闭" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <el-form-item>
            <el-button
              type="primary"
              :icon="useRenderIcon(Search)"
              :loading="loading"
              @click="onSearch"
            >
              搜索
            </el-button>
            <el-button
              :icon="useRenderIcon(Refresh)"
              @click="resetForm(formRef)"
            >
              重置
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-wrap">
      <el-button type="primary" @click="onClickCreate">新建用户</el-button>
      <el-table :data="dataList" style="width: 100%; margin-top: 20px" stripe>
        <el-table-column
          fixed
          prop="system_username"
          label="用户名称"
          min-width="150"
        />
        <el-table-column prop="system_nickname" label="昵称" min-width="120" />
        <el-table-column
          prop="system_enterprise_name"
          label="企业名称"
          min-width="120"
        />
        <el-table-column
          prop="system_supervisor"
          label="是否管理员"
          width="120"
        />
        <el-table-column prop="system_mobile" label="联系电话" width="120" />
        <el-table-column prop="system_email" label="联系邮箱" width="180" />
        <el-table-column prop="system_status" label="状态" width="100" />
        <el-table-column prop="system_createat" label="创建时间" width="180" />
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="onClickDetail(scope.row)"
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
              @click="onClickDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pages-class">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[5, 10, 20, 50]"
          :small="false"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <userDialog
      ref="userDialogRef"
      :userInfo="userInfo"
      @update="onSearch"
      :isEidt="isEidt"
      :title="userDialogTitle"
    />
    <userInfoEle ref="userInfoRef" :userInfo="userInfo" />
  </div>
</template>

<style scoped lang="scss">
.table-wrap {
  margin-top: 20px;
  background-color: #fff;
  padding: 10px;
  .pages-class {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
.form-warp {
  padding: 18px 18px 0 18px;
}
</style>
