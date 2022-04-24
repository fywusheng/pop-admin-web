<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.orderCode"
            placeholder="请输入订单编号..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.userMobile"
            placeholder="请输入会员手机号码..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchParams.orderStatus" collapse-tags filterable style="width:100%" size="mini" placeholder="请选择订单状态...">
            <el-option
              v-for="item in orderStatusOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      class="custom-table"
      :data="dataList"
      :header-cell-style="{background:'#F2F6FC',color:'#000000'}"
      size="mini"
      v-loading="loading"
    >
      <div slot="empty" class="empty-wrap">
        <i class="iconfont icon-tishi"></i><span>系统暂无数据</span>
      </div>
      <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
      <el-table-column type="expand" width="20px" align="center">
        <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单备注">
              <span>{{ props.row.receiveRemark? props.row.receiveRemark:'--'}}</span>
            </el-form-item>
        </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="orderId" label="订单编号" width="160px" align="center"></el-table-column>
      <el-table-column prop="receiveName" label="收货人" width="120px"></el-table-column>
      <el-table-column prop="receivePhone" label="联系电话" width="120px" align="center"></el-table-column>
      <el-table-column prop="orderStatusLabel" label="收货地址" :formatter="formatReceiveAddress" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="100px"></el-table-column>
      <el-table-column prop="orderStatusLabel" label="订单状态" width="100px" align="center"></el-table-column>
      <el-table-column prop="createdTime" label="下单时间" width="150px" align="center"></el-table-column>
      <el-table-column prop="" label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-button icon="el-icon-position" size="mini" @click="delivery(scope.row)">商家发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-show="totalCount > 10"
      @size-change="changeSize"
      @current-change="changePage"
      :page-size="pageSize"
      layout="total, slot, jumper, prev, pager, next"
      :total="totalCount"
    >
    </el-pagination>
    <edit-template ref="template"></edit-template>
  </div>
</template>
<script>
import { fetch, post } from '@/utils/http-client'
import EditTemplate from "./express-delivery";

export default {
  name: '',
  data() {
    return {
      pageNo: 1,
      pageSize: 15,
      dataList: [],
      totalCount: 20,
      loading: false,
      orderStatusOptions:[{name:'待发货',code:'20'},{name:'待收货',code:'30'},{name:'待评价',code:'50'},{name:'交易完成',code:'40'}],
      searchParams: {
          orderStatus: '20'
      },
      dialogList: [],
      showDialog: false
    }
  },
  components: {
    EditTemplate,
  },
  async mounted() {
    this.loadData()
  },
  methods: {
    formatReceiveAddress: function(row, column) {
      return row.receiveProvinceName + row.receiveCityName + row.receiveAreaName + row.receiveAddress
    },
    changePage(pageNo) {
      this.pageNo = pageNo
      this.loadData()
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.pageNo = 1
      this.loadData()
    },
    delivery(order) {
      this.$refs.template.show(true,order);
    },
    async loadData() {
      this.loading = true
      const params = {
        pageNum: this.pageNo,
        pageSize: this.pageSize
      }
      Object.keys(this.searchParams).forEach((key) => {
        params[key] = this.searchParams[key]//{queryObject:JSON.stringify(this.searchParams[key])}
      })
      const result = await fetch('/wms/order/listByPageNo', params)
      this.loading = false
      if (result.code == 200) {
        this.$nextTick(() => {
          this.dataList = result.data.list
          this.totalCount = result.data.totalCount * 1
        })
      } else {
        this.$message.error(result.msg)
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
