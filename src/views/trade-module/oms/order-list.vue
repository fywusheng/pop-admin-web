<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.orderId"
            placeholder="请输入订单编号..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.userLoginName"
            placeholder="请输入会员账号..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchParams.orderStatus" size="mini" clearable collapse-tags filterable style="width:100%" placeholder="请选择订单状态...">
            <el-option
              v-for="item in orderStatusOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查 询</el-button>
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
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="orderId" label="订单编号" width="160px" align="center"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="70px" align="center"></el-table-column>
      <el-table-column prop="payableAmount" label="应付金额" width="70px" align="center"></el-table-column>
      <el-table-column prop="paidAmount" label="实付金额" width="70px" align="center"></el-table-column>
      <el-table-column prop="orderStatusLabel" label="订单状态" align="center" width="80px"></el-table-column>
      <el-table-column prop="paymentMethod" label="支付方式" align="center" width="80px" :formatter="formatPaymentMethod"></el-table-column>
      <el-table-column prop="userName" label="下单人" align="center" width="100px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="userLoginName" label="下单账号" align="center" width="120px"></el-table-column>
      <el-table-column prop="userName" label="收货地址" :formatter="formatReceiveAddress" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createdTime" label="下单时间" align="center" width="150px"></el-table-column>
      <el-table-column prop="" label="操作" align="center" width="120px">
        <template slot-scope="scope">
          <el-button type="default" icon="el-icon-document" size="mini" @click="forward2DetailsPage(scope.row)">详情</el-button>
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
  </div>
</template>
<script>
import { fetch, post } from '@/utils/http-client'

export default {
  name: '',
  data() {
    return {
      pageNo: 1,
      pageSize: 15,
      dataList: [],
      totalCount: 20,
      loading: false,
      orderStatusOptions:[{name:'待支付',code:'10'},{name:'待发货',code:'20'},{name:'待收货',code:'30'},{name:'待评价',code:'50'},{name:'交易完成',code:'40'},{name:'已取消',code:'90'}],
      searchParams: {},
      dialogList: [],
      showDialog: false
    }
  },
  async mounted() {
    this.loadData()
  },
  methods: {
    formatPaymentMethod: function (row, column) {
          return row.paymentMethod === 'alipayMobile' ? '支付宝' : row.paymentMethod === 'wechatMobile' ? '微信支付' : row.paymentMethod === 'cash_pay' ? '余额支付' : '--'
    },
    formatReceiveAddress: function (row, column) {
          return row.receiveCityName + row.receiveAreaName + row.receiveAddress
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
    async loadData() {
      this.loading = true
      const params = {
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        queryObject: this.searchParams
      }
      const result = await post('/order/listByPageNo', params)
      this.loading = false
      if (result.code == 200) {
        this.$nextTick(() => {
          this.dataList = result.data.list
          this.totalCount = result.data.totalCount * 1
          //this.pageSize = result.data.limit;
        })
      } else {
        this.$message.error(result.msg)
      }
    },
    forward2DetailsPage(row) {
      this.$router.push({ name: 'Order-Detail', params: { orderCode: row.orderId } })
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
