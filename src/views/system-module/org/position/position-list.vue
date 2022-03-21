<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input v-model="searchParams.name" placeholder="请输入岗位名称..." size="mini" clearable></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="searchParams.code" placeholder="请输入岗位编码..." size="mini" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查询</el-button>
          <el-button type="default" icon="el-icon-circle-plus-outline" @click="add" size="mini">新增</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table class="custom-table" :data="dataList" :header-cell-style="{background:'#F2F6FC',color:'#000000'}" size="mini" v-loading="loading">
      <div slot="empty" class="empty-wrap"><i class="iconfont icon-tishi"></i><span>系统暂无数据</span></div>
      <el-table-column label="序号" type="index">
      </el-table-column>
      <el-table-column prop="name" label="岗位名称">
      </el-table-column>
      <el-table-column prop="code" label="岗位编码">
      </el-table-column>
      <el-table-column prop="description" label="岗位描述" width="280px">
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
      <el-table-column prop="" label="操作" width="300px" align="center">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" size="mini" @click="del(scope.row)" >删除&nbsp;&nbsp;</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background v-show="totalSize > 10" :page-size="pageSize"
                   @size-change="changeSize" @current-change="changePage"
                   layout="total, slot, jumper, prev, pager, next" :total="totalSize">
    </el-pagination>
   <edit-template ref="template"></edit-template>
  </div>
</template>
<script>
  import {fetch,post} from '@/utils/http-client'
  import EditTemplate from './position-template'

  export default {
    name: '',
    data() {
      return {
        page: 1,
        pageSize: 15,
        dataList: [],
        totalSize: 10,
        loading: false,
        searchParams: {},
        dialogList: [],
        showDialog: false
      }
    },
    components: {
      EditTemplate
    },
    async mounted() {
      this.loadData()
    },
    methods: {
      changePage(pageNo) {
        this.page = pageNo
        this.loadData()
      },
      changeSize(pageSize) {
        this.pageSize = pageSize
        this.page = 1
        this.loadData()
      },
      async loadData() {
        this.loading = true
        const params = {
          pageNum: this.page,
          pageSize: this.pageSize,
          queryObject:this.searchParams
        }
        const result = await post('/position/getPositionPage',params)//getPositionPage(params)
        this.loading = false
        if (result.code == 200) {
          this.$nextTick(() => {
            this.dataList = result.data.list
            this.totalSize = result.data.totalCount * 1
          })
        } else {
          this.$message.error(result.msg)
        }
      },
      add() {
        this.$refs.template.show(true)
      },
      edit(row) {
        this.$refs.template.show(true, row)
      },
      del(row) {
        this.$confirm('确定要删除该岗位信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const result = await post('/position/delete',{id: row.id})//deletePosition({id: row.id})
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
<style lang="scss" rel="stylesheet/scss">

</style>
