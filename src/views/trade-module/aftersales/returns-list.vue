<template>
  <div class="main-content">
    <el-row class="mb-2">
      <el-form :inline="true">
        <el-form-item label="">
          <el-input
            v-model="searchParams.orderCode"
            placeholder="请输入订单编号..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="searchParams.mobile"
            placeholder="请输入会员手机号码..."
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="loadData" size="mini">查 询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      class="custom-table"
      :data="dataList"
      :header-cell-style="{background:'#F2F6FC',color:'#000000'}"
      size="mini"
      v-loading="loading"
    >
      <div slot="empty" class="empty-wrap">
        <i class="iconfont icon-tishi"></i><span>系统暂无数据</span>
      </div>
      <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
      <el-table-column type="expand" width="20px" align="center">
        <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="订单明细">
            <span>{{ props.row.orderItemCode }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.returnsType===2" label="货物状态">
            <span>{{ props.row.goodsState==1?'未收到货':'已收到货' }}</span>
          </el-form-item>
          <el-form-item label="售后原因">
            <span>{{ props.row.reasonTypeLabel }}</span>
          </el-form-item>
          <el-form-item label="售后备注">
            <span>{{ props.row.remark }}</span>
          </el-form-item>
          <el-form-item label="退货凭证" v-if="props.row.img1||props.row.img2||props.row.img3||props.row.img4||props.row.img5">
            <el-image :src="props.row.img1" style="width: 150px; height: 130px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <el-image :src="props.row.img2" style="width: 150px; height: 130px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <el-image :src="props.row.img3" style="width: 150px; height: 130px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <el-image :src="props.row.img4" style="width: 150px; height: 130px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <el-image :src="props.row.img5" style="width: 150px; height: 130px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="所属商家">
            <span>{{ props.row.supplierId }}</span>
          </el-form-item>
          <el-form-item label="申请人">
            <span>{{ props.row.memberId }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.returnsType===2&&props.row.goodsState===2" label="承运商：">
            <span>{{ props.row.expressName }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.returnsType===2&&props.row.goodsState===2" label="快递运单：">
            <span>{{ props.row.expressNum }}</span>
          </el-form-item>
          <el-form-item label="快递凭证" v-if="props.row.returnsType===2&&props.row.goodsState===2&&(props.row.expressImg1||props.row.expressImg2||props.row.expressImg3)">
            <el-image v-if="props.row.expressImg1" :src="props.row.expressImg1" style="width: 130px; height: 120px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <el-image v-if="props.row.expressImg2" :src="props.row.expressImg3" style="width: 130px; height: 120px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <el-image v-if="props.row.expressImg3" :src="props.row.expressImg3" style="width: 130px; height: 120px">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </el-form-item>
        </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="returnsCode" label="售后编号" width="150px" align="center"></el-table-column>
      <el-table-column prop="returnsTypeLabel" label="售后类型" width="80px" align="center"></el-table-column>
      <el-table-column prop="returnsDesc" label="售后状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orderCode" label="归属订单" width="160px" align="center"></el-table-column>
      <el-table-column prop="returnsPrice" label="实付金额" width="80px" align="center"></el-table-column>
      <el-table-column prop="paidPrice" label="退款金额" width="80px" align="center"></el-table-column>
      <el-table-column prop="createdTime" label="申请时间" width="150px" align="center"></el-table-column>
      <el-table-column prop="" label="操作" width="290px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" :disabled="Number(scope.row.returnsStatus)!=-1" @click="audit(scope.row)">售后审核</el-button>
          <el-button size="mini" :disabled="Number(scope.row.returnsStatus)!=0"  @click="receiving(scope.row)">商家收货</el-button>
          <el-button size="mini" :disabled="Number(scope.row.returnsStatus)!=1" @click="appoveRefund(scope.row)">同意退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-show="totalCount > 10"
      @size-change="changeSize"
      @current-change="changePage"
      :page-size="pageSize"
      layout="total, slot, jumper, prev, pager, next"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>
<script>
import { fetch, post } from '@/utils/http-client'

export default {
  name: '',
  data() {
 
    return {
      pageNo: 1,
      pageSize: 15,
      dataList: [],
      totalCount: 20,
      loading: false,
      searchParams: {},
      dialogList: [],
      showDialog: false
    }
  },
  async mounted() {
    this.loadData()
  },
  methods: {
    changePage(pageNo) {
      this.pageNo = pageNo
      this.loadData()
    },
    changeSize(pageSize) {
      this.pageSize = pageSize
      this.pageNo = 1
      this.loadData()
    },
    async loadData() {
      this.loading = true
      const params = {
        pageNum: this.pageNo,
        pageSize: this.pageSize
      }
      Object.keys(this.searchParams).forEach((key) => {
        params[key] = this.searchParams[key]
      })
      const result = await fetch('/aftersale/returns/listByPageNo', params)
      this.loading = false
      if (result.code == 200) {
        this.$nextTick(() => {
          this.dataList = result.data.list
          this.totalCount = result.data.totalCount * 1
          //this.pageSize = result.data.limit;
        })
      } else {
        this.$message.error(result.msg)
      }
    },
    async audit(row) {
      this.$confirm("是否同意用户的售后申请，如同意则通过否则请驳回?", "平台审核确认提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "通过",
        cancelButtonText: "驳回",
        type: "warning",
      })
      .then(async () => {
          this.loading = true
          row.returnsStatus = 1;
          const result = await post('/aftersale/returns/audit', row)
          this.loading = false
          if (result.code == 200) {
            this.$message.success("售后服务审核通过！")
            this.changePage(1)
          } 
          else {
            this.$message.error(result.msg)
          }
      })
      .catch(async action => {
        if(action==='cancel'){
          this.loading = true
          row.returnsStatus = 0;
          const result = await post('/aftersale/returns/audit', row)
          this.loading = false
          if (result.code == 200) {
            this.$message.success("商品审核成功！")
            this.changePage(1)
          } 
          else {
            this.$message.error(result.msg)
          }
        }
      });
    },
    async receiving(row) {
      row.returnsStatus = 1;
      const result = await post('/aftersale/returns/receiving', row)
      if (result.code == 200) {
        this.$message.success("商家收货操作成功！")
        this.changePage(1)
      } 
      else {
        this.$message.error(result.msg)
      }
    },
    async appoveRefund(row) {
      row.returnsStatus = 1;
      const result = await post('/aftersale/returns/applyRefund', row)
      if (result.code == 200) {
        this.$message.success("商家收货操作成功！")
        this.changePage(1)
      } 
      else {
        this.$message.error(result.msg)
      }
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
