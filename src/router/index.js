import Vue from 'vue';
import Router from 'vue-router';
/**
 * 重写路由的push方法
 * 解决，相同路由跳转时，报错
 */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);

const HomeComponent = () => import('@/components/Home');
const LoginComponent = () => import('@/pages/login/Login');
const page404Component = () => import('@/pages/404');
const page403Component = () => import('@/pages/403');
const DashboardComponent = () => import('@/pages/Dashboard');
const MyselfInfoComponent = () => import('@/pages/user-info/personal-info/personal-info');
const TaskTypeComponent = () => import('@/pages/user-info/task-type/task-type');
const UserSourceComponent = () => import('@/pages/user-info/user-source/user-source');
const ActiveUsersComponent = () => import('@/pages/user-info/active-users/active-users');
const UserRetentionComponent = () => import('@/pages/user-info/user-retention/user-retention');
const UserGroupsComponent = () => import('@/pages/user-info/user-groups/user-groups');
const PhoneModelComponent = () => import('@/pages/user-info/phone-model/phone-model');
const UserDetailComponent = () => import('@/pages/user-info/user-detail/user-detail');
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: HomeComponent,
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: DashboardComponent,
                    meta: { title: '系统首页',name:'dashboard' }
                },
                {
                    path: '/myself-info',
                    component: MyselfInfoComponent,
                    meta: { title: '个人信息',name:'MyselfInfo' }
                },
                {
                    path: '/task-type',
                    component: TaskTypeComponent,
                    meta: { title: '任务类型',name:'taskType' }
                },
                {
                    path: '/user-source',
                    component: UserSourceComponent,
                    meta: { title: '用户来源',name:'userSource' }
                },
                {
                    path: '/active-users',
                    component: ActiveUsersComponent,
                    meta: { title: 'DNU/DAU/MAU',name:'activeUsers' }
                },
                {
                    path: '/user-retention',
                    component: UserRetentionComponent,
                    meta: { title: '用户留存',name:'userRetention' }
                },
                {
                    path: '/user-groups',
                    component: UserGroupsComponent,
                    meta: { title: '用户分组',name:'userGroups' }
                },
                {
                    path: '/phone-model',
                    component: PhoneModelComponent,
                    meta: { title: '用户分组',name:'phoneModel' }
                },
                {
                    path: '/user-detail',
                    component: UserDetailComponent,
                    meta: { title: '用户详情',name:'userDetail' }
                },
                {
                    path: '/404',
                    component: () => page404Component,
                    meta: { title: '404',name:'404' }
                },
                {
                    path: '/403',
                    component: () => page403Component,
                    meta: { title: '403',name:'403' }
                },
            ]
        },
        {
            path: '/login',
            component: LoginComponent,
            meta: { title: '登录',name:'login' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
