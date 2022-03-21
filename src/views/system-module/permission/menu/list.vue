<template>
<div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
      <el-form-item label="应用系统/业务线" prop="appBizCode" class="item">
        <el-cascader v-model="searchParams.appBizCode" :options="bizOptions" :props="bizOptionProps" placeholder="请选择所属应用系统/业务线..." style="width:450px"></el-cascader>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询</el-button>
          <el-button type="default" icon="el-icon-circle-plus-outline" @click="add(0)" size="mini">新增一级菜单</el-button>
      </el-form-item>
      </el-form>
    </el-row>
  <el-table
    :data="tableData"
    :header-cell-style="{background:'#F2F6FC',color:'#000000'}"
    size="mini"
    row-key="id"
    :highlight-current-row="false"
    v-loading="loading"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      label=""
      type=""
      width="20px">
    </el-table-column>
    <el-table-column
      prop="name"
      label="菜单名称">
    </el-table-column>
    <el-table-column
      prop="bizCode"
      label="所属业务"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="displaySort"
      label="排序"
      width="80px">
    </el-table-column>
    <el-table-column
      prop="modifier"
      label="操作人"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="updatedTime"
      label="操作时间"
      width="150px">
    </el-table-column>
    <el-table-column prop="" label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="add(1,scope.row)">添加子菜单</el-button>
          <el-button size="mini" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" @click="del(scope.row)" v-show="scope.row.sysUserId != 1">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <edit-template ref="template"></edit-template>
</div>
</template>
<script>
  import {fetch,post} from '@/utils/http-client'
  import EditTemplate from './menu-template'

  export default {
    data(){
        return {
          bizOptionProps: {
            checkStrictly: true,
            expandTrigger: 'hover'
          },
          bizOptions:[],
          searchParams: {},
          loading:false,
          tableData:[]
        }
    },
    components: {
      EditTemplate
    },
    async mounted() {
      this.loadBizData()
      this.loadData()
    },
    methods:{
      async loadBizData() {
        const result = await fetch('/biz/listBizByApp',{})
        if (result.code == 200) {
          this.bizOptions = result.data
        } 
        else {
          this.$message.error(result.msg)
        }
      },
      async loadData() {
        this.loading = true
        if(this.searchParams.appBizCode&&this.searchParams.appBizCode.length==2){
          this.searchParams.appCode = this.searchParams.appBizCode[0]
          this.searchParams.bizCode = this.searchParams.appBizCode[1]
        }
        else if(this.searchParams.appBizCode&&this.searchParams.appBizCode.length==1){
          this.searchParams.appCode = this.searchParams.appBizCode[0]
        }
        const result = await post('/oss/permission/menu/listTree',this.searchParams);
        if (result.code == 200) {
          this.tableData = result.data;
          this.loading = false
        }
        else {
          this.loading = false
          this.$message.error(result.msg)
        }
      },
      add(flag,data) {
        this.$refs.template.showAdd(true,flag,data)
      },
      edit(data){
         this.$refs.template.showEdit(true,data)
      },
      del(row) {
        this.$confirm('确定要删除该权限菜单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let param = {id:row.id}
          const result = await fetch('/oss/permission/menu/deletePermissionById',param)
          if (result.code == 200) {
            this.$message.success('删除成功!')
            this.loadData()
          } else {
            this.$message.error(result.msg)
          }
        }).catch(() => {
        })
      }
    }
  }
</script>
