<template>
  <div class="active-users-container container-wrap">
    <div class="container p-t-0">
      <div class="global-table-title">
        <div class="title">
          <i></i>
          <span>数据统计</span>
        </div>
      </div>
      <div class="content-wrap">
        <div
          ref="activeUsersChart"
          class="single-chart"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import './active-users.less';
// import { getConfigList, updateConfig } from '@/api/paramsConfig';
import EmptyList from '@/components/empty-list/EmptyList';
export default {
  name: 'TaskType',
  data() {
    return {
      tableData: [],
      loading: false,
      activeUsersChart: null,
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
      this.activeUsersChart = this.$echarts.init(this.$refs.activeUsersChart);
      let titleText = '2020-11-30至2020-12-07';
      let option = {
        title: {
          text: titleText,
          subtext: '纯属虚构',  // 副标题
          x:'center',      //可设定图例在左、右、居中
          y:'top',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['DNU', 'DAU','MAU'],
          x:'center',      //可设定图例在左、右、居中
          y:'bottom',
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: 'DNU',
            type: 'line',
            data: [16, 11, 15, 13, 12, 13, 17],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            name: 'DAU',
            type: 'line',
            data: [4, 2, 1, 5, 3, 2, 0],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            name: 'MAU',
            type: 'line',
            data: [5, 8, 9, 5, 13, 7, 10],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      };
      this.activeUsersChart.setOption(option);
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
      this.activeUsersChart.resize();
    }
  }
};
</script>