<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查 询</el-button>
          <el-button type="default" icon="el-icon-circle-plus-outline" @click="add" size="mini">新 增</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      ref="multipleTable"
      :header-cell-style="{background:'#F2F6FC',color:'#000000'}"
      size="mini"
      row-key="id"
      lazy
      v-loading="loading"
      :load="loadTree"
      :highlight-current-row="false"
      :default-expand-all="false"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        label=""
        type=""
        width="20px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="类目名称">
      </el-table-column>
      <el-table-column prop="" label="LOGO" width="100px">
    　　<template slot-scope="scope">
          <el-image :src="scope.row.iconUrl" style="height:28px;width:28px" fit="scale-down"></el-image>
    　　</template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="类目编码"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="updatedTime"
        label="操作时间"
        align="center"
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
            @change="resetting(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="380px" align="center">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.level!=3" size="mini" @click="forward2ProductList(scope.row)">关联商品</el-button>
          <el-button :disabled="scope.row.level>2" size="mini" @click="add(scope.row)">添加子类</el-button>
          <el-button size="mini" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
          <el-button :disabled="scope.row.hasChildren" icon="el-icon-delete" size="mini" @click="del(scope.row)" v-show="scope.row.sysUserId != 1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-template ref="template" @change="refreshLoadTree"></edit-template>
  </div>
</template>
<script>
import { fetch, post } from '@/utils/http-client'
import EditTemplate from './sales-category-template'

export default {
  data() {
    return {
      tableData: [],
      maps:new Map(),
      loading: false,
      categoryMap: {}
    }
  },
  components: {
    EditTemplate,
  },
  async mounted() {
    this.loadData()
  },
  methods: {
    async refreshLoadTree() {
      await this.loadData()
      this.allDataList.forEach(data => {
        let dataList = []
        if (data.children) {
          data.children.forEach(child => {
            dataList.push({
              name: child.name,
              code: child.code,
              id: child.id,
              level: child.level,
              node: child.node,
              creator: child.creator,
              updatedTime: child.updatedTime,
              delFlag: child.delFlag,
              parentId: data.id,
              children: child.children || [],
              hasChildren: child.children && child.children.length > 0
            })
          })
        }
        this.$set(this.$refs.multipleTable.store.states.lazyTreeNodeMap, data.id, dataList)
      })
      this.allDataList.forEach(data => {
        data.children && data.children.forEach(child => {
          const subList = []
          this.categoryMap[child.id].forEach(subChild => {
            subList.push({
              name: subChild.name,
              code: subChild.code,
              id: subChild.id,
              level: subChild.level,
              node: subChild.node,
              creator: subChild.creator,
              updatedTime: subChild.updatedTime,
              delFlag: subChild.delFlag,
              parentId: subChild.id,
              children: subChild.children || [],
              hasChildren: subChild.children && subChild.children.length > 0
            })
          })
          this.$set(this.$refs.multipleTable.store.states.lazyTreeNodeMap, child.id, subList)
        })
      })
    },
    loadTree(tree, treeNode, resolve) {
      resolve(this.categoryMap[tree.id])
    },
    getChildren(dataList, children){
      if(!dataList || !dataList.length){
        return;
      }
      dataList.forEach(child => {
        let data = {
          name: child.name,
          iconUrl: child.iconUrl,
          code: child.code,
          id: child.id,
          level:child.level,
          node:child.node,
          updatedTime: child.updatedTime,
          delFlag:child.delFlag,
          children: []
        }
        this.getChildren(child, data.children);
        data.hasChildren = data.children.length > 0;
        children.push(data);
      })
    },
    async loadData() {
      this.loading = true
      const result = await fetch('/category/list.sales', {})
      this.loading = false
      if (result.code == 200) {
        this.allDataList = result.data;
        let dataList = []
        result.data.forEach(data => {
          let category = {
            name: data.name,
            iconUrl: data.iconUrl,
            code: data.code,
            id: data.id,
            level:data.level,
            node:data.node,
            creator: data.creator,
            updatedTime: data.updatedTime,
            delFlag:data.delFlag,
            children: [],
            parentId: data.parentId,
            hasChildren: data.children && data.children.length > 0
          }
          dataList.push(category)
          const children = []
          data.children && data.children.forEach(child => {
            const subList = child.children || []
            delete child.children
            children.push({
              ...child,
              children: [],
              hasChildren: subList.length > 0
            })
            this.categoryMap[child.id] = subList.map(item => {
              return { ...item, hasChildren: item.children && item.children.length > 0 }
            })
          })
          this.categoryMap[data.id] = children
        })
        this.tableData = dataList
      } else {
        this.$message.error(result.msg)
      }
    },
    forward2ProductList(row) {
      this.$router.push({ name: "SalesCategoryProduct", params: { id: row.id,name: row.name,node: row.node } });
    },
    add(data) {
      this.$refs.template.showAdd(true, data)
    },
    edit(data){
      this.$refs.template.showEdit(true,data)
    },

    async resetting(row){
        const result = await post('/category/resetting.sales', row)
        if (result.code == 200) {
          this.$message.success('重置启用状态成功!')
          this.loadData()
        } else {
          this.$message.error(result.msg)
        }
    },

    del(row) {
      this.$confirm('确定要删除该运营类目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let param = { id: row.id }
        const result = await post('/category/delete.sales', param)
        if (result.code == 200) {
          this.$message.success('删除成功!')
          await this.refreshLoadTree()
        } else {
          this.$message.error(result.msg)
        }
      }).catch(() => {
      })
    }
  }
}
</script>
<style>
.div-layout{
  padding: 10px 20px;
}
</style>
