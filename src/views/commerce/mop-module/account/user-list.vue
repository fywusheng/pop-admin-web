<template>
  <div class="main-content" style="padding-top:0px;padding-bottom:0px">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.accountCode"
            placeholder="请输入账号名称..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="searchParams.merchantId" size="mini" collapse-tags filterable clearable placeholder="请选择所属商户...">
            <el-option
              v-for="item in merchantListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
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
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="accountCode" label="登录账号" width="150px"></el-table-column>
      <el-table-column prop="merchantId" label="所属商户" show-overflow-tooltip></el-table-column>
      <el-table-column prop="isPrimary" label="是否主账号" :formatter="formatIsPrimary" width="100px" align="center"></el-table-column>
      <el-table-column prop="createdTime" label="申请时间" width="150px" align="center"></el-table-column>
      <el-table-column prop="updatedTime" label="修改时间" width="150px" align="center"></el-table-column>
      <el-table-column prop="delFlag" label="启用状态" width="100px" align="center">
      <template slot-scope="scope">
        <el-switch
            v-model="scope.row.delFlag"
            active-color="#67C23A"
            :active-value="0"
            inactive-color="#909399"
            :inactive-value="1"
            @change="resetting(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-link
            icon="el-icon-view"
            :underline="false"
            @click="authorization(scope.row)"
            >授权&nbsp;&nbsp;</el-link
          >
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
    <authorization-template ref="authorizationTemplate"></authorization-template>
  </div>
</template>
<script>
import { fetch, post } from '@/utils/http-client'
import AuthorizationTemplate from "./user-authorization";

export default {
  name: '',
  data() {
    return {
      pageNo: 1,
      pageSize: 15,
      dataList: [],
      totalCount: 20,
      loading: false,
      merchantListOptions:[],
      orderStatusOptions:[{name:'待支付',code:'10'},{name:'待发货',code:'20'},{name:'待收货',code:'30'},{name:'待评价',code:'50'},{name:'交易完成',code:'40'},{name:'已取消',code:'90'}],
      searchParams: {}
    }
  },
  components: {
    AuthorizationTemplate,
  },
  async mounted() {
    this.loadData()
  },
  methods: {
    formatIsPrimary: function (row, column) {
        return row.isPrimary === 1 ? '是' : row.isPrimary === 0 ? '否' : '--'
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
    authorization(data) {
      this.$refs.authorizationTemplate.show(true,data);
    },
    async resetting(row) {
          const result = await post('/oss/mop/user/resetting',row);
          if (result.code == 200) {
            this.$message.success("商户启用状态重置成功!");
            this.loadData();
          } else {
            this.$message.error(result.msg);
          }
    },
    async loadData() {
      this.loading = true
      const params = {
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        queryType: this.queryType
      }
      const result = await post('/oss/mop/user/listByPageNo', params)
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
