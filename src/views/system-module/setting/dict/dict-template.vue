<template>
  <el-dialog
    class="dialog"
    :title="dataForm.id ? '编辑数据类型':'创建数据类型'"
    width="500px"
    :visible.sync="showDialog">
    <el-form class="data-form" :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px" label-position="top">
      <el-form-item label="数据类型" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入数据类型名称..." :disabled="!!dataForm.id" style="width:100%"  maxlength="32"></el-input>
      </el-form-item>
      <el-form-item label="描述信息" prop="description">
        <el-input v-model="dataForm.description" placeholder="请输入描述信息..." type="textarea" style="width:100%" maxlength="256"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="default" size="mini" icon="el-icon-close" @click="show(false)">取 消</el-button>
      <el-button type="success" size="mini" icon="el-icon-check" :loading="sending" :disabled="sending" @click="save">{{sending ?
        '正在保存...':'确 定'}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetch, post } from "@/utils/http-client";

  export default {
    name: '',
    data() {
      return {
        dialogTitle: '新增数据类型',
        showDialog: false,
        sending: false,
        dataForm: {
          name: '',
          description: ''
        },
        dataRules: {
          name: [{required: true,message: '请输入数据类型名称...', trigger: 'blur'}]
        }
      }
    },

    async mounted() {
      if (this.$route.params.id) {
       // this.loadData()
      }
    },
    methods: {
      show(flag, data) {
        this.showDialog = flag;
        if (flag && data) {
         // this.loadData(data.id)
        }
        this.$nextTick(() => {
         this.$refs.dataForm.resetFields()
        })
      },
      async loadData(id) {
        // const result = await get(id)
        // if (result.code == 200) {
        //   const dataForm = {
        //     id: result.data.id,
        //     realName: result.data.realName,
        //     telphone: result.data.telphone
        //   }
        //   //this.dataForm = dataForm;
        // } else {
        //   this.$message.error(result.msg)
        // }
      },
      async save() {
        this.$refs.dataForm.validate(async(valid) => {
          if (valid) {
            this.sending = true
            let params = Object.assign({}, this.dataForm)
            const result = await post('/dict/addDict',params)
            this.sending = false
            if (result.code == 200) {
              this.show(false)
              this.$message.success('新增成功')
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

</style>
