<template>
    <div class="user-detail-container" id="containerWrap">
        <div class="container clearfix" ref="searchBox">
            <el-form :model="searchForm" :inline="true" ref="searchForm">
                <div class="search-item-box">
                    <el-form-item label="时间：" prop="pay_time" class="marginRight55">
                        <el-date-picker
                                v-model="searchForm.pay_time"
                                type="datetimerange"
                                align="left"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions"
                                :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </el-form-item>
                    <div class="btn-right">
                        <el-button @click="resetForm('searchForm')">重置</el-button>
                        <el-button type="primary" @click="handleSearch('searchForm')">搜索</el-button>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="container container-table-has-search m-t-16 p-t-0 pos-relative">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>用户列表</span>
                </div>
            </div>
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    ref="multipleTable"
                    class="user-table"
            >
                <el-table-column :fixed="tableData.length > 0" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" class="marginRight32" @click="handleViewDetail(scope.$index,scope.row)">用户详情</el-button>
                        <el-button type="text" class="marginLeft0" @click="handleViewTaskDetail(scope.$index,scope.row)">任务详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="parent_name" label="用户名称"></el-table-column>
                <el-table-column prop="user_detail" label="是否是会员">
                    <template slot-scope="scope">
                        {{scope.row.is_member>0?'会员':'非会员'}}
                    </template>
                </el-table-column>
                <el-table-column prop="user_detail" label="手机号">
                    <template slot-scope="scope">
                        {{scope.row.phone}}
                    </template>
                </el-table-column>
                <el-table-column prop="sex_cn" label="性别"></el-table-column>
                <el-table-column prop="status" label="已完成任务/已接任务" width="200">
                    <template slot-scope="scope">
                        <span
                            class="task-num"
                            :class="{'all-finished':Number(scope.row.task_end_num) === Number(scope.row.task_all_num)}"
                        >{{scope.row.task_end_num}}/{{scope.row.task_all_num}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="member_expire_time" label="会员过期时间" width="180"></el-table-column>
                <template  slot="empty" >
                    <EmptyList></EmptyList>
                </template>
            </el-table>
            <div class="pagination pos-relative">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="pageInfo.pageIndex"
                        :page-size="pageInfo.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
            <div class="empty-list-box" v-show="tableData.length === 0">
                <EmptyList></EmptyList>
            </div>
        </div>
        <!-- 用户详情弹出框 -->
        <el-dialog
                title="用户详情"
                :visible.sync="detailVisible"
                custom-class="locking-dialog"
                width="720px"
                :before-close="visibleClose"
                :destroy-on-close="true"
        >
            <table class="myTable" :model="userInfo" id="printTest">
                <thead></thead>
                <tbody>
                <tr>
                    <td class="table-title h100">用户头像</td>
                    <td class="table-content h100">
                        <img class="head_img" :src="userInfo.head_url" alt="">
                    </td>
                </tr>
                <tr>
                    <td class="table-title">用户Id</td>
                    <td class="table-content">{{userInfo.id}}</td>
                </tr>
                <tr>
                    <td class="table-title">用户昵称</td>
                    <td class="table-content">{{userInfo.parent_name}}</td>
                </tr>
                <tr>
                    <td class="table-title">注册时间及方式</td>
                    <td class="table-content">{{userInfo.created_at}}</td>
                </tr>
                <tr>
                    <td class="table-title">用户微信</td>
                    <td class="table-content">未获取</td>
                </tr>
                <tr>
                    <td class="table-title">是否会员或导师</td>
                    <td class="table-content">
                        <span>{{userInfo.is_member > 0 ? '会员':'非会员'}}</span>
                        <span class="marginLeft30">{{userInfo.is_member > 0 ? '有效期至' + userInfo.member_expire_time:''}}</span>
                        <!--<span class="marginLeft30">{{userInfo.is_member > 0 ? '导师':'非导师'}}</span>-->
                    </td>
                </tr>
                <tr>
                    <td class="table-title">任务情况</td>
                    <td class="table-content">
                        <span class="marginRight32">总任务数：{{userInfo.task_all_num}} </span>
                        <span>完成任务：{{userInfo.task_end_num}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-title">上次登陆时间</td>
                    <td class="table-content">{{userInfo.last_login_at}}</td>
                </tr>
                <tr>
                    <td class="table-title">总收益</td>
                    <td class="table-content">{{userInfo.profit_all}}元</td>
                </tr>
                <tr>
                    <td class="table-title">详细信息</td>
                    <td class="table-content">未获取</td>
                </tr>
                </tbody>
            </table>
        </el-dialog>
        <!-- 任务详情弹出框 -->
        <el-dialog
                title="操作记录"
                custom-class="operation-record-dialog"
                :visible.sync="taskListVisible"
                width="1080px"
                height="600px"
                :destroy-on-close="true"
        >
            <el-table v-loading="loading"
                      :data="taskListData"
                      ref="multipleTable" tooltip-effect="dark"
            >
                <el-table-column prop="status" label="状态" width="100">
                    <template scope="scope">
                        <span :class="orderStatusClass(scope.row.status)">
                            {{orderStatus(scope.row.status)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="task_name" label="历史任务名"></el-table-column>
                <el-table-column prop="user_end_num" label="完成次数" width="80"></el-table-column>
                <el-table-column prop="new_num" label="转发次数" width="80"></el-table-column>
                <el-table-column prop="reason_name" label="获得积分" width="80"></el-table-column>
                <el-table-column prop="created_at" label="领取时间" width="176"></el-table-column>
                <el-table-column prop="expire_time" label="截止时间" width="176"></el-table-column>
                <el-table-column prop="end_time" label="结算时间" width="176"></el-table-column>
                <template slot="empty">
                    <EmptyList></EmptyList>
                </template>
            </el-table>
            <div class="pagination pos-relative">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="taskPageInfo.pageIndex"
                        :page-size="taskPageInfo.pageSize"
                        :total="taskPageTotal"
                        @current-change="taskPageChange"
                ></el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { queryUserList,queryUserDetail, queryUserTaskList } from '@/api/user';
    import EmptyList from '@/components/empty-list/EmptyList';
    import './user-detail.less';
    export default {
        name: 'UserDetail',
        data() {
            return {
                searchForm: {
                    pay_time:''
                },
                pageInfo: {
                    name: '',
                    pageIndex: 1,
                    pageSize: 15
                },
                taskPageInfo: {
                    pageIndex: 1,
                    pageSize: 15
                },
                loading: false,
                tableData: [],
                pageTotal: 0, // 总条数
                taskPageTotal: 0, // 任务总条数
                id: -1,
                searchParams: {
                    paid_time_le:'',     // 结束时间
                    paid_time_ge:'',     // 开始时间
                },
                tableHeight: 'calc(100% - 134px)',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                        {
                            text: '最近一年',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                detailVisible: false,
                userInfo:{},
                taskListVisible: false,
                taskListData:[]
            };
        },
        components: {
            EmptyList
        },
        computed: {
            orderStatus: function() {
                return data => {
                    if (data === 0) {
                        return '待完成';
                    } else if (data === 1) {
                        return '已完成';
                    } else if (data === 2) {
                        return '已过期';
                    } else if (data === 3) {
                        return '违规';
                    }
                };
            },
            orderStatusClass: function() {
                return data => {
                    if (data === 0) {
                        return 'order-paid';
                    } else if (data === 1) {
                        return 'order-successfully';
                    } else if (data === 2) {
                        return 'order-cancelled';
                    } else if (data === 3) {
                        return 'order-cancelled';
                    }
                };
            }

        },
        created() {
        },
        mounted() {
            // 获取用户列表数据
            this.getListData();
            // 获取搜索容器高度
            // const searchBoxHeight = this.$refs.searchBox.offsetHeight;
            // const containerHasSearch = document.getElementsByClassName('container-table-has-search')[0];
            // containerHasSearch.style.height = `calc(100% - 16px - ${searchBoxHeight}px)`;
        },
        methods: {
            // 请求-获取订单列表数据
            getListData() {
                let params = {
                    page: this.pageInfo.pageIndex,
                    paid_time_le: this.searchParams.paid_time_le ? this.searchParams.paid_time_le : '',
                    paid_time_ge: this.searchParams.paid_time_ge ? this.searchParams.paid_time_ge: '',
                };
                const rLoading = this.openLoading();
                queryUserList(params)
                    .then((res) => {
                        rLoading.close();
                        if (res.code === 0) {
                            if (res.data) {
                                this.tableData = res.data.data || [];
                                this.pageTotal = res.data.total || 0;
                            } else {
                                this.tableData = [];
                            }
                        } else {
                            this.$notify({
                                title: res.msg,
                                message: '',
                                type: 'error',
                                duration: 5000
                            });
                        }
                    })
                    .catch(() => {});
            },

            // 按钮 - 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$set(this.searchParams,'paid_time_ge', '');
                this.$set(this.searchParams,'paid_time_le', '');
                this.getListData();
            },

            // 按钮-触发搜索按钮
            handleSearch(formName) {
                this.$set(this.pageInfo, 'pageIndex', 1);
                //  存储搜索条件
                this.$set(this.searchParams,'paid_time_ge', this.searchForm.pay_time[0]);
                this.$set(this.searchParams,'paid_time_le', this.searchForm.pay_time[1]);
                this.getListData();
            },

            // 按钮-查看用户详情
            handleViewDetail(index, row){
                const params ={
                    id:Number(row.id)
                };
                // this.$router.push({ path: '/order-detail', query: { order_id: row.id.toString() } });
                const rLoading = this.openLoading();
                queryUserDetail(params)
                    .then((res) => {
                        rLoading.close();
                        if (res.code === 0) {
                            if (res.data) {
                                this.userInfo = res.data || {};
                                console.log('usrInfo', this.usrInfo);
                            } else {
                                this.userInfo = {};
                            }
                            this.detailVisible = true;
                        } else {
                            this.$notify({
                                title: res.msg,
                                message: '',
                                type: 'error',
                                duration: 5000
                            });
                        }
                    })
                    .catch(() => {});
            },

            // 按钮-查看任务详情
            handleViewTaskDetail(index, row){
                const params ={
                    uid: Number(row.id),
                    order_no: '',
                    page: this.taskPageInfo.pageIndex,
                };
                // this.$router.push({ path: '/order-detail', query: { order_id: row.id.toString() } });
                const rLoading = this.openLoading();
                queryUserTaskList(params)
                    .then((res) => {
                        rLoading.close();
                        if (res.code === 0) {
                            if (res.data) {
                                this.taskListData = res.data.data || [];
                                this.taskPageTotal = res.data.total || 0;
                                console.log('usrInfo', this.taskListData);
                            } else {
                                this.taskListData = [];
                            }
                            this.taskListVisible = true;
                        } else {
                            this.$notify({
                                title: res.msg,
                                message: '',
                                type: 'error',
                                duration: 5000
                            });
                        }
                    })
                    .catch(() => {});
            },

            //时间格式化
            getInitTime(val){
                if(val){
                    const dt = new Date(val);
                    let year = dt.getFullYear(); //年
                    let month = dt.getMonth() +1; //月
                    let date = dt.getDate(); //日
                    let hh = dt.getHours(); //时
                    let mm = dt.getMinutes(); //分
                    let ss = dt.getSeconds(); //秒
                    month = month < 10 ? "0" + month : month;
                    date  = date <10 ? "0" + date : date;
                    hh  = hh <10 ? "0" + hh : hh;
                    mm  = mm <10 ? "0" + mm : mm;
                    ss  = ss <10 ? "0" + ss : ss;
                    let new_time = ''
                    new_time = year + "-" + month + "-" + date + ' ' + hh + ':' + mm + ':' + ss;
                    return new_time;
                }else {
                    return '-1'
                }
            },

            // 按钮-分页导航
            handlePageChange(val) {
                this.$set(this.pageInfo, 'pageIndex', val);
                let time_arr = [];
                if (this.searchParams['paid_time_ge']) {
                    time_arr[0] = this.searchParams['paid_time_ge'];
                    time_arr[1] = this.searchParams['paid_time_le'];
                    this.$set(this.searchForm, 'pay_time', time_arr);
                }
                this.getListData();
            },

            taskPageChange(val) {
                this.$set(this.taskPageInfo, 'pageIndex', val);
                this.getListData();
            },

            visibleClose(){
                this.detailVisible = false;
            },
            columnStyle({ row, column, rowIndex, columnIndex }) {
                if (columnIndex == 0 || columnIndex == 1 || columnIndex == 3) {
                    //第三第四列的背景色就改变了2和3都是列数的下标
                    return "background:#f3f6fc;";
                }else{
                    return "background:#ffffff;";
                }
            },
            // 和并列
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 4 === 0) {
                        return {
                            rowspan: 4,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },
        }
    };
</script>
