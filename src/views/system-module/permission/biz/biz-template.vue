<template>
  <el-dialog
    class="dialog"
    :title="dataForm.id ? '编辑业务':'创建业务'"
    width="600px"
    :visible.sync="showDialog">
    <el-form class="data-form" :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px"
             label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入应用名称..." maxlength="32" style="width:100%" ></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="dataForm.icon" placeholder="请选择业务图标..." maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="系统" prop="appIds" style="width:100%">
        <el-select v-model="dataForm.appIds" placeholder="请选择所属系统的清单..." multiple style="width:100%">
          <el-option v-for="item in appOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="序号" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="请输入业务显示序号..." maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dataForm.description" placeholder="请输入业务描述信息..." type="textarea" maxlength="256" style="width:100%"></el-input>
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
        dialogTitle: '新增业务',
        showDialog: false,
        sending: false,
        appOptions:[],
        dataForm: {
          id:'',
          name:'',
          icon:'',
          appIds:[],
          sort:'',
          description:''
        },
        dataRules: {
          name: [{required: true,message: '请输入业务名称...', trigger: 'blur'}],
          appIds: [{required: true,message: '请选择所属系统...', trigger: 'blur'}],
          sort: [{required: true,message: '请输入显示序号...', trigger: 'blur'}]
        }
      }
    },

    async mounted() {
      this.loadDictItem()
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
          this.dataForm.icon = ''
          this.dataForm.description = ''
          this.dataForm.sort = ''
        }
        this.$nextTick(() => {
         this.$refs.dataForm.resetFields()
        })
      },

      async loadDictItem(){
        const result = await fetch('/dict/getDictItemByTypeCode',{typeCode:'DICT5947'})
        if(result.code == 200){
          this.appOptions = result.data
        }
        else{
          this.$message.error(result.msg)
        }
      },

      async loadData(id){
        const result = await fetch('/biz/get',{id:id})
        if(result.code == 200){
          this.dataForm.id = result.data.id
          this.dataForm.name = result.data.name
          this.dataForm.icon = result.data.icon
          this.dataForm.description = result.data.description
          this.dataForm.sort = result.data.sort
          this.dataForm.appIds = result.data.appIds
        }
        else{
          this.$message.error(result.msg)
        }
      },

      async save() {
        this.$refs.dataForm.validate(async(valid) => {
          if (valid) {
            this.sending = true
            var url = this.dataForm.id?'/biz/update':'/biz/add'
            const result = await post(url,this.dataForm)
            this.sending = false
            if (result.code == 200) {
              this.show(false)
              this.$message.success('保存成功！')
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
