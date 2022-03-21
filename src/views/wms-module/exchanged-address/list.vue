<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-select v-model="searchParams.supplierId" collapse-tags filterable clearable style="width:100%" placeholder="请选择商家...">
            <el-option
              v-for="item in supplierOptions"
              :key="item.id"
              :label="item.supplierName"
              :value="item.id"
            ></el-option>
            </el-select>
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
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="address" label="商家退货地址" :formatter="formatReceiveAddress" show-overflow-tooltip></el-table-column>
      <el-table-column prop="exchangedName" label="收货人" width="120px"></el-table-column>
      <el-table-column prop="exchangedPhone" label="联系电话" width="120px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="supplierId" label="所属商家" width="80px" align="center"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="150px" align="center"></el-table-column>
      <el-table-column prop="updatedTime" label="修改时间" width="150px" align="center"></el-table-column>
      <el-table-column prop="" label="操作" align="center" width="100px">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="mini" @click="edit(scope.row)">编辑</el-button>
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
import EditTemplate from "./template";

export default {
  name: '',
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      dataList: [],
      supplierOptions:[],
      totalCount: 20,
      loading: false,
      searchParams: {},
      dialogList: [],
      showDialog: false
    }
  },
  components: {
    EditTemplate,
  },
  async mounted() {
    this.loadSupplierOptions()
    this.loadData()
  },
  methods: {

    async loadSupplierOptions() {
      const result = await fetch("/srm/supplier/listByPageNo?pageNum=1&pageSize=1000", {});
      if (result.code == 200) {
        this.supplierOptions = result.data.list;
      } else {
        this.$message.error(result.msg);
      }
    },

    formatReceiveAddress: function(row, column) {
      return row.provinceName + row.cityName + row.areaName + row.address
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

    add(){
      this.$refs.template.show(true)
    },

    edit(row){
      this.$refs.template.show(true,row)
    },

    async loadData() {
      this.loading = true
      const params = {
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        queryObject:this.searchParams
      }
      const result = await post('/wms/aftersale/exchangedaddress/listByPageNo', params)
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
</style>
