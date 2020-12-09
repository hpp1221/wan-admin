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
import EmptyList from '@/components/empty-list/EmptyList';
import { queryTaskType } from '@/api/user';
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
    // queryTaskType
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
      const rLoading = this.openLoading();
      queryTaskType().then((res) => {
        rLoading.close();
        if (res.code === 0) {
          const categoryData = res.data.category_map || [];
          let categoryName = [],categoryList = [];
          categoryData.forEach((ev)=>{
            categoryName.push(ev.name);
            categoryList.push({
              name:ev.name,
              value:ev.num
            })
          });
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
              data: categoryName
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
                data: categoryList
              }
            ]
          };
          this.taskTypeChart.setOption(option);
        } else {

        }
      }).catch(() => {});
    },
    resizeChart() {
      this.taskTypeChart.resize();
    }
  }
};
</script>