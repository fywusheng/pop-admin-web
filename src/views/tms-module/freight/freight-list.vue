<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.tempName"
            placeholder="请输入模板名称..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.tempCode"
            placeholder="请输入模板编码..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="searchParams.supplierId">
          <el-select v-model="searchParams.supplierId" collapse-tags filterable style="width:100%" size="mini" placeholder="请选择所属商家...">
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
          <!-- <el-button type="default" icon="el-icon-circle-plus-outline" size="mini" @click="add">新增(A)</el-button> -->
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
      <el-table-column prop="tempName" label="模板名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="tempCode" label="模板编码" width="150px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="supplierId" label="所属商家" width="150px" align="center"></el-table-column>
      <el-table-column prop="type" label="计价方式" width="100px" align="center" :formatter="formatType"></el-table-column>
      <el-table-column prop="isPostage" label="是否包邮" width="100px" align="center" :formatter="formatPostage"></el-table-column>
      <el-table-column prop="updatedTime" label="操作时间" width="150px" align="center"></el-table-column>
      <el-table-column prop="modifier" label="操作人" width="80px" align="center"></el-table-column>
      <el-table-column prop="delFlag" label="启用状态" align="center" width="80px">
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
      <el-table-column prop="" label="操作" align="center" width="120px" fixed="right">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="mini" @click="edit(scope.row)">修改</el-button>
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
import EditTemplate from "./freight-template";

export default {
  name: '',
  data() {
    return {
      pageNo: 1,
      pageSize: 15,
      dataList: [],
      totalCount: 20,
      loading: false,
      searchParams: {},
      dialogList: [],
      supplierOptions:[],
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
    changePage(pageNo) {
      this.pageNo = pageNo
      this.loadData()
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.pageNo = 1
      this.loadData()
    },
    
    formatType: function (row, column) {
        return row.type === 1 ? '计件' : row.type === 2 ? '重量' : row.type === 3 ? '体积' : '--'
    },
    formatPostage: function (row, column) {
        return row.isPostage === 1 ? '包邮' : row.isPostage === 0 ? '不包邮' : '--'
    },

    add() {
      this.$refs.template.show(true);
    },
    edit(row) {
      this.$router.push({ name: 'Freight-Modify-Template', params: { id: row.id } })
      //this.$refs.template.show(true,row);
    },
    async resetting(row) {
      const result = await post('/tms/freight-template/resetting',row);
      if (result.code == 200) {
        this.$message.success("运费模板启用状态重置成功!");
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
        queryObject: this.searchParams
      }
      const result = await post('/tms/freight-template/listPageNo', params)
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
