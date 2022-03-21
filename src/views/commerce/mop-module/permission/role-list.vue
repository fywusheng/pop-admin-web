<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.name"
            placeholder="请输入角色名称..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询</el-button>
          <el-button type="default" icon="el-icon-circle-plus-outline" @click="add" size="mini">新增</el-button>
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
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="description" label="描述" width="250px">
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="150px">
      </el-table-column>
      <el-table-column prop="updatedTime" label="修改时间" width="150px">
      </el-table-column>
      <el-table-column prop="delFlag" label="启用状态" align="center" width="80px">
        <template slot-scope="scope">
            <el-switch
                v-model="scope.row.delFlag"
                active-color="#67C23A"
                :active-value="0"
                inactive-color="#909399"
                :inactive-value="1"
              >
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" align="center" width="280px">
        <template slot-scope="scope">
          <el-link
            icon="el-icon-view"
            :underline="false"
            @click="forward2AuthorizationPage(scope.row)"
            >授权&nbsp;&nbsp;</el-link
          >
          <el-link icon="el-icon-edit" :underline="false" @click="edit(scope.row)"
            >编辑&nbsp;&nbsp;</el-link
          >
          <el-link icon="el-icon-delete"
          :underline="false"
          @click="del(scope.row)"
            >删除&nbsp;&nbsp;</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-show="totalSize > 10"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      @size-change="changeSize"
      @current-change="changePage"
      layout="total, sizes, slot, jumper, prev, pager, next"
      :total="totalSize"
    >
    </el-pagination>
    <edit-template ref="template"></edit-template>
  </div>
</template>
<script>
import { fetch, post } from "@/utils/http-client";
import EditTemplate from "./role-template";

export default {
  name: "",
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      dataList: [],
      totalSize: 10,
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
        queryObject: this.searchParams
      };
      const result = await post('/oss/mop/permission/listRoleByPageNo',params);
      this.loading = false;
      if (result.code == 200) {
        this.$nextTick(() => {
          this.dataList = result.data.list;
          this.totalSize = result.data.totalCount * 1;
          this.pageSize = result.data.pageSize;
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
    del(row) {
      this.$confirm("确定要删除该角色信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await post('/oss/mop/permission/deleteRole',{ id: row.id });
          if (result.code == 200) {
            this.$message.success("删除成功!");
            this.loadData();
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(() => {});
    },

    forward2AuthorizationPage(row){
      this.$router.push({name:'Authorization2MOPRole',params: { id: row.id }})
    }
  },
};
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
