// import dayjs from "dayjs";
import { message } from "@/utils/message";
import { getUserList } from "@/api/system";
// import { ElMessageBox } from "element-plus";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, toRaw } from "vue";

export const SexOptions = [
  {
    label: "0",
    value: "男"
  },
  {
    label: "1",
    value: "女"
  },
  {
    label: "2",
    value: "保密"
  }
];
export function useUser() {
  const form = reactive({
    username: "",
    mobile: "",
    status: ""
  });
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1
  });
  const handleSizeChange = (val: number) => {
    pagination.pageSize = val;
    getTableList();
  };
  const handleCurrentChange = (val: number) => {
    pagination.currentPage = val;
    getTableList();
  };
  const getTableList = () => {
    loading.value = true;
    getUserList({
      ...toRaw(form),
      size: pagination.pageSize,
      current: pagination.currentPage
    })
      .then(res => {
        if (res.code === 0) {
          // message("查询成功", { type: "success" });
          dataList.value = res.data.list;
          pagination.total = res.data.total;
        } else {
          message(res.message || "查询失败", { type: "error" });
        }
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };
  const onSearch = () => {
    pagination.currentPage = 1;
    getTableList();
  };
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    pagination.pageSize = 10;
    pagination.currentPage = 1;
    onSearch();
  };

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    dataList,
    pagination,
    handleSizeChange,
    handleCurrentChange,
    onSearch,
    resetForm
  };
}
