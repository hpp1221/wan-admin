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
          style="padding-top: 20px"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import './phone-model.less';
// import { getConfigList, updateConfig } from '@/api/paramsConfig';
import EmptyList from '@/components/empty-list/EmptyList';
import { queryUserMobile } from '@/api/user';
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
      // queryUserMobile
      const rLoading = this.openLoading();
      queryUserMobile().then((res) => {
        rLoading.close();
        if (res.code === 0) {
          const UserMobileData = res.data.brand_map || [];
          let MobileName = [],MobileList = [],XList = ['product'],YList =['留存数据'],typeList = [];
          UserMobileData.forEach((ev)=>{
            MobileName.push(ev.name);
            MobileList.push({
              name:ev.name,
              value:ev.num
            });
            XList.push(ev.name);
            YList.push(ev.num);
            typeList.push({
              type: 'bar'
            })
          });
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
                XList,
                YList
              ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            series: typeList
          };
          let option2 = {
            title: {
              text: '机型统计',
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
              data: MobileName
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
                data: MobileList
              }
            ]
          };
          this.phoneTypeChart.setOption(option);
          this.phoneTypeChart2.setOption(option2);
        } else {

        }
      }).catch(() => {});

    },
    resizeChart() {
      this.usersRetentionChart.resize();
    }
  }
};
</script>