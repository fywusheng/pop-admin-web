<template>
  <el-dialog
    class="dialog"
    :title="dataForm.id ? '修改退货地址':'新增退货地址'"
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
      <el-form-item label="收货人姓名" prop="exchangedName">
        <el-input v-model="dataForm.exchangedName" placeholder="请输入收货人姓名..." maxlength="64" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="exchangedPhone">
        <el-input v-model="dataForm.exchangedPhone" placeholder="请输入联系电话..." maxlength="11" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="所在省/市/区" prop="administrativeArea">
          <el-cascader
            v-model="dataForm.administrativeArea"
            :options="administrativeAreaOptions"
            placeholder="请选择所在省/市/区..."
            :props="{value:'code',label:'name',leaf:'pid',children: 'children',expandTrigger: 'hover'}"
            style="width:80%"
          ></el-cascader>
      </el-form-item>
      <el-form-item label="详情地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="请输入详细地址..."  maxlength="256" style="width:100%"></el-input>
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
      dialogTitle: "新增退货地址",
      showDialog: false,
      sending: false,
      dialogVisible: false,
      supplierOptions:[],
      administrativeAreaOptions:[],
      dataForm: {
        supplierId: '',
        exchangedName:'',
        exchangedPhone: '',
        administrativeArea:[],
        province:'',
        city:'',
        area:'',
        address:''
      },
      dataRules: {
        supplierId: [{required: true, message: "所属商家不能为空，请选择！",trigger: "blur"}],
        exchangedName: [{required: true, message: "收货人不能为空，请输入！",trigger: "blur"}],
        exchangedPhone: [{required: true, message: "联系电话不能为空，请输入！",trigger: "blur"}],
        administrativeArea: [{required: true, message: "所属省/市/区不能为空，请输入！",trigger: "blur"}],
        address: [{required: true, message: "详细地址不能为空，请输入！",trigger: "blur"}]
      }
    };
  },
  async mounted() {
      this.loadSupplierOptions()
      this.loadAdministrativeAreaOptions()
  },
  methods: {
    show(flag, data) {
      this.showDialog = flag;
      if (flag && data) {
        this.loadData(data.id);
      }
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
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

    async loadAdministrativeAreaOptions() {
      const result = await fetch("/area/getAreaTree", {});
      if (result.code == 200) {
        this.administrativeAreaOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },

    async loadData(id) {
      const result = await fetch("/wms/aftersale/exchangedaddress/loading", {id:id});
      if (result.code == 200) {
        this.dataForm.id = result.data.id
        this.dataForm.supplierId = result.data.supplierId
        this.dataForm.exchangedName = result.data.exchangedName
        this.dataForm.exchangedPhone = result.data.exchangedPhone
        this.dataForm.address = result.data.address
        this.dataForm.administrativeArea.push(result.data.province)
        this.dataForm.administrativeArea.push(result.data.city)
        this.dataForm.administrativeArea.push(result.data.area)
      } 
      else {
        this.$message.error(result.msg);
      }
    },
    async save() {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.sending = true;
          this.dataForm.province = this.dataForm.administrativeArea[0]
          this.dataForm.city = this.dataForm.administrativeArea[1]
          this.dataForm.area = this.dataForm.administrativeArea[2]
          let params = Object.assign({}, this.dataForm);
          let url = this.dataForm.id ? '/wms/aftersale/exchangedaddress/update' : '/wms/aftersale/exchangedaddress/add'
          const result = await post(url,params)
          this.sending = false
          if (result.code == 200) {
            this.show(false)
            this.$message.success("退换货收货地址保存成功！")
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