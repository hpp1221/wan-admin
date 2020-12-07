<template>
    <div class="user-detail-container" id="containerWrap">
        <div class="container clearfix" ref="searchBox">
            <el-form :model="searchForm" :inline="true" ref="searchForm">
                <div class="search-item-box">
                    <el-form-item label="支付时间：" prop="pay_time" class="marginRight55">
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
                    <span>订单列表</span>
                </div>
            </div>
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    ref="multipleTable"
                    class="user-table"
            >
                <!--<el-table-column :fixed="tableData.length > 0" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleViewDetail(scope.$index,scope.row)">查看</el-button>
                    </template>
                </el-table-column>-->
                <el-table-column prop="name" label="用户名称"></el-table-column>
                <el-table-column prop="user_detail" label="用户详情">
                    <template slot-scope="scope">
                        {{scope.row.user_detail}}
                        <!--<span class="order-status">{{orderStatus(scope.row.status)}}</span>-->
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="已完成任务/已接任务" width="200">
                    <template slot-scope="scope">
                        <span class="task-num" :class="{'all-finished':Number(scope.row.finish_num) === Number(scope.row.all_num)}">{{scope.row.finish_num}}/{{scope.row.all_num}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="创建时间" width="180"></el-table-column>
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
    </div>
</template>

<script>
    // import { getOrderList } from '../../../../api/orderList';
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
                    pageSize: 10
                },
                loading: false,
                tableData: [],
                pageTotal: 0, // 总条数
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
            };
        },
        components: {
            EmptyList
        },
        computed: {
            orderStatus: function () {
                let str = '';
                return (data) =>{
                    return str
                }
            },
        },
        created() {
            this.tableData = [
                {name: '用户名1',user_detail:'用户详情1',finish_num: 8,all_num: 10, time:'2020-12-05'},
                {name: '用户名2',user_detail:'用户详情2',finish_num: 10,all_num: 10, time:'2020-12-05'},
                {name: '用户名3',user_detail:'用户详情3',finish_num: 2,all_num: 12, time:'2020-12-05'},
                {name: '用户名4',user_detail:'用户详情4',finish_num: 1,all_num: 10, time:'2020-12-05'},
                {name: '用户名5',user_detail:'用户详情5',finish_num: 9,all_num: 9, time:'2020-12-05'},
            ]
        },
        mounted() {
            // 获取订单列表数据
            // this.getListData();
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
                    limit: this.pageInfo.pageSize,
                    id: -1,
                    paid_time_le: this.searchParams.paid_time_le ? this.searchParams.paid_time_le : '',
                    paid_time_ge: this.searchParams.paid_time_ge ? this.searchParams.paid_time_ge: '',
                };
                const rLoading = this.openLoading();
                getOrderList(params)
                    .then((res) => {
                        rLoading.close();
                        if (res.code === 200) {
                            if (res.data.list) {
                                this.tableData = res.data.list;
                                this.pageTotal = res.data.total;
                            } else {
                                this.tableData = [];
                                this.pageTotal = 0;
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

            // 按钮-查看订单详情
            handleViewDetail(index, row){
                this.$router.push({ path: '/order-detail', query: { order_id: row.id.toString() } });
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
        }
    };
</script>
