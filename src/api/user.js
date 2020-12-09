import {get,post,put} from './util';
import qs from 'qs';

// 用户列表
export const getUserList = params =>post('/backend/user-list',params)

// 添加用户
export const addUser = params =>post('/backend/user-create',params)

// 编辑用户
export const editUserInfo = params =>post('/backend/user-update',params)

// 用户详情
export const getUserDetail = params =>post('/backend/user-detail',params)

// 个人信息
export const queryUserInfo = params =>post('/admin/stat/user',qs.stringify(params));

// 个人参与任务类型统计
export const queryTaskType = params =>post('/admin/stat/category',qs.stringify(params));

// 用户来源统计
export const queryUserSource = params =>post('/admin/stat/user-source',qs.stringify(params));

// 用户分组
export const queryUserGroup = params =>post('/admin/stat/user-group',qs.stringify(params));

// 用户手机型号统计
export const queryUserMobile = params =>post('/admin/stat/user-mobile',qs.stringify(params));

// 用户列表
export const queryUserList = params =>post('/admin/user/list',qs.stringify(params));

// 用户详情
export const queryUserDetail = params =>post('/admin/user/info',qs.stringify(params));

// 用户订单列表（已接任务）
export const queryUserTaskList = params =>post('/admin/order/list',qs.stringify(params));

