<template>
  <el-dialog
    class="dialog"
    :title="itemForm.id ? '编辑数据参数':'创建数据参数'"
    width="600px"
    :visible.sync="showDialog">
    <el-form class="data-form" :model="itemForm" :rules="dataRules" ref="itemForm" label-width="150px"
             label-position="right">
      <el-form-item label="数据类型" prop="name">
        <el-input v-model="itemForm.name" :disabled="true" maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="数据参数名" prop="label">
        <el-input v-model="itemForm.label" placeholder="请输入数据显示名称..." maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="数据参数值" prop="value">
        <el-input v-model="itemForm.value" placeholder="请输入数据显示名称..." maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="description">
        <el-input v-model="itemForm.description" placeholder="请输入备注信息..." type="textarea" maxlength="256" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="" prop="typeCode" v-if="showType===1">
        <el-input v-model="itemForm.typeCode" type="input" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show(false)">取 消</el-button>
      <el-button type="success" :loading="sending" :disabled="sending" @click="save">{{sending ? '正在保存...':'确 定'}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetch, post } from "@/utils/http-client";

  export default {
    name: '',
    data() {
      return {
        dialogTitle: '新增数据参数值',
        showDialog: false,
        sending: false,
        showType: 0,
        itemForm: {
          name: '',
          label: '',
          value: '',
          description: '',
          typeCode:''
        },
        dataRules: {
          name: [{required: true,message: '请输入数据类型...', trigger: 'blur'}],
          label: [{required: true,message: '请输入数据参数名...', trigger: 'blur'}],
          value: [{required: true,message: '请输入数据参数值...', trigger: 'blur'}]
        }
      }
    },

    async mounted() {
      if (this.$route.params.id) {
       // this.loadData()
      }
    },
    methods: {
      show(flag,data) {
        this.showDialog = flag
        if(flag&&data){
          this.$nextTick(() => {
          this.$refs.itemForm.resetFields()
          this.itemForm.name = data.typeName
          this.itemForm.typeCode = data.typeCode
          if(data.id){
            this.loadData(data.id)
          }
          else{
            this.itemForm.id = null
          }
          })
        }
      },
      async loadData(id) {
        const result = await fetch('/dict/getDictItemById',{id:id})
        if (result.code == 200) {
          this.itemForm.id = result.data.id
          this.itemForm.label = result.data.label
          this.itemForm.value = result.data.value
          this.itemForm.description = result.data.description
        } else {
          this.$message.error(result.msg)
        }
      },
      async save() {
        this.$refs.itemForm.validate(async(valid) => {
          if (valid) {
            this.sending = true
            let url = this.itemForm.id?'/dict/editDictItem':'/dict/addDictItem'
            const result = await post(url,this.itemForm)
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
