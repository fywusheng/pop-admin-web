<template>
<div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
      <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询</el-button>
      </el-form-item>
      </el-form>
    </el-row>
  <el-table
    :data="tableData"
    :header-cell-style="{background:'#F2F6FC',color:'#000000'}"
    size="mini"
    row-key="id"
    :highlight-current-row='false'
    :default-expand-all='false'
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      label=""
      type=""
      width="20px">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称">
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
    <el-table-column prop="" label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="add(1,scope.row)">添加子部门</el-button>
          <el-button size="mini" @click="edit(scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button :disabled="scope.row.hasChildren" size="mini" @click="del(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <edit-template ref="template"></edit-template>
</div>
</template>
<script>
  import {fetch,post} from '@/utils/http-client'
  import { Loading } from 'element-ui'
  import EditTemplate from './org-template'

  export default {
    data(){
        return {
          tableData:[]
        }
    },
    components: {
      EditTemplate
    },
    async mounted() {
      this.loadData()
    },
    methods:{
      async loadData() {
        this.Loading = true
        const result = await fetch('/org/list.tree',{});
        if (result.code == 200) {
            this.tableData = result.data;
            this.Loading = false
        }
        else {
            this.Loading = false
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
        this.$confirm('确定要删除该组织信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const result = await post('/org/delete',{id:row.id})
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
