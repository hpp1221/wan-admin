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
import EmptyList from '@/components/empty-list/EmptyList';
import { queryUserSource } from '@/api/user';
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
      // queryUserSource
      this.userSourceChart = this.$echarts.init(this.$refs.userSourceChart);
      const rLoading = this.openLoading();
      queryUserSource().then((res) => {
        rLoading.close();
        if (res.code === 0) {
          const inviteData = res.data.invite_map || [];
          let inviteName = [],inviteList = [];
          inviteData.forEach((ev)=>{
            inviteName.push(ev.name);
            inviteList.push({
              name:ev.name,
              value:ev.num
            })
          });
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
              data: inviteName
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
                data: inviteList
              }
            ]
          };
          this.userSourceChart.setOption(option);
        } else {

        }
      }).catch(() => {});
    },
    resizeChart() {
      this.userSourceChart.resize();
    }
  }
};
</script>