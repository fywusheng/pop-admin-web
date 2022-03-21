<template>
  <el-dialog
    class="dialog"
    :title="dataForm.id ? '编辑管理员信息':'创建管理员'"
    width="600px"
    :visible.sync="showDialog">
    <el-form class="data-form" :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px"
             label-position="top">
      <el-form-item label="姓名" prop="realName" class="item">
        <el-input v-model="dataForm.realName" placeholder="请输入管理员姓名..." maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="loginName" class="item">
        <el-input v-model="dataForm.loginName" placeholder="请输入登录账号(手机号码)..." :disabled="!!dataForm.id"  maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="telphone" class="item">
        <el-input v-model="dataForm.telphone" placeholder="请输入联系电话..." maxlength="11" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="所属部门/组织" prop="fullOrgIds" class="item">
        <el-cascader v-model="dataForm.fullOrgIds" :options="orgOptions" placeholder="请选择所属部门..." :props="orgOptionProps" style="width:500px"></el-cascader>
      </el-form-item>
      <el-form-item label="从事岗位" prop="positionId" class="item">
        <el-select v-model="dataForm.positionId" placeholder="请选择所从事的岗位..." style="width:100%">
          <el-option v-for="item in positionOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电子邮件" prop="email" class="item">
        <el-input v-model="dataForm.email" placeholder="请输入电子邮件..." maxlength="256" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks" class="item">
        <el-input v-model="dataForm.remarks" placeholder="请输入备注信息..." type="textarea" maxlength="256" style="width:100%"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show(false)">取 消</el-button>
      <el-button type="success" :loading="sending" :disabled="sending" @click="save">{{sending ?
        '正在保存...':'确 定'}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
  import {fetch,post} from '@/utils/http-client'

  export default {
    name: '',
    data() {
      /**
       * 登录账号校验
       */
      var validateAccount = (rule,value,callback) => {
          let mobile = /^(13|18|14|17|15)[0-9]{9}$/;
          //let tel = /^\d{3,4}-?\d{7,9}$/;
          if (!mobile.test(value)){
            return callback(new Error('请输入正确的登录账号(手机号码)...'));
          }
          else{
            callback()
          }
      }
      /**
       * 手机号码校验
       */
      var validateTelphone = (rule,value,callback) => {
        if(value){
          let mobile = /^(13|18|14|17|15)[0-9]{9}$/;
          //let tel = /^\d{3,4}-?\d{7,9}$/;
          if (value&&!mobile.test(value)){
            return callback(new Error('请输入正确的联系电话...'));
          }
          else{
            callback()
          }
        }
        else{
            return callback(new Error('联系电话不能为空,请输入...'));
        }
      }
      /**
       * 电子邮件校验
       */
      var validateeMail = (rule,value,callback) => {
        if(value){
          let email = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
          //let tel = /^\d{3,4}-?\d{7,9}$/;
          if (!email.test(value)){
            return callback(new Error('请输入正确的邮件地址...'));
          }
          else{
            return callback();
          }
        }
        else{
            return callback(new Error('邮件地址不能为空,请输入...'));
        }
      }
      return {
        orgOptionProps: {
          value: 'id',
          label: 'name',
          leaf: 'pid',
          children: 'children',
          expandTrigger: 'hover'
        },
        dialogTitle: '新增用户',
        showDialog: false,
        sending: false,
        orgOptions:[],
        positionOptions:[],
        dataForm: {
          id:'',
          loginName: '',
          realName: '',
          telphone: '',
          fullOrgIds:'',
          positionId:'',
          email:'',
          remarks:''
        },
        dataRules: {
          loginName: [{required: true,validator:validateAccount,trigger: 'blur'}],
          realName: [{required: true,message: '请输入管理员姓名...', trigger: 'blur' }],
          telphone: [{required: true,validator:validateTelphone, trigger: 'blur' }],
          email: [{required: true,validator:validateeMail, trigger: 'blur' }]
        }
      }
    },

    async mounted() {
       this.loadOrgData()
       this.loadPositionData()
    },
    methods: {
      show(flag, data) {
        this.showDialog = flag;
        if (flag && data) {
          this.loadData(data.id)
        }
        else{
          this.dataForm.id = ''
          this.dataForm.loginName = ''
          this.dataForm.realName = ''
        }
        // this.$nextTick(() => {
        //   //this.$refs.dataForm.resetFields()
        // })
      },
      async loadData(id){
        const result = await fetch('org/admin/get',{id:id})
        if (result.code == 200) {
          this.dataForm.id = result.data.id
          this.dataForm.loginName = result.data.loginName
          this.dataForm.realName = result.data.realName
          this.dataForm.telphone = result.data.telphone
          this.dataForm.fullOrgIds = result.data.fullOrgIds
          this.dataForm.positionId = result.data.positionId
          this.dataForm.email = result.data.email
          this.dataForm.remarks = result.data.remarks
        } 
        else {
          this.$message.error(result.msg)
        }
      },
      async loadOrgData() {
        const result = await fetch('/org/list.tree',{})
        if (result.code == 200) {
          this.orgOptions = result.data
        } 
        else {
          this.$message.error(result.msg)
        }
      },
      async loadPositionData() {
        const result = await fetch('/position/list',{})
        if (result.code == 200) {
          this.positionOptions = result.data
        } 
        else {
          this.$message.error(result.msg)
        }
      },
      async save() {
        this.$refs.dataForm.validate(async(valid) => {
          if (valid) {
            this.sending = true
            let url = this.dataForm.id?'/org/admin/update':'/org/admin/add'
            const result = await post(url,this.dataForm)
            this.sending = false
            if (result.code == 200) {
              this.show(false)
              this.$message.success('操作成功！')
              this.$parent.loadData()
            } 
            else {
              this.$message.error(result.msg)
            }
          } 
          else {
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .item .el-form-item__label{
      height: 35px;
  }
</style>
