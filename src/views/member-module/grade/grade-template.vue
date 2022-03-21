<template>
  <el-dialog
    class="dialog"
    :title="'修改会员等级权益'"
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
      <el-form-item label="会员等级" prop="gradeName">
        <el-input v-model="dataForm.gradeName" placeholder="请输入会员等级名称..." maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="升级阈值" prop="thresholdValue">
        <el-input v-model="dataForm.thresholdValue" placeholder="请输入等级升级阈值(门槛)..." maxlength="6" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="等级权益" prop="gradeRights">
        <el-input v-model="dataForm.gradeRights" placeholder="请输入会员等级权益描述..." type="textarea" rows="5" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="请输入备注信息..."  maxlength="256" style="width:100%"></el-input>
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
  name: "",
  data() {
    return {
      dialogTitle: "编辑等级权益",
      showDialog: false,
      sending: false,
      dialogVisible: false,
      dataForm: {
        gradeName: '',
        thresholdValue:'',
        gradeRights: '',
        remarks:''
      },
      dataRules: {
        gradeName: [{required: true, message: "会员等级不能为空，请输入！",trigger: "blur"}],
        thresholdValue: [{required: true, message: "等级升级阈值不能为空，请输入！",trigger: "blur"}],
        gradeRights: [{required: true, message: "等级权益描述不能为空，请输入！",trigger: "blur"}]
      }
    };
  },
  async mounted() {
  },
  methods: {
    show(flag, data) {
      this.showDialog = flag;
      if(flag&&data){
        this.loadData(data.id);
        this.$nextTick(() => {
            this.$refs.dataForm.resetFields()
        });
      }
    },
    async loadData(id) {
      const result = await fetch("/member/grade/loading", { id: id });
      if (result.code == 200) {
          this.dataForm.id = result.data.id
          this.dataForm.gradeCode = result.data.gradeCode
          this.dataForm.gradeName = result.data.gradeName
          this.dataForm.thresholdValue = result.data.thresholdValue
          this.dataForm.gradeRights = result.data.gradeRights
          this.dataForm.remarks = result.data.remarks
      }
    },
    async save() {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.sending = true;
          let params = Object.assign({}, this.dataForm);
          const result = await post("/member/grade/update",params)
          this.sending = false
          if (result.code == 200) {
            this.show(false)
            this.$message.success("会员等级权益更新成功！")
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