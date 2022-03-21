<template>
  <div class="div-layout">
    <el-page-header @back="back2Prev" content="修改运费模板"></el-page-header>
    <el-row style="height: 30px">
      <el-col :span="24"></el-col>
    </el-row>
    <el-form
      class="data-form"
      :model="dataForm"
      :rules="dataRules"
      ref="dataForm"
      label-width="150px"
      label-position="top"
      size="mini"
    >
     <table width="100%">
        <tr>
          <td width="5%"></td>
          <td width="40%">
            <el-form-item label="所属商家" prop="supplierId">
                <el-select v-model="dataForm.supplierId" collapse-tags filterable style="width:90%" placeholder="请选择商家...">
                    <el-option
                    v-for="item in supplierOptions"
                    :key="item.id"
                    :label="item.supplierName"
                    :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
          </td>
          <td width="55%">
            <el-form-item label="模版名称" prop="tempName">
                <el-input v-model="dataForm.tempName" placeholder="请输入模板名称..." maxlength="64" style="width:90%"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td width="5%"></td>
          <td width="40%">
            <el-form-item label="计价单位" prop="type" class="item">
                <el-select v-model="dataForm.type" placeholder="请选择商品计价单位..." style="width:90%">
                    <el-option
                    v-for="item in valuationUnitOptions"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                    ></el-option>
                </el-select>
            </el-form-item>
          </td>
          <td width="55%">
            <el-form-item label="是否包邮" prop="postage">
            <table width="100%">
                <tr>
                <td width="45%">订单满(元)：<el-input v-model="dataForm.postage" placeholder="请输入订单包邮起价金额..." style="width:200px" maxlength="64"></el-input>
                </td>
                <td width="20%">
                    <el-checkbox v-model="dataForm.isPostage" border>包邮</el-checkbox>
                </td>
                <td width="35%"></td>
                </tr>
            </table>
            </el-form-item>
          </td>
        </tr>
     </table>
     <table width="100%">
        <tr>
          <td width="5%"></td>
          <td width="40%">
            <el-form-item label="默认运费" prop="defaultFreight">
            <table width="100%">
                <tr style="height:50px">
                <td width="45%">
                    首重(件)：<el-input v-model="templateDetail.first" placeholder="请输入首重(件)数量..." maxlength="64" style="width:50%"></el-input>
                </td>
                <td width="55%">
                    首费(元)：<el-input v-model="templateDetail.firstPrice" placeholder="请输入首重(件)费用..." maxlength="64" style="width:50%;"></el-input>
                </td>
                </tr>
            </table>
            </el-form-item>
          </td>
          <td width="55%">
            <el-form-item label="默认续费" prop="defaultAddFreight">
            <table width="100%">
                <tr style="height:50px">
                <td width="45%">
                    续重(件)：<el-input v-model="templateDetail.renew" placeholder="请输入续重(件)数量..." maxlength="64" style="width:50%"></el-input>
                </td>
                <td width="55%">
                    续费(元)：<el-input v-model="templateDetail.renewPrice" placeholder="请输入续重(件)费用..." maxlength="64" style="width:50%"></el-input>
                </td>
                </tr>
            </table>
            </el-form-item>
          </td>
        </tr>
     </table> 
    </el-form>
     <table width="100%">
        <tr>
          <td style="height:100px;text-align:center">
          <el-button @click="back2Prev()">返 回</el-button>
          <el-button type="success" :loading="sending" :disabled="sending" @click="save">
            {{sending ? '正在保存...':'确 定'}}
          </el-button>
          </td>
          <td width="10%"></td>
        </tr>
     </table>
  </div>
</template>
<script>
import { fetch, post } from "@/utils/http-client";

export default {
  name: "",
  data() {
    /**
      * 手机号码校验
    */
   var validatorPostage = (rule,value,callback) => {
     if(this.dataForm.isPostage&&this.dataForm.postage.length==0){
       return callback(new Error('包邮起价金额不能为空，请输入...'));
     }
     else{
       return callback();
     }
    }
   var validatorFreight = (rule,value,callback) => {
     if(this.templateDetail.first.length==0 || this.templateDetail.firstPrice.length==0){
      return callback(new Error('默认运费输入不完整，请输入...'));
     }
     else{
       return callback();
     }
    }
   var validatorAddFreight = (rule,value,callback) => {
     if(this.templateDetail.renew.length==0 || this.templateDetail.renewPrice.length==0){
      return callback(new Error('默认续费输入不完整，请输入...'));
     }
     else{
       return callback();
     }
    }

    return {
      dialogTitle: "新增运费模板",
      showDialog: false,
      sending: false,
      dialogVisible: false,
      supplierOptions:[],
      valuationUnitOptions: [
        {key:1,label:"件"},
        {key:2,label:"重量"},
        {key:3,label:"体积"}
        ],
      dataForm: {
        supplierId:'',
        tempName:'',
        type:'',
        postage:'',
        isPostage:false,
        templates: []
      },
      templateDetail : {},
      dataRules: {
        supplierId: [{required: true, message: "所属商家不能为空，请选择！",valtrigger: "blur"}],
        tempName: [{required: true, message: "运费模板不能为空，请输入！",trigger: "blur"}],
        type: [{required: true, message: "计价单位不能为空，请选择！",trigger: "blur"}],
        postage: [{required: true, validator: validatorPostage,trigger: "blur"}],
        defaultFreight: [{required: true, validator: validatorFreight,trigger: "blur"}],
        defaultAddFreight: [{required: true, validator: validatorAddFreight,trigger: "blur"}]
      },
    };
  },
  async mounted() {
    this.loadSupplierOptions()
    this.loadData(this.$route.params.id);
  },
  methods: {

    async loadSupplierOptions() {
      const result = await fetch("/srm/supplier/listByPageNo?pageNum=1&pageSize=1000", {});
      if (result.code == 200) {
        this.supplierOptions = result.data.list;
      } 
      else {
        this.$message.error(result.msg);
      }
    },

    async loadData(id) {
      const result = await fetch("/tms/freight-template/loading", {templateId:id});
      if (result.code == 200) {
        this.dataForm.id = result.data.id
        this.dataForm.supplierId = result.data.supplierId
        this.dataForm.tempName = result.data.tempName
        this.dataForm.type = result.data.type
        this.dataForm.isPostage = result.data.isPostage == 1 ? true : false
        this.dataForm.postage = result.data.postage
        this.templateDetail = result.data.templates[0]
          console.log(JSON.stringify(result.data.templates[0]))
      } 
      else {
        this.$message.error(result.msg);
      }
    },
    async save() {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.sending = true;
          let params = Object.assign({}, this.dataForm)
          params.templates.push(this.templateDetail)
          params.isPostage = this.dataForm.isPostage?1:0
          const result = await post('/tms/freight-template/update',params)
          this.sending = false
          if (result.code == 200) {
            this.$message.success("运费模版保存成功！")
            this.back2Prev()
          }
          else {
            this.$message.error(result.msg)
          }
        } 
        else {
          return false;
        }
      });
    },
    back2Prev() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
  .div-layout {
    padding: 10px 20px;
  }
</style>