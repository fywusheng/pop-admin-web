<template>
  <el-dialog
    class="dialog"
    title="新增权限一级菜单"
    width="600px"
    :visible.sync="showDialog">
    <el-form class="data-form" :model="dataForm" :rules="dataRules" ref="dataForm" label-width="150px"
             label-position="top">
      <el-form-item label="所属业务" prop="bizCode">
        <el-select v-model="dataForm.bizCode" placeholder="请选择所属业务模块..." :disabled="bizDisabed" style="width:100%">
          <el-option v-for="item in bizData" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属父权限菜单" prop="pname" v-if="showType===1">
        <el-input v-model="dataForm.pname" type="input" style="width:100%" disabled></el-input>
      </el-form-item>
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入权限菜单名称..." style="width:100%" maxlength="32"></el-input>
      </el-form-item>
      <el-form-item label="权限地址(URL)" prop="url" v-if="showType===1">
        <el-input v-model="dataForm.url" placeholder="请输入权限访问地址(URL)..." style="width:100%" maxlength="256"></el-input>
      </el-form-item>
      <el-form-item label="描述信息" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="请输入权限描述信息..." style="width:100%" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="" prop="pid" v-if="showType===1">
        <el-input v-model="dataForm.pid" type="hidden" ></el-input>
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
        dialogTitle: '新增权限菜单',
        showDialog: false,
        sending: false,
        showType: 1,
        typeCode:'DICT5947',
        bizDisabed:false,
        bizData:[],
        dataForm: {
          name:'',
          url:'',
          pname:'',
          pid:'',
          remarks:'',
          bizCode:''
        },
        dataRules: {
          name: [{
            required: true,
            message: '权限菜单名称不能为空，请输入...',
            trigger: 'blur'
          }],
          bizCode: [{
            required: true,
            message: '业务类型不能为空，请选择...',
            trigger: 'blur'
          }]
        }
      }
    },
    async mounted() {
       this.loadBizData()
    },
    methods: {
      showAdd(dialogFlag, nodeFlag, data) {
        this.showDialog = dialogFlag
        this.bizDisabed = false
        if(dialogFlag){
          this.showType = nodeFlag
          if(this.showType==1){
            this.dataForm.pid = data.id
            this.dataForm.pname = data.name
            this.dataForm.bizCode = data.bizCode
            this.bizDisabed = true
          }
          else{
            this.dataForm.pid = ''
            this.dataForm.pname = ''
            this.dataForm.bizCode = ''
          }
        }
        this.dataForm.name = ''
        this.dataForm.url = ''
        this.dataForm.remarks = ''
      },

     async showEdit(dialogFlag, data){
        const result = await fetch('/permission/getPermissionById',{id:data.id})
        this.bizDisabed = true
        this.showDialog = dialogFlag
        if (result.code == 200) {
            if(result.data.parent&&Object.keys(result.data.parent).length>0){
              this.showType = 1
              this.dataForm.id = result.data.id
              this.dataForm.pid = result.data.pid
              this.dataForm.bizCode = result.data.bizCode
              this.dataForm.pname = result.data.parent.name
              this.dataForm.name = result.data.name
              this.dataForm.url = result.data.url
              this.dataForm.remarks = result.data.remarks
            }
            else{
              this.showType = 0
              this.dataForm.id = result.data.id
              this.dataForm.pid = 0
              this.dataForm.bizCode = result.data.bizCode
              this.dataForm.name = result.data.name
              this.dataForm.url = ''
              this.dataForm.remarks = result.data.remarks
            }
        } 
        else {
          this.$message.error(result.msg)
        }
      },

      show(dialogFlag){
        this.showDialog = dialogFlag
      },

      async loadBizData() {
        const result = await fetch('/biz/list',{})
        if (result.code == 200) {
          this.bizData = result.data
        } 
        else {
          this.$message.error(result.msg)
        }
      },
      async save() {
        this.$refs.dataForm.validate(async(valid) => {
          if (valid) {
            this.sending = true
            var url = this.dataForm.id?'/permission/edit':'/permission/add'
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