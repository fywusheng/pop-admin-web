<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.loginName"
            placeholder="请输入用户登陆账号..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.id"
            placeholder="请输入用户ID..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.phone"
            placeholder="请输入手机号码..."
            clearable
            size="mini"
          ></el-input>
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
      <el-table-column type="index" label="序号" align="center" width="60px"> </el-table-column>
      <el-table-column prop="nickName" label="会员名称"> </el-table-column>
      <el-table-column prop="id" label="会员ID"> </el-table-column>
      <el-table-column prop="loginName" label="登陆账号" align="center" width="150px"></el-table-column>
      <el-table-column prop="userCode" label="会员编码" align="center"> </el-table-column>
      <el-table-column prop="level" label="会员等级" align="center" width="80px"></el-table-column>
      <el-table-column prop="phone" label="手机号码" align="center" width="100px">
      </el-table-column>
      <el-table-column prop="createdTime" label="注册时间" align="center" width="150px">
      </el-table-column>
      <el-table-column prop="updatedTime" label="修改时间" align="center" width="150px">
      </el-table-column>
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
      <el-table-column prop="" label="操作" align="center" width="80px">
        <template slot-scope="scope">
          <el-link
            icon="el-icon-document"
            :underline="false"
            @click="forward2ProfilePage(scope.row)"
            >详情</el-link>
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
import { fetch, post } from "@/utils/http-client";

export default {
  name: "",
  data() {
    return {
      pageNo: 1,
      pageSize: 15,
      dataList: [],
      totalCount: 20,
      loading: false,
      searchParams: {},
      dialogList: [],
      showDialog: false,
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    changePage(pageNo) {
      this.pageNo = pageNo;
      this.loadData();
    },
    changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      this.loadData();
    },
    async loadData() {
      this.loading = true;
      const params = {
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        queryObject:this.searchParams
      };
      const result = await post('/member/list',params);
      this.loading = false;
      if (result.code == 200) {
        this.$nextTick(() => {
          this.dataList = result.data.list;
          this.totalCount = result.data.totalCount * 1;
          //this.pageSize = result.data.limit;
        });
      } else {
        this.$message.error(result.msg);
      }
    },
    async resetting(row) {
          const result = await post('/member/resetting',row);
          if (result.code == 200) {
            this.$message.success("重置启用状态成功!");
            this.loadData();
          } else {
            this.$message.error(result.msg);
          }
    },
    forward2ProfilePage(row){
      this.$router.push({name:'ProfileDetail',params: { id: row.id }})
    }
  },
};
</script>
<style lang="scss" rel="stylesheet/scss">
</style>