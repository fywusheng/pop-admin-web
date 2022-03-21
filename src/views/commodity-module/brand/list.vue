<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.name"
            placeholder="请输入品牌名称（中/英）..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="">
          <el-input
            v-model="searchParams.code"
            placeholder="请输入品牌编码..."
            clearable
            size="small"
          ></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查 询</el-button>
          <el-button type="default" icon="el-icon-circle-plus-outline" @click="add" size="mini">新 增</el-button>
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
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="brandLogo" label="LOGO" width="100px"> 
    　　<template slot-scope="scope">
          <el-image :src="scope.row.brandLogo" style="height:28px;width:28px" fit="scale-down"></el-image>
    　　</template>
      </el-table-column>
      <el-table-column prop="name" label="中文名称" width="200px"> </el-table-column>
      <el-table-column prop="nameEn" label="英文名称" width="200px"> </el-table-column>
      <el-table-column prop="description" label="描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" align="center" width="150px">
      </el-table-column>
      <el-table-column prop="updatedTime" label="修改时间" align="center" width="150px">
      </el-table-column>
      <el-table-column prop="delFlag" label="启用状态" width="80px" align="center">
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
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-link icon="el-icon-edit" 
          :underline="false"
          style="font-size:13px"
          @click="edit(scope.row)"
            >编辑&nbsp;&nbsp;</el-link
          >
          <el-link icon="el-icon-delete"
          :underline="false"
          style="font-size:13px"
          @click="del(scope.row)"
            >删除&nbsp;&nbsp;</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="totalSize > 10"
      :page-size="pageSize"
      @size-change="changeSize"
      @current-change="changePage"
      layout="total, slot, jumper, prev, pager, next"
      :total="totalSize"
    >
    </el-pagination>
    <edit-template ref="template"></edit-template>
  </div>
</template>
<script>
import { fetch, post } from "@/utils/http-client";
import EditTemplate from "./template";
import Template from './template.vue';

export default {
  name: "",
  data() {
    return {
      page: 1,
      pageSize: 15,
      dataList: [],
      totalSize: 20,
      loading: false,
      searchParams: {},
      dialogList: [],
      showDialog: false
    };
  },
  components: {
    EditTemplate
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    changePage(pageNo) {
      this.page = pageNo;
      this.loadData();
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.page = 1;
      this.loadData();
    },
    async loadData() {
      this.loading = true;
      const params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        queryObject: this.searchParams
      };
      const result = await post('/brand/listByPageNo',params);
      this.loading = false;
      if (result.code == 200) {
        this.$nextTick(() => {
          this.dataList = result.data.list;
          this.totalSize = result.data.totalCount * 1;
        });
      } else {
        this.$message.error(result.msg);
      }
    },
    add() {
      this.$refs.template.show(true);
    },
    edit(row) {
      this.$refs.template.show(true, row);
    },
    async resetting(row) {
          const result = await post('/brand/resetting',row);
          if (result.code == 200) {
            this.$message.success("品牌启用状态重置成功!");
            this.loadData();
          } else {
            this.$message.error(result.msg);
          }
    },
    async del(row) {
          const result = await post('/brand/delete',row);
          if (result.code == 200) {
            this.$message.success("品牌删除成功!");
            this.loadData();
          } else {
            this.$message.error(result.msg);
          }
    },
    forward2AuthorizationPage(row){
      this.$router.push({name:'Authorization2Role',params: { id: row.id }})
    }
  },
};
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
