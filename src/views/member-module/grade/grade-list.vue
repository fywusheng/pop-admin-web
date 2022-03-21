<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询(Q)</el-button>
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
      <el-table-column prop="gradeName" label="会员等级" align="center" width="100px"> </el-table-column>
      <el-table-column prop="gradeCode" label="等级编码" align="center" width="100px"></el-table-column>
      <el-table-column prop="versions" label="版本号" align="center" width="80px"></el-table-column>
      <el-table-column prop="thresholdValue" label="升级阈值" width="150px"></el-table-column>
      <el-table-column prop="gradeRights" label="等级权益" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" align="center" width="150px"></el-table-column>
      <el-table-column prop="" label="操作" align="center" width="120px">
        <template slot-scope="scope">
            <el-link icon="el-icon-edit" 
            :underline="false"
            style="font-size:13px"
            @click="edit(scope.row)"
            >编辑&nbsp;&nbsp;</el-link>
        </template>
      </el-table-column>
    </el-table>
    <edit-template ref="template"></edit-template>
  </div>
</template>
<script>
import { fetch, post } from "@/utils/http-client";
import EditTemplate from "./grade-template";

export default {
  name: "",
  data() {
    return {
      dataList: [],
      loading: false,
      searchParams: {},
      dialogList: [],
      showDialog: false,
    };
  },
  components: {
    EditTemplate,
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const params = {};
      const result = await post('/member/grade/list',params);
      this.loading = false;
      if (result.code == 200) {
        this.$nextTick(() => {
          this.dataList = result.data.list;
        });
      } else {
        this.$message.error(result.msg);
      }
    },

    edit(row){
        this.$refs.template.show(true, row);
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
</style>