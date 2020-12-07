<template>
  <div class="task-type-container container-wrap">
    <div class="container p-t-0">
      <div class="global-table-title">
        <div class="title">
          <i></i>
          <span>用户来源</span>
        </div>
      </div>
      <div class="content-wrap">
        <div
          ref="userSourceChart"
          class="single-chart"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import './user-source.less';
// import { getConfigList, updateConfig } from '@/api/paramsConfig';
import EmptyList from '@/components/empty-list/EmptyList';
export default {
  name: 'userSource',
  data() {
    return {
      tableData: [],
      loading: false,
      userSourceChart: null,
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
      this.userSourceChart = this.$echarts.init(this.$refs.userSourceChart);
      let option = {
        title: {
          text: '是否邀请',
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
          data: ['邀请', '非邀请']
        },
        series: [
          {
            name: '是否邀请',
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
              { value: 10, name: '邀请' },
              { value: 20, name: '非邀请' }
            ]
          }
        ]
      };
      this.userSourceChart.setOption(option);
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
      this.userSourceChart.resize();
    }
  }
};
</script>