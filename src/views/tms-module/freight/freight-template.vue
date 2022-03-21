<template>
  <el-dialog
    class="dialog"
    :title="dataForm.id ? '修改运费模板':'新增运费模板'"
    width="700px"
    :visible.sync="showDialog">
    <el-form
      class="data-form"
      :model="dataForm"
      :rules="dataRules"
      ref="dataForm"
      label-width="150px"
      label-position="top"
      size="mini"
    >
      <el-form-item label="所属商家" prop="supplierId">
        <el-select v-model="dataForm.supplierId" collapse-tags filterable style="width:100%" placeholder="请选择商家...">
            <el-option
              v-for="item in supplierOptions"
              :key="item.id"
              :label="item.supplierName"
              :value="item.id"
            ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模版名称" prop="tempName">
        <el-input v-model="dataForm.tempName" placeholder="请输入模板名称..." maxlength="64" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="计价单位" prop="type" class="item">
          <el-select v-model="dataForm.type" placeholder="请选择商品计价单位..." style="width:100%">
            <el-option
              v-for="item in valuationUnitOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="是否包邮" prop="postage">
      <table width="100%">
        <tr style="height:40px">
          <td width="15%" style="text-align:right">订单满(元)：</td>
          <td width="35%">
            <el-input v-model="dataForm.postage" placeholder="请输入订单包邮起价金额..." maxlength="64" style="width:95%"></el-input>
          </td>
          <td width="15%">
            <el-checkbox v-model="dataForm.isPostage" border="true">包邮</el-checkbox>
          </td>
          <td width="35%"></td>
        </tr>
      </table>
      </el-form-item>
      <el-form-item label="默认运费" prop="defaultFreight">
      <table width="100%">
        <tr style="height:50px">
          <td width="15%" style="text-align:right">首重(件)：</td>
          <td width="35%">
            <el-input v-model="templateDetail.first" placeholder="请输入首重(件)数量..." maxlength="64" style="width:95%"></el-input>
          </td>
          <td width="15%" style="text-align:right">首费(元)：</td>
          <td width="35%">
            <el-input v-model="templateDetail.firstPrice" placeholder="请输入首重(件)费用..." maxlength="64" style="width:95%"></el-input>
          </td>
        </tr>
        <tr style="height:50px">
          <td width="15%" style="text-align:right">续重(件)：</td>
          <td width="35%">
            <el-input v-model="templateDetail.renew" placeholder="请输入续重(件)数量..." maxlength="64" style="width:95%"></el-input>
          </td>
          <td width="15%" style="text-align:right">续费(元)：</td>
          <td width="35%">
            <el-input v-model="templateDetail.renewPrice" placeholder="请输入续重(件)费用..." maxlength="64" style="width:95%"></el-input>
          </td>
        </tr>
      </table>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show(false)">取 消</el-button>
      <el-button type="success" :loading="sending" :disabled="sending" @click="save">
        {{sending ? '正在保存...':'确 定'}}
      </el-button>
    </div>
  </el-dialog>
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
     if(this.templateDetail.first.length==0 || this.templateDetail.renew.length==0 || this.templateDetail.renewPrice.length==0 || this.templateDetail.firstPrice.length==0){
      return callback(new Error('默认运费输入不完整，请输入...'));
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
      templateDetail : {
          first:'',
          firstPrice:'',
          renew:'',
          renewPrice:''
      },
      dataRules: {
        supplierId: [{required: true, message: "所属商家不能为空，请选择！",valtrigger: "blur"}],
        tempName: [{required: true, message: "运费模板不能为空，请输入！",trigger: "blur"}],
        type: [{required: true, message: "计价单位不能为空，请选择！",trigger: "blur"}],
        postage: [{required: true, validator: validatorPostage,trigger: "blur"}],
        defaultFreight: [{required: true, validator: validatorFreight,trigger: "blur"}]
      },
    };
  },
  async mounted() {
      this.loadSupplierOptions()
  },
  methods: {

    show(flag, data) {
      this.showDialog = flag;
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        this.$refs.templateDetail.resetFields()
      });
    },

    async loadSupplierOptions() {
      const result = await fetch("/srm/supplier/listByPageNo?pageNum=1&pageSize=1000", {});
      if (result.code == 200) {
        this.supplierOptions = result.data.list;
      } else {
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
          const result = await post('/tms/freight-template/add',params)
          this.sending = false
          if (result.code == 200) {
            this.show(false)
            this.$message.success("运费模版保存成功！")
            this.$parent.loadData()
          }
          else {
            this.$message.error(result.msg)
          }
        } 
        else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
</style>