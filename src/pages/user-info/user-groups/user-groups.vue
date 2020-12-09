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
          ref="realChart"
          class="single-chart"
        ></div>
        <div
          ref="memberChart"
          class="single-chart"
        ></div>
        <div
          ref="taskChart"
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
import { queryUserGroup } from '@/api/user';
export default {
  name: 'UserGroups',
  data() {
    return {
      tableData: [],
      loading: false,
      realChart: null,
      memberChart: null,
      taskChart: null
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
      this.realChart = this.$echarts.init(this.$refs.realChart);
      this.memberChart = this.$echarts.init(this.$refs.memberChart);
      this.taskChart = this.$echarts.init(this.$refs.taskChart);
      const rLoading = this.openLoading();
      queryUserGroup().then((res) => {
        rLoading.close();
        if (res.code === 0) {
          const realData = res.data.real_map || [];
          const memberData = res.data.member_map || [];
          const taskData = res.data.task_map || [];
          let realName = [],realList = [],
              memberName = [],memberList = [],
              taskName = [],taskList = [];
          realData.forEach((ev)=>{
            realName.push(ev.name);
            realList.push({
              name:ev.name,
              value:ev.num
            })
          });
          memberData.forEach((ev)=>{
            memberName.push(ev.name);
            memberList.push({
              name:ev.name,
              value:ev.num
            })
          });
          taskData.forEach((ev)=>{
            taskName.push(ev.name);
            taskList.push({
              name:ev.name,
              value:ev.num
            })
          });
          let option = {
            title: {
              text: '是否实名',
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
              data: realName
            },
            series: [
              {
                name: '是否实名',
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
                data: realList
              }
            ]
          };
          let cityOption = {
            title: {
              text: '是否会员',
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
              data: memberName
            },
            series: [
              {
                name: '是否会员',
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
                data: memberList
              }
            ]
          };
          let industryOption = {
            title: {
              text: '已完成任务量',
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
              data: taskName
            },
            series: [
              {
                name: '已完成任务量',
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
                data: taskList
              }
            ]
          };
          this.realChart.setOption(option);
          this.memberChart.setOption(cityOption);
          this.taskChart.setOption(industryOption);
        } else {

        }
      }).catch(() => {});
    },
    resizeChart() {
      this.realChart.resize();
      this.memberChart.resize();
      this.taskChart.resize();
    }
  }
};
</script>