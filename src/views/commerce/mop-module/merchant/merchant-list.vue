<template>
  <div class="main-content" style="padding-top:0px;padding-bottom:0px">
    <el-tabs v-model="queryType" type="card" @tab-click="handleClick" style="padding-top:0">
      <el-tab-pane label="商户管理" name="1" :disabled="disabled"></el-tab-pane>
      <el-tab-pane label="商户审核" name="2" :disabled="disabled"></el-tab-pane>
    </el-tabs>
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.name"
            placeholder="请输入商户名称..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.code"
            placeholder="请输入商户编码..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询</el-button>
          <el-button type="default" icon="el-icon-circle-plus-outline" size="mini" @click="add">新增</el-button>
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
      <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
      <el-table-column prop="name" label="商户名称" width="150px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="code" label="商户编码" width="90px"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" width="150px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="businessCertificatesNo" label="营业执照编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="companyOwner" label="联系人" width="100px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="companyPhone" label="联系电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createdTime" label="申请时间" width="150px"></el-table-column>
      <el-table-column v-if="queryType==2" label="审核状态" width="100px" min-width="80px" align="center" :formatter="formatAuditState"></el-table-column>
      <el-table-column prop="delFlag" v-if="queryType==1" label="启用状态" width="80px" align="center">
        <template v-if="queryType==1" slot-scope="scope">
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
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-button v-if="queryType==2" size="mini" @click="audit(scope.row)">审核</el-button>
          <el-button size="mini" @click="forward2DetailsPage(scope.row)">详情</el-button>
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
    <edit-template ref="addtemplate"></edit-template>
    <audit-template ref="audittemplate"></audit-template>
  </div>
</template>
<script>
import { fetch, post } from '@/utils/http-client'
import EditTemplate from "./merchant-template";
import AuditTemplate from "./merchant-audit";

export default {
  name: '',
  data() {
    return {
      pageNo: 1,
      pageSize: 15,
      dataList: [],
      totalCount: 20,
      loading: false,
      queryType:'1',
      orderStatusOptions:[{name:'待支付',code:'10'},{name:'待发货',code:'20'},{name:'待收货',code:'30'},{name:'待评价',code:'50'},{name:'交易完成',code:'40'},{name:'已取消',code:'90'}],
      searchParams: {},
      dialogList: [],
      showDialog: false
    }
  },
  components: {
    EditTemplate,
    AuditTemplate
  },
  async mounted() {
    this.loadData()
  },
  methods: {
    formatAuditState: function (row, column) {
        return row.auditState === -1 ? '待提交申请' : row.auditState === 0 ? '待审核' : row.auditState === 1 ? '审核通过' : row.auditState === -2 ? '审核未通过' : '--'
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
    handleClick(tab, event) {
      this.dataList = []
      this.pageNo = 1
      this.searchParams = {}
      this.loadData();
    },
    add() {
      this.$refs.addtemplate.show(true);
    },
    audit(data) {
      this.$refs.audittemplate.show(true,data);
    },
    async resetting(row) {
          const result = await post('/oss/mop/merchant/resetting',row);
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
      const result = await post('/oss/mop/merchant/listByPageNo', params)
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
