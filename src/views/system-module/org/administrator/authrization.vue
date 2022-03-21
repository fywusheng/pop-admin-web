
<template>
  <div class="main-content">
    <el-page-header @back="back2Prev" content="用户授权管理"></el-page-header>
    <el-row style="height:20px">
      <el-col :span="24"></el-col>
    </el-row>
    <el-row type="flex" class="mb-10" justify="space-between">
      <el-col :span="6"> </el-col>
      <el-col :span="13"></el-col>
      <el-col :span="5"></el-col>
    </el-row>
    <el-row type="flex" justify="space-between" style="font-family:PingFang;">
      <el-col :span="3"></el-col>
      <el-col :span="18" class="grid-content01 bg-purple" >
          <div style="width:100%;display:block;line-height:60px;text-align:center;">当前用户：{{name}},&nbsp;登录账号：{{loginName}}</div>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
    <el-row type="flex" justify="space-between" style="font-family:PingFang;">
      <el-col :span="3"></el-col>
      <el-col :span="18" class="grid-content02 bg-purple" >
        <div style="width:100%;display:block;line-height:50px;text-align:center;">
          <el-button type="info"  @click="resetChecked()" size="small" plain round>重置(R)</el-button>
          <el-button type="success" @click="save()" size="small" plain round>保存(S)</el-button>
        </div>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
    <el-row type="flex" class="mb-10" justify="space-between">
      <el-col :span="6"> </el-col>
      <el-col :span="12">
        <template>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedRoleKeys">
            <el-checkbox v-for="r in roles" :label="r.id" :key="r.id" border size="small" style="width:150px">{{r.name}}</el-checkbox>
        </el-checkbox-group>
        </template>
      </el-col>
      <el-col :span="6"> </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetch, post } from "@/utils/http-client";

export default {
  async mounted() {
    this.$loading = true;
    this.loadAllRoles();
    this.name = this.$route.params.name;
    this.loginName= this.$route.params.loginName;
    this.loadUserRoles(this.$route.params.id);
    this.$loading = false;
  },

  methods: {
    resetChecked() {
      //this.$refs.tree.setCheckedKeys(this.checkedRoleKeys);
    },
    back2Prev(){
      this.$router.back();
    },

    async loadAllRoles(){
      let result = await fetch('/oss/permission/role/list',{})
      if(result.code == 200){
        this.roles = result.data;
      }
      else {
        this.$message.error(result.msg);
      }
    },
    async loadUserRoles(userId){
      let result = await fetch('/oss/permission/role/getRoleIdsByUserId',{userId:userId})
      if(result.code == 200){
        this.checkedRoleKeys = result.data
      }
      else {
        this.$message.error(result.msg);
      }
    },

    async save() {
      this.sending = true
      const result = await post('/user/grant', {id:this.$route.params.id,roles:this.checkedRoleKeys})
      this.sending = false
      if (result.code == 200) {
        this.$message.success(result.msg)
        this.back2Prev()
      }
      else {
        this.$message.error(result.msg)
      }
    }
  },

  data() {
    return {
      checkedRoleKeys:[],
      roles:[],
      name:'',
      loginName:''
    };
  },
};
</script>
<style>
  .grid-content01 {
    border-radius: 6px;
    min-height: 60px;
  }
  .grid-content02 {
    border-radius: 6px;
    min-height: 50px;
  }
  .bg-purple {
    background:#5693f5;
  }
</style>
