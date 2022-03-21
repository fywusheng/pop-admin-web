<template>
<div class="div-layout">
    <el-row style="height: 80px">
      <el-col :span="24"></el-col>
    </el-row>
    <el-form class="data-form" :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px" label-position="top">
    <table width="100%">
    <tr style="height:200px">
        <td width="30%"></td>
        <td>
            <el-descriptions title="用户信息">
                <el-descriptions-item>请务必尽快修改操作员账号的密码，本链接从邮件发出后有效期60分钟！</el-descriptions-item>
            </el-descriptions>
        </td>
        <td width="30%"></td>
    </tr>

    <tr>
        <td width="30%"></td>
        <td>
            <el-form-item label="设置新密码" prop="passwordNew01">
                <el-input v-model="dataForm.passwordNew01" placeholder="设置新密码，请输入..." maxlength="16" style="width:100%"></el-input>
            </el-form-item>
        </td>
        <td width="30%"></td>
    </tr>
    <tr>
        <td width="30%"></td>
        <td>
            <el-form-item label="确认新密码" prop="passwordNew02">
                <el-input v-model="dataForm.passwordNew02" placeholder="请再次重复输入以确保无误..." maxlength="16" style="width:100%"></el-input>
            </el-form-item>
        </td>
        <td width="30%"></td>
    </tr>
    </table>
    </el-form>
    <el-row style="height: 30px">
        <el-col :span="24"></el-col>
    </el-row>
    <el-row type="flex" style="height:30px;text-align:center">
        <el-col :span="24" style="align:center">
        <el-button
          type="success"
          :loading="sending"
          :disabled="sending"
          @click="save"
        >{{ sending ? '正在保存...' : '提 交' }}</el-button>
        </el-col>
    </el-row>
</div>
</template>
<script>
import {fetch,post} from '@/utils/http-client'

export default {
    name: '',
    data() {
    var validatorPassword02 = (rule,value,callback) => {
        if(this.dataForm.passwordNew02.length==0 ){
            return callback(new Error('请再次重复输入，不能为空!'));
        }
        else if(this.dataForm.passwordNew01 != this.dataForm.passwordNew02){
            return callback(new Error('密码输入不一致，请重新输入...'));
        }
        else{
            return callback();
        }
    }
    return {
        sending: false,
        dataForm: {
            tokenId:this.$route.query.tokenId,
            passwordNew01: '',
            passwordNew02: ''
        },
        dataRules: {
          passwordNew01: [{required: true, message: '密码设置不能为空，请输入！',trigger: 'blur'}],
          passwordNew02: [{required: true, validator: validatorPassword02, trigger: 'blur'}]
        }
     }
},
    async mounted() {},
    methods: {
      async save() {
        this.$refs.dataForm.validate(async(valid) => {
          if (valid) {
            this.sending = true
            const result = await post("/user/password/update",this.dataForm)
            this.sending = false
            if (result.code == 200) {
              this.$message.info(result.msg)
              this.$router.push(`/login`);
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
</style>
