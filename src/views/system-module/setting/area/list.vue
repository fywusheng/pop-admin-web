<template>
<div class="main-content">
    <el-row class="mb-2">
      <!-- <el-form :inline="true">
        <el-form-item>
           <el-button type="default" @click="add(0)" size="small">新增一级行政区域(A)</el-button>
        </el-form-item>
      </el-form> -->
    </el-row>
  <el-table
    :data="tableData"
    :header-cell-style="{background:'#F2F6FC',color:'#000000'}"
    size="mini"
    row-key="id"
    highlight-current-row:false
    v-loading="loading"
    default-expand-all:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    lazy
    >
    <el-table-column
      label=""
      type=""
      width="50px">
    </el-table-column>
    <el-table-column
      prop="name"
      label="区域名称">
    </el-table-column>
    <el-table-column
      prop="code"
      label="区域编码"
      width="150px">
    </el-table-column>
    <!-- <el-table-column
      prop="modifier"
      label="操作人"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="updatedTime"
      label="操作时间"
      width="150px">
    </el-table-column> -->
    <!-- <el-table-column prop="" label="操作" width="280px" align="center">
        <template slot-scope="scope">
          <el-button type="default" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button type="default" size="mini" @click="add(1,scope.row)">添加子菜单</el-button>
        </template>
    </el-table-column> -->
  </el-table>
  <!--edit-template ref="template"></edit-template-->
</div>
</template>
<script>
  import {fetch,post} from '@/utils/http-client'

  export default {
    data(){
        return {
            tableData:[],
            loading:false
        }
    },
    components: {
    },
    async mounted() {
      this.loadData()
    },
    methods:{
      async loadData() {
        this.loading = true
        const result = await fetch('/area/getAreaTree',null)//
        if (result.code == 200) {
          this.tableData = result.data;
          this.loading = false;
        }
        else {
          this.loading = false;
          this.$message.error(result.msg)
        }
      },
      add(flag,data) {
        this.$refs.template.show(true,flag,data)
      },
      del(row) {
        this.$confirm('确定要删除该权限菜单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let param = {id:row.id}
          const result = await fetch('/area/deleteArea',param)
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
