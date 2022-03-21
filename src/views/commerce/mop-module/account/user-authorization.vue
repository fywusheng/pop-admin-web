<template>
  <el-dialog
    class="dialog"
    :title="dataForm.id ? 'MOP管理员授权':'MOP管理员授权'"
    width="600px"
    :visible.sync="showDialog">
    <el-form class="data-form" :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px" label-position="top">
      <el-form-item label="请给商家管理员授权：" prop="name">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="dataForm.roleIds" @change="handleCheckedRolesChange">
        <el-checkbox v-for="role in roleList" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
      </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show(false)">取 消</el-button>
      <el-button type="success" :loading="sending" :disabled="sending" @click="save">
        {{sending ?
        '正在保存...':'确 定'}}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetch, post } from "@/utils/http-client";

export default {
  data() {
    return {
      dialogTitle: 'MOP角色授权',
      showDialog: false,
      sending: false,
      roleList:[],
      checkAll: false,
      dataForm: {
        id:'',
        roleIds:[]
      },
      dataRules: {
        //name: [{required: true,message: '请输入角色名称...', trigger: 'blur'}]
      },
      isIndeterminate: true
    };
  },
  async mounted() {},

  methods: {
    show(flag, data) {
      this.showDialog = flag;
      if(data){
        this.dataForm.id = data.id
        this.$loading = true;
        this.loadAllRoles();
        this.loadUserRoles(this.dataForm.id);
        this.$loading = false;
      }
      else{
        if(flag){
          this.$message.error("授权失败，请选择需要授权的用户账号！")
        }
      }
    },
    resetChecked() {
      //==this.$refs.tree.setCheckedKeys(this.checkedRoleKeys);
    },

    async loadAllRoles(){
      let result = await post('/oss/mop/permission/listRoleByPageNo',{pageNo:1,pageSize:100,queryObject:{merchantId:-1}})
      if(result.code == 200){
        this.roleList = result.data.list;
      }
      else {
        this.$message.error(result.msg);
      }
    },
    async loadUserRoles(userId){
      let result = await post('/oss/mop/user/getUserRolesByUserId',{id:userId})
      if(result.code == 200){
        this.dataForm.roleIds = result.data
      }
      else {
        this.$message.error(result.msg);
      }
    },

    async save() {
      this.sending = true
      const result = await post('/oss/mop/user/grantUserPermissions', this.dataForm)
      this.sending = false
      if (result.code == 200) {
        this.$message.success(result.msg)
        this.show(false)
        this.$message.success("商户账号授权成功！")
        this.$parent.loadData()
      }
      else {
        this.$message.error(result.msg)
      }
    },
    handleCheckAllChange(val) {
      let roleIds = [];
      this.roleList.forEach(r=>{
        roleIds.push(r.id)
      })
      this.dataForm.roleIds = val ? roleIds : [];
      this.isIndeterminate = false;
    },
    handleCheckedRolesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount == this.roleList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length;
    }
  }
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
