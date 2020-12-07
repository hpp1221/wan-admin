<template>
  <div class="parameter-config-container">
    <div class="container p-t-0">
      <div class="global-table-title">
        <div class="title">
          <i></i>
          <span>用户分组</span>
        </div>
      </div>
      <div class="content-wrap">
        <div
          ref="ageChart"
          class="single-chart"
        ></div>
        <div
          ref="cityChart"
          class="single-chart"
        ></div>
        <div
          ref="industryChart"
          class="single-chart"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import './user-groups.less';
// import { getConfigList, updateConfig } from '@/api/paramsConfig';
import EmptyList from '@/components/empty-list/EmptyList';
export default {
  name: 'UserGroups',
  data() {
    return {
      tableData: [],
      loading: false,
      ageChart: null,
      cityChart: null,
      industryChart: null
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
      this.ageChart = this.$echarts.init(this.$refs.ageChart);
      this.cityChart = this.$echarts.init(this.$refs.cityChart);
      this.industryChart = this.$echarts.init(this.$refs.industryChart);
      let option = {
        title: {
          text: '年龄',
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
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        series: [
          {
            name: '年龄',
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
              { value: 10, name: 'rose1' },
              { value: 5, name: 'rose2' },
              { value: 15, name: 'rose3' },
              { value: 25, name: 'rose4' },
              { value: 20, name: 'rose5' },
              { value: 35, name: 'rose6' },
              { value: 30, name: 'rose7' },
              { value: 40, name: 'rose8' }
            ]
          }
        ]
      };
      let cityOption = {
        title: {
          text: '城市',
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
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        series: [
          {
            name: '城市',
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
              { value: 10, name: 'rose1' },
              { value: 50, name: 'rose2' },
              { value: 15, name: 'rose3' },
              { value: 25, name: 'rose4' },
              { value: 20, name: 'rose5' },
              { value: 35, name: 'rose6' },
              { value: 30, name: 'rose7' },
              { value: 40, name: 'rose8' }
            ]
          }
        ]
      };
      let industryOption = {
        title: {
          text: '行业',
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
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        series: [
          {
            name: '行业',
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
              { value: 10, name: 'rose1' },
              { value: 5, name: 'rose2' },
              { value: 15, name: 'rose3' },
              { value: 25, name: 'rose4' },
              { value: 20, name: 'rose5' },
              { value: 35, name: 'rose6' },
              { value: 30, name: 'rose7' },
              { value: 40, name: 'rose8' }
            ]
          }
        ]
      };
      let sexOption = {
        title: {
          text: '性别',
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
          data: ['男', '女', '未知']
        },
        series: [
          {
            name: '性别',
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
              { value: 100, name: '男' },
              { value: 70, name: '女' },
              { value: 80, name: '未知' },
            ]
          }
        ]
      };
      this.ageChart.setOption(option);
      this.cityChart.setOption(cityOption);
      this.industryChart.setOption(industryOption);
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
      this.ageChart.resize();
      this.cityChart.resize();
      this.industryChart.resize();
    }
  }
};
</script>