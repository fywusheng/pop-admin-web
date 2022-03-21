<template>
  <el-dialog
    class="dialog"
    :title="dataForm.id ? '审核商户信息':'审核商户信息'"
    width="550px"
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
      <el-form-item label="审核意见" prop="auditRemarks">
        <el-input v-model="dataForm.auditRemarks" placeholder="请输入审核意见..." maxlength="60" rows="5" type="textarea" style="width:100%"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show(false)">取 消</el-button>
      <el-button :loading="sending" :disabled="sending" @click="save(0)">
        {{sending ?'正在保存...':'驳 回'}}
      </el-button>
      <el-button type="success" :loading="sending" :disabled="sending" @click="save(1)">
        {{sending ?'正在保存...':'批 准'}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetch, post } from "@/utils/http-client";

export default {
  name: "",
  data() {
    return {
      dialogTitle: "商户审核",
      showDialog: false,
      sending: false,
      dialogVisible: false,
      dataForm: {
        auditRemarks: ''
      },
      dataRules: {
        auditRemarks: [{required: true, message: "商户审核意见不能为空，请输入！",trigger: "blur"}]
      }
    };
  },
  async mounted() {},
  methods: {
    show(flag, data) {
      this.showDialog = flag;
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
      });
      if(data){
        this.dataForm.id = data.id
        this.dataForm.auditRemarks = ''
      }
    },

    async save(auditType) {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.sending = true;
          let params = Object.assign({}, this.dataForm);
          params.auditState = auditType==1?3:4
          //alert(JSON.stringify(params))
          const result = await post("/oss/mop/merchant/authorize",params)
          this.sending = false
          if (result.code == 200) {
            this.show(false)
            this.$message.success("审核商户资料成功！")
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