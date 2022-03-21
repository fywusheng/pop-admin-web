<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.name"
            placeholder="请输入订单编号..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.code"
            placeholder="请输入会员手机号码..."
            clearable
            size="mini"
          ></el-input>
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
      <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
      <el-table-column type="expand" width="20px" align="center">
        <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="售后编号">
            <span>{{ props.row.returnId? props.row.returnId:'--'}}</span>
          </el-form-item>
          <el-form-item label="退款方式">
            <span>{{ props.row.payTypeStr}}</span>
          </el-form-item>
          <el-form-item label="退款流水">
            <span>{{ props.row.refundPayNum}}</span>
          </el-form-item>
        </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="退款单号" width="80px" align="center"></el-table-column>
      <el-table-column prop="userLoginName" label="退款人" width="100px" align="center"></el-table-column>
      <el-table-column prop="refundTypeStr" label="退款类型" width="120px" align="center"></el-table-column>
      <el-table-column prop="orderId" label="订单编号" width="180px"></el-table-column>
      <el-table-column prop="refundTotalPrice" label="退款金额"></el-table-column>
      <el-table-column prop="statusStr" label="退款状态" align="center"></el-table-column>
      <el-table-column prop="createdTime" label="提交时间" width="150px" align="center"></el-table-column>
      <el-table-column prop="finishTime" label="退款时间" width="150px" align="center"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" :disabled="Number(scope.row.refundStatus)!=0" @click="appoveRefund(scope.row)">手动退款</el-button>
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
        queryObject:this.searchParams
      }
      const result = await post('/aftersale/refund/listByPageNo', params)
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
    async appoveRefund(row) {
      const result = await post('/aftersale/refund/exe', row)
      if (result.code == 200) {
        this.$message.success("退款申请手动操作成功！")
        this.changePage(1)
      } 
      else {
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
