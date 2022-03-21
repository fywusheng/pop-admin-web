<template>
  <el-dialog
    class="dialog"
    :title="'新增组织'"
    width="600px"
    :visible.sync="showDialog">
    <el-form class="data-form" :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px"
             label-position="top">
      <el-form-item label="所属部门" prop="pname" v-if="showType===1">
        <el-input v-model="dataForm.pname" type="input" disabled style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入部门名称..." maxlength="32" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="描述信息" prop="remarks">
        <el-input v-model="dataForm.description" placeholder="请输入部门描述..." type="textarea" style="width:100%"></el-input>
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
  import {fetch,post} from '@/utils/http-client.js'
  export default {
    name: '',
    data() {
      return {
        dialogTitle: '新增组织',
        showDialog: false,
        sending: false,
        showType: 1,
        dataForm: {
          name: '',
          pname: '',
          pid: '',
          description: ''
        },
        dataRules: {
          name: [{
            required: true,
            message: '部门名称不能为空，请输入...',
            trigger: 'blur'
          }]
        }
      }
    },
    async mounted() {

    },
    methods: {
      showAdd(dialogFlag, nodeFlag, data) {
        this.showDialog = dialogFlag
        this.showType = nodeFlag
        if(this.showType==1){
          this.dataForm.pid = data.id
          this.dataForm.pname = data.name
        }
        else{
          this.dataForm.pid = 0
        }
        this.dataForm.name = ''
        this.dataForm.description = ''
      },

      async showEdit(dialogFlag, data){
        this.showDialog = dialogFlag
        this.showType = 0
        const result = await fetch('/org/get',{id:data.id})
        if(result.code==200){
          this.dataForm.id = result.data.id
          this.dataForm.name = result.data.name
          this.dataForm.description = result.data.description
          if(data.pid!=0){
            this.showType = 1
            this.dataForm.pid = data.pid
            this.dataForm.pname = result.data.parent.name
          }
          else{
            //this.showType = 0
            this.dataForm.pid = 0
            this.dataForm.pname = ''
          }
        }
        else{
            this.$message.error(result.msg)
        }
      },

      show(dialogFlag){
        this.showDialog = dialogFlag
      },

      async save() {
        this.$refs.dataForm.validate(async(valid) => {
          if (valid) {
            this.sending = true
            let url = this.dataForm.id?'/org/update':'/org/add'
            const result = await post(url,this.dataForm)
            this.sending = false
            if (result.code == 200) {
              this.show(false)
              this.$refs.dataForm.resetFields()
              this.$message.success("操作成功！")
              this.$parent.loadData();
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
