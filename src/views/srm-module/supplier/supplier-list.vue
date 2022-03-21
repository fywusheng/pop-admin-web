<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.name"
            placeholder="请输入商家名称..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.code"
            placeholder="请输入商家编码..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询</el-button>
          <el-button type="default" icon="el-icon-circle-plus-outline" size="mini" @click="add">新增</el-button>
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
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="supplierName" label="商家名称" width="150px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="supplierCode" label="商家编码" width="100px"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" width="200px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="businessCertificatesNo" label="营业执照" show-overflow-tooltip></el-table-column>
      <el-table-column prop="companyOwner" label="联系人" width="150px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="companyPhone" label="联系电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="applyTime" label="申请时间" width="150px"></el-table-column>
      <el-table-column prop="status" label="商家状态" width="100px" :formatter="formatSupplierStatus"></el-table-column>
      <!-- <el-table-column prop="" label="操作" align="center" width="100px" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="forward2DetailsPage(scope.row)">详情</el-button>
        </template>
      </el-table-column> -->
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
import EditTemplate from "./supplier-template";

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
  components: {
    EditTemplate,
  },
  async mounted() {
    this.loadData()
  },
  methods: {
    formatSupplierStatus: function (row, column) {
          return row.status === 1 ? '已注册待提交' : row.status === 2 ? '待审核' : row.status === 3 ? '审核通过' : row.status === 4 ? '审核未通过' : row.status === 5 ? '已禁用' : row.status === 6 ? '已删除' : '--'
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
    
    add() {
      this.$refs.template.show(true);
    },

    async loadData() {
      this.loading = true
      const params = {
        pageNum: this.pageNo,
        pageSize: this.pageSize
      }
      Object.keys(this.searchParams).forEach((key) => {
        params[key] = this.searchParams[key]
      })
      const result = await fetch('/srm/supplier/listByPageNo', params)
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
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
