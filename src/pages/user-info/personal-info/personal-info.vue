<template>
  <div class="parameter-config-container">
    <div class="container p-t-0">
      <div class="global-table-title">
        <div class="title">
          <i></i>
          <span>个人信息</span>
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
        <div
          ref="sexChart"
          class="single-chart"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import './personal-info.less';
import { queryUserInfo } from '@/api/user';
import EmptyList from '@/components/empty-list/EmptyList';
import { loginApi } from '@/api/login';
import { setToken } from '@/utils/auth';
export default {
  name: 'MyselfInfo',
  data() {
    return {
      tableData: [],
      loading: false,
      ageChart: null,
      cityChart: null,
      industryChart: null,
      sexChart: null,
    };
  },
  components: {
    EmptyList
  },
  created() {
  },
  mounted() {
    // 获取列表
    this.getUserData();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    getUserData(){
      this.ageChart = this.$echarts.init(this.$refs.ageChart);
      this.cityChart = this.$echarts.init(this.$refs.cityChart);
      this.industryChart = this.$echarts.init(this.$refs.industryChart);
      this.sexChart = this.$echarts.init(this.$refs.sexChart);
      const rLoading = this.openLoading();
      queryUserInfo().then((res) => {
        rLoading.close();
        if (res.code === 0) {
          const ageData = res.data.age_map || [];
          const cityData = res.data.city_map || [];
          const jobData = res.data.job_map || [];
          const sexData = res.data.sex_map || [];
          let ageName = [],ageList = [],
              cityName = [],cityList = [],
              jobName = [],jobList = [],
              sexName = [],sexList = []
          ;
          console.log('ageName', ageName);
          console.log('ageList', ageList);
          ageData.forEach((ev)=>{
            ageName.push(ev.name);
            ageList.push({
              name:ev.name,
              value:ev.num
            })
          });
          cityData.forEach((ev)=>{
            cityName.push(ev.name);
            cityList.push({
              name:ev.name,
              value:ev.num
            })
          });
          jobData.forEach((ev)=>{
            jobName.push(ev.name);
            jobList.push({
              name:ev.name,
              value:ev.num
            })
          });
          sexData.forEach((ev)=>{
            sexName.push(ev.name);
            sexList.push({
              name:ev.name,
              value:ev.num
            })
          });
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
              data: ageName
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
                data: ageList
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
              data: cityName
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
                data: cityList
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
              data: jobName
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
                data: jobList
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
              data: sexName
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
                data: sexList
              }
            ]
          };
          this.ageChart.setOption(option);
          this.cityChart.setOption(cityOption);
          this.industryChart.setOption(industryOption);
          this.sexChart.setOption(sexOption);
        } else {

        }
      }).catch(() => {});
    },
    // 获取配置列表
    getListData() {
    },
    resizeChart() {
      this.ageChart.resize();
      this.cityChart.resize();
      this.industryChart.resize();
      this.sexChart.resize();
    }
  }
};
</script>