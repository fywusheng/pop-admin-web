<template>
  <div class="statics-layout" v-loading="loading">
    <div class="statics-title">地区分布</div>
    <div class="condition-list">
      <!--<div class="condition">-->
      <!--<el-select size="small" v-model="searchParam.type" placeholder="请选择">-->
      <!--<el-option label="活跃用户数" :value="1"></el-option>-->
      <!--<el-option label="新增用户数" :value="2"></el-option>-->
      <!--</el-select>-->
      <!--</div>-->
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
        <chart class="chart-wrap" ref="areaMap" :options="areaOptions"></chart>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="dataList">
          <el-table-column
            prop="name"
            label="省份"
            align="center"
            width="140px">
          </el-table-column>
          <el-table-column
            prop="value"
            label="设备数"
            align="center"
            width="160px">
          </el-table-column>
          <el-table-column
            label="">
            <template slot-scope="scope">
              <div class="progress">
                <div class="progress-bar" :style="{width:scope.row.rate}"></div>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
        areaOptions: {},
        dataList: []
      }
    },
    components: {},
    async mounted() {
      //this.changeTimeType();
      this.loadData()
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
        const list = [{ name: '广东', value: parseInt(Math.random()*1000) }, { name: '湖南', value: parseInt(Math.random()*1000) }, {
          name: '湖北',
          value: parseInt(Math.random()*1000)
        }, { name: '北京', value: parseInt(Math.random()*1000) },{ name: '上海', value: parseInt(Math.random()*1000) },{ name: '天津', value: parseInt(Math.random()*1000) }]
        this.areaOptions = {
          backgroundColor: '#FFFFFF',
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            min: 0,
            max: 1000,
            orient: 'horizontal',
            text: ['', ''],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#adcdef', '#629fe0']
            }
          },
          //配置属性
          series: [{
            name: '设备数:',
            type: 'map',
            map: 'china',
            roam: true,
            label: {
              normal: {
                show: false  //省份名称
              },
              emphasis: {
                show: false
              }
            },
            data: list  //数据
          }]
        }
        const dataList = _.cloneDeep(list)
        dataList.sort((a, b) => {
          return b.value - a.value
        })
        let totalCount = 0
        dataList.forEach(data => {
          totalCount += data.value
        })
        dataList.forEach(data => {
          data.rate = data.value / totalCount * 100 + '%'
        })
        this.dataList = _.cloneDeep(dataList).splice(0, 10)
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

  .progress {
    width: 90%;

    .progress-bar {
      height: 15px;
      background-color: #1aad19;
    }
  }
</style>
