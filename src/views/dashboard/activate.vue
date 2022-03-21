<template>
  <div class="statics-layout production-layout" v-loading="loading">
    <div class="statics-title">激活次数</div>
    <div class="condition-list">
      <div class="condition">
        <el-select @change="loadData" size="small" v-model="searchParam.startTime" placeholder="请选择">
          <el-option :label="time.title" :value="time.value" v-for="(time,index) in timeList" :key="index"></el-option>
          <!--<el-option label="最近7天" :value="-7"></el-option>-->
          <!--<el-option label="最近30天" :value="-30"></el-option>-->
          <!--<el-option label="自定义" :value="4"></el-option>-->
        </el-select>
      </div>
      <!--<div class="condition">-->
        <!--<el-date-picker-->
          <!--size="small"-->
          <!--v-if="timeType === 4"-->
          <!--type="daterange"-->
          <!--v-model="daterange"-->
          <!--range-separator="~"-->
          <!--value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--:default-time="['00:00:00', '23:59:59']"-->
          <!--start-placeholder="开始时间"-->
          <!--end-placeholder="结束时间">-->
        <!--</el-date-picker>-->
        <!--<div class="time" v-if="timeType !== 4 && showTimes.length">{{showTimes[0]}} - {{showTimes[1]}}</div>-->
      <!--</div>-->
    </div>
    <chart class="chart-wrap" :options="options"></chart>
  </div>
</template>
<script>
  import timeFormat from '@/utils/time-format'

  export default {
    name: 'UserPortrait',
    data() {
      return {
        loading: false,
        searchParam: {
          startTime: -1
        },
        timeType: 3,
        daterange: [],
        showTimes: [],
        options: {},
      }
    },
    components: {},
    async mounted() {
      this.loadData();
      //this.changeTimeType();
    },
    methods: {
      async loadData() {
        const params = {};
        Object.keys(this.searchParam).forEach(key => {
          if (this.searchParam[key] || this.searchParam[key] === 0) {
            params[key] = this.searchParam[key]
          }
        })
        this.loading = true
        await new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
        this.loading = false
        this.options = {
            color: ['#50aa37'],
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '10',
              right: '10',
              top: '50',
              bottom: '10',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['04-01','04-02','04-03','04-04','04-05','04-06','04-07','04-08','04-09','04-10','04-11','04-12','04-13','04-14']
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000),
                parseInt(Math.random()*1000),parseInt(Math.random()*1000),parseInt(Math.random()*1000)],
              type: 'line',
              symbolSize: 10,
            }]
          };
      },
      changeTimeType() {
        const startTime = new Date();
        const endTime = new Date();
        endTime.setDate(endTime.getDate() - 1);
        switch (this.timeType) {
          case 1:
            startTime.setDate(startTime.getDate() - 1)
            break;
          case 2:
            startTime.setDate(startTime.getDate() - 7)
            break;
          case 3:
            startTime.setDate(startTime.getDate() - 30)
            break;
        }
        this.showTimes = [timeFormat.fetch(startTime.getTime(), '{YYYY}年{MM}月{DD}日'), timeFormat.fetch(endTime.getTime(), '{YYYY}年{MM}月{DD}日')];
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  .production-layout {
    .chart-wrap {
      width: 100%;
    }
  }
</style>
