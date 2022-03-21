<template>
  <el-dialog
    class="dialog"
    :title="dataForm.id ? '编辑角色':'创建角色'"
    width="600px"
    :visible.sync="showDialog">
    <el-form class="data-form" :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px"
             label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入角色名称..." maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" placeholder="请输入描述信息..." type="textarea" maxlength="256" style="width:100%"></el-input>
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
import { fetch, post } from "@/utils/http-client";

  export default {
    name: '',
    data() {
      return {
        dialogTitle: '新增角色',
        showDialog: false,
        sending: false,
        dataForm: {
          id: '',
          name: '',
          description: ''
        },
        dataRules: {
          name: [{required: true,message: '请输入角色名称...', trigger: 'blur'}]
        }
      }
    },

    async mounted() {

    },
    methods: {
      show(flag, data) {
        this.showDialog = flag;
        if (flag && data) {
          this.loadData(data.id)
        }
        else{
          this.dataForm.id = ''
          this.dataForm.name = ''
          this.dataForm.description = ''
        }
        this.$nextTick(() => {
         this.$refs.dataForm.resetFields()
        })
      },
      async loadData(id) {
        const result = await fetch('/role/getRoleById',{id:id})
        if (result.code == 200) {
          const dataForm = {
            id: result.data.id,
            name: result.data.name,
            description: result.data.description
          }
          this.dataForm = dataForm;
        } 
        else {
          this.$message.error(result.msg)
        }
      },
      async save() {
        this.$refs.dataForm.validate(async(valid) => {
          if (valid) {
            this.sending = true
            let url = this.dataForm.id?'/role/editRole':'/role/addRole'
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

</style>
