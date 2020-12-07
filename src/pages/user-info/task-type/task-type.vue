<template>
  <div class="task-type-container container-wrap">
    <div class="container p-t-0">
      <div class="global-table-title">
        <div class="title">
          <i></i>
          <span>任务类型</span>
        </div>
      </div>
      <div class="content-wrap">
        <div
          ref="taskTypeChart"
          class="single-chart"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import './task-type.less';
// import { getConfigList, updateConfig } from '@/api/paramsConfig';
import EmptyList from '@/components/empty-list/EmptyList';
export default {
  name: 'taskType',
  data() {
    return {
      tableData: [],
      loading: false,
      taskTypeChart: null,
    };
  },
  components: {
    EmptyList
  },
  mounted() {
    // 获取列表
    this.getListData();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    // 获取配置列表
    getListData() {
      this.taskTypeChart = this.$echarts.init(this.$refs.taskTypeChart);
      let option = {
        title: {
          text: '个人参与任务类型比例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          top: 'bottom',
          data: ['游戏', '好物', '小说', '金融', '认证']
        },
        series: [
          {
            name: '个人参与任务类型比例',
            type: 'pie',
            radius: [50, 80],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { value: 10, name: '游戏' },
              { value: 20, name: '好物' },
              { value: 15, name: '小说' },
              { value: 25, name: '金融' },
              { value: 20, name: '认证' }
            ]
          }
        ]
      };
      this.taskTypeChart.setOption(option);
      /*const rLoading = this.openLoading();
      let params = {};
      getConfigList(params).then((res) => {
          rLoading.close();
          if(res.code === 200){
              if(res.data){
                  this.tableData = res.data;
              }else {
                  this.tableData = [];
              }
          }else {
              this.$notify({
                  title: res.msg,
                  message: '',
                  type: 'error',
                  duration: 5000
              });
          }
      }).catch(() => {});*/
    },
    resizeChart() {
      this.taskTypeChart.resize();
    }
  }
};
</script>