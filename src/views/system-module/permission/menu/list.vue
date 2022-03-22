<template>
<div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
      <el-form-item>
        <el-select v-model="searchParams.bizCode" placeholder="请选择业务模块..." style="width:200px">
          <el-option v-for="item in bizData" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="loadData" size="small">查询(Q)</el-button>
          <el-button type="default" @click="add(0)" size="small">新增一级菜单(A)</el-button>
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
          bizData:[],
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
        const result = await fetch('/biz/list',{})
        if (result.code == 200) {
          this.bizData = result.data
        }
        else {
          this.$message.error(result.msg)
        }
      },
      async loadData() {
        this.loading = true
        const result = await fetch('permission/getPermissionTree',this.searchParams);
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
          const result = await fetch('permission/deletePermissionById',param)//deletePermission(row.id)
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