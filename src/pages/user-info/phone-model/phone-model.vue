<template>
  <div class="phone-type-container">
    <div class="container p-t-0">
      <div class="global-table-title">
        <div class="title">
          <i></i>
          <span>手机型号</span>
        </div>
      </div>
      <div class="content-wrap">
        <div
          ref="phoneTypeChart"
          class="single-chart"
        ></div>
        <div
          ref="phoneTypeChart2"
          class="single-chart"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import './phone-model.less';
// import { getConfigList, updateConfig } from '@/api/paramsConfig';
import EmptyList from '@/components/empty-list/EmptyList';
export default {
  name: 'PhoneModel',
  data() {
    return {
      tableData: [],
      loading: false,
      phoneTypeChart: null,
      phoneTypeChart2: null,
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
      this.phoneTypeChart = this.$echarts.init(this.$refs.phoneTypeChart);
      this.phoneTypeChart2 = this.$echarts.init(this.$refs.phoneTypeChart2);
      let option = {
        title: {
          text: '机型统计',
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
      let option2 = {
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
      this.phoneTypeChart.setOption(option);
      this.phoneTypeChart2.setOption(option2);
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