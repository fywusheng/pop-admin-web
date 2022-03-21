<template>
  <div class="statics-layout status-layout" v-loading="loading">
    <div class="statics-title">使用效率</div>
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
        options: {}
      }
    },
    components: {},
    async mounted() {
      this.loadData()
      //this.changeTimeType();
    },
    methods: {
      async loadData() {
        const params = {}
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
          color: ['#e56531', '#a6d9e7'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['报装', '激活']
          },
          grid: {
            left: '10',
            right: '10',
            top: '50',
            bottom: '10',
            containLabel: true
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: parseInt(Math.random()*1000), name: '报装' },
                { value: parseInt(Math.random()*1000), name: '激活' }
              ]
            }
          ]
        }
      },
      changeTimeType() {
        const startTime = new Date()
        const endTime = new Date()
        endTime.setDate(endTime.getDate() - 1)
        switch (this.timeType) {
          case 1:
            startTime.setDate(startTime.getDate() - 1)
            break
          case 2:
            startTime.setDate(startTime.getDate() - 7)
            break
          case 3:
            startTime.setDate(startTime.getDate() - 30)
            break
        }
        this.showTimes = [timeFormat.fetch(startTime.getTime(), '{YYYY}年{MM}月{DD}日'), timeFormat.fetch(endTime.getTime(), '{YYYY}年{MM}月{DD}日')]
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  .status-layout {
    .chart-wrap {
      margin-left: auto;
      margin-right: auto;
      width: 70%;
    }
  }
</style>
