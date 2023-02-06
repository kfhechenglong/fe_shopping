import { http } from "@/utils/http";

type ResultDept = {
  success: boolean;
  data?: Array<any>;
};

type UserReq = {
  current: number;
  size: number;
};

/** 获取用户管理列表 */
export const getUserList = (data: UserReq) => {
  return http.request("get", "/shopping/system/system-users/get/page", {
    data
  });
};

export const deleteUser = (data: string[]) => {
  return http.request("delete", "/shopping/system/system-users/del/", {
    data
  });
};

export const createUser = (params: any) => {
  return http.request("post", "/shopping/system/system-users/add/", {
    params
  });
};

export const updateUser = (data: any) => {
  return http.request("put", "/shopping/system/system-users/update/", {
    data
  });
};

export const getUser = (params: { id: string }) => {
  return http.request("get", "/shopping/system/system-users/get/", {
    params
  });
};

/** 获取角色管理列表 */
export const getRoleList = (data?: object) => {
  return http.request("post", "/role", { data });
};

/** 获取部门管理列表 */
export const getDeptList = (data?: object) => {
  return http.request<ResultDept>("post", "/dept", { data });
};
