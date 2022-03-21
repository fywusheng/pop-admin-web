<template>
  <div class="statics-layout production-layout" v-loading="loading">
    <div class="statics-title">设备统计</div>
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
    <el-row :gutter="50">
      <el-col :span="12">
        <chart class="chart-wrap" :options="options"></chart>
      </el-col>
      <el-col :span="12">
        <chart class="chart-wrap" :options="options2"></chart>
      </el-col>
    </el-row>
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
        options2: {},
        productNumList: [],
      }
    },
    components: {},
    async mounted() {
        this.loadData();
      //this.changeTimeType();
    },
    methods: {
      getMark(mark){
        //0.清晨8-12点，1.中午12-17点，2.晚上17-23点，3.凌晨23-4点，4.清晨4-8点
        switch (parseInt(mark || 0)) {
          case 0:
            return '清晨8-12点'
          case 1:
            return '中午12-17点'
          case 2:
            return '晚上17-23点'
          case 3:
            return '凌晨23-4点'
          case 4:
            return '清晨4-8点'
        }
      },
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

          this.options2 = {
            color: ['#a4cb9d'],
            title: {
              text:'报装统计',
              bottom: '0',
              x: 'center',
            },
            tooltip : {
              trigger: 'axis'
            },
            grid: {
              left: '10',
              right: '10',
              top: '50',
              bottom: '50',
              containLabel: true
            },
            legend: {
              data:['报装']
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                data: ['04-01','04-02','04-03','04-04','04-05','04-06','04-07']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'报装',
                type:'bar',
                data: [100,50,105,88, 99,108, 70],
              }
            ]
          };
          this.options = {
            color: ['#ed7299'],
            title: {
              text:'生产统计',
              bottom: '0',
              x: 'center',
            },
            tooltip : {
              trigger: 'axis'
            },
            grid: {
              left: '10',
              right: '10',
              top: '50',
              bottom: '50',
              containLabel: true
            },
            legend: {
              data:['生产']
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                data: ['04-01','04-02','04-03','04-04','04-05','04-06','04-07']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'生产',
                type:'bar',
                data: [100,50,105,88, 99,108, 70],
              }
            ]
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
