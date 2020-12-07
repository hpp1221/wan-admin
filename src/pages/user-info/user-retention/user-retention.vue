<template>
  <div class="users-retention-container container-wrap">
    <div class="container p-t-0">
      <div class="global-table-title">
        <div class="title">
          <i></i>
          <span>用户留存</span>
        </div>
      </div>
      <div class="content-wrap">
        <div
          ref="usersRetentionChart"
          class="single-chart"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import './user-retention.less';
// import { getConfigList, updateConfig } from '@/api/paramsConfig';
import EmptyList from '@/components/empty-list/EmptyList';
export default {
  name: 'UserRetention',
  data() {
    return {
      tableData: [],
      loading: false,
      usersRetentionChart: null,
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
      this.usersRetentionChart = this.$echarts.init(this.$refs.usersRetentionChart);
      let option = {
        title: {
          text: '用户留存统计',
          x:'center',      //可设定图例在左、右、居中
          y:'top',
        },
        legend: {
          x:'center',      //可设定图例在左、右、居中
          y:'bottom',
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '1天', '3天', '7天', '30天', '50天'],
            ['留存数据', 1143.3, 1085.8, 893.7, 600, 480, 200]
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
        ]
      };
      this.usersRetentionChart.setOption(option);
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
      this.usersRetentionChart.resize();
    }
  }
};
</script>