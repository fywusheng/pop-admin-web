<template>
  <div class="main-content">
  <el-page-header @back="back2Prev" content="数据字典明细"></el-page-header>
  <el-row style="height:30px"><el-col :span="24"></el-col></el-row>
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.name"
            placeholder="请输入数据参数名..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.code"
            placeholder="请输入数据参数值..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询</el-button>
          <el-button type="default" icon="el-icon-circle-plus-outline" @click="add" size="mini">新增</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      class="custom-table"
      :data="dataList"
      size="mini"
      v-loading="loading"
      @expand-change="loadSubOption"
    >
      <div slot="empty" class="empty-wrap">
        <i class="iconfont icon-tishi"></i><span>暂无数据</span>
      </div>

      <el-table-column type="index" label="序号" align="center" width="60px"> </el-table-column>
      <el-table-column prop="id" label="数据参数ID" align="center" width="100px"> </el-table-column>
      <el-table-column prop="label" label="数据参数名"> </el-table-column>
      <el-table-column prop="value" label="数据参数值"></el-table-column>
      <el-table-column label="所属数据类型" align="center"> 
        <template>
            {{ searchParams.typeName }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedTime" label="更新时间" align="center" width="150px"></el-table-column>
      <el-table-column prop="delFlag" label="状态" align="center" width="100px">
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
      <el-table-column prop="" label="操作" align="center" width="240px">
        <template slot-scope="scope">
          <el-link icon="el-icon-edit-outline" :underline="false"
            >编辑&nbsp;</el-link
          >
          <el-link
            icon="el-icon-delete"
            :underline="false"
            @click="del(scope.row)"
            >删除&nbsp;</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <item-template ref="itemTemplate"></item-template>
  </div>
</template>
<script>
import { fetch, post } from "@/utils/http-client";
import ItemTemplate from "./item-template";

export default {
  name: "",
  data() {
    return {
      dataList: [],
      loading: false,
      searchParams: {
        typeName:this.$route.query.name,
        typeCode:this.$route.query.code
      },
      dialogList: [],
      showDialog: false
    };
  },
  components: {
    ItemTemplate
  },
  async mounted() {
    this.loadData();
  },

  methods: {
    back2Prev(){
      this.$router.back();
    },
    async loadData() {
      this.loading = true;
      const result = await fetch("/dict/getDictItemByTypeCode", this.searchParams);
      this.loading = false;
      if (result.code == 200) {
        this.$nextTick(() => {
          this.dataList = result.data;
        });
      } else {
        this.$message.error(result.msg);
      }
    },
    add() {
      this.$refs.itemTemplate.show(true,this.searchParams);
    },
    edit(row) {
      this.$refs.itemTemplate.show(true, row);
    },
    del(row) {
      this.$confirm("确定要删除该数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await post("/dict/deleteDictItem", { id: row.id });
          if (result.code == 200) {
            this.$message.success("删除成功!");
            this.loadData();
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(() => {});
    }
  },
};
</script>
<style lang="scss" rel="stylesheet/scss">
</style>