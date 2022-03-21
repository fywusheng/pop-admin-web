<template>
<div class="div-layout">
  <el-page-header @back="back2Prev" content="会员详情"></el-page-header>
  <el-row style="height:30px"><el-col :span="24"></el-col></el-row>
  <el-divider content-position="left"><i class="el-icon-postcard"></i>&nbsp;基本概况</el-divider>
  <el-row style="height:30px"><el-col :span="24"></el-col></el-row>
  <table width="100%">
     <tr style="height:40px">
         <td width= "30%" rowspan="7" colspan="3" align="center" valian='middle'><el-image :src="member.mainImgUrl" style="height:230px;width:220px" :fit="scale-down"></el-image></td>
         <td width= "10%" class="td-colspan-label">会员昵称：</td><td width= "25%" class="td-colspan-value">{{member.nickName}}</td>
         <td width= "10%" class="td-colspan-label">会员ID：</td><td width= "25%" class="td-colspan-value">{{member.id}}</td>
     </tr>
     <tr style="height:40px">
         <td width= "10%" class="td-colspan-label">会员姓名：</td><td width= "25%" class="td-colspan-value">{{member.name}}</td>
         <td width= "10%" class="td-colspan-label">登录账号：</td><td width= "25%" class="td-colspan-value">{{member.loginName}}</td>
     </tr>
     <tr style="height:40px">
         <td width= "10%" class="td-colspan-label">手机号码：</td><td width= "25%" class="td-colspan-value">{{member.phone}}</td>
         <td width= "10%" class="td-colspan-label">电子邮件：</td><td width= "25%" class="td-colspan-value">{{member.email}}</td>
     </tr>
     <tr style="height:40px">
         <td width= "10%" class="td-colspan-label">性别：</td><td width= "25%" class="td-colspan-value">{{member.sex}}</td>
         <td width= "10%" class="td-colspan-label">生日：</td><td width= "25%" class="td-colspan-value">{{member.birthday}}</td>
     </tr>
     <!-- <tr style="height:40px">
         <td width= "10%" class="td-colspan-label">注册渠道：</td><td width= "25%" class="td-colspan-value">{{delFlag}}</td>
         <td width= "10%" class="td-colspan-label">使用终端：</td><td width= "25%" class="td-colspan-value">{{level}}</td>
     </tr> -->
     <tr style="height:40px">
         <td width= "10%" class="td-colspan-label">注册时间：</td><td width= "25%" class="td-colspan-value">{{member.createdTime}}</td>
         <td width= "10%" class="td-colspan-label">最近登录时间：</td><td width= "25%" class="td-colspan-value">{{member.updatedTime}}</td>
     </tr>
     <tr style="height:40px">
         <td width= "10%" class="td-colspan-label">会员状态：</td><td width= "25%" class="td-colspan-value">{{member.delFlag}}</td>
         <td width= "10%" class="td-colspan-label">会员等级：</td><td width= "25%" class="td-colspan-value">{{member.level}}</td>
     </tr>
  </table>
  <el-row style="height:20px"><el-col :span="24"></el-col></el-row>
  <el-divider content-position="left"><i class="el-icon-postcard"></i>&nbsp;会员资产</el-divider>
  <el-row style="height:10px"><el-col :span="24"></el-col></el-row>
  <table width="100%">
     <tr style="height:30px">
        <td width= "30%" rowspan="2" colspan="3" align="center" valian='middle'></td>
        <td width= "10%" class="td-colspan-label">账户余额：</td><td width= "25%" class="td-colspan-value">{{member.balance}}</td>
        <td width= "10%" class="td-colspan-label">累积积分：</td><td width= "25%" class="td-colspan-value">{{member.points}}</td>
     </tr>
  </table>
  <el-row style="height:10px"><el-col :span="24"></el-col></el-row>
  <el-divider content-position="left"><i class="el-icon-postcard"></i>&nbsp;其他信息</el-divider>
  <el-row style="height:20px"><el-col :span="24"></el-col></el-row>
  <table width="90%">
     <tr style="height:30px">
     <td width="5%"></td>
     <td>
        <el-tabs v-model="activeType" type="card" @tab-click="handleClick" style="padding-top:0">
          <el-tab-pane label="收货地址" name="0"></el-tab-pane>
          <el-tab-pane label="余额变动" name="1"></el-tab-pane>
          <el-tab-pane label="积分变动" name="2"></el-tab-pane>
          <el-tab-pane label="会员卡券" name="3"></el-tab-pane>
          <!-- <el-tab-pane label="会员标签" name="4"></el-tab-pane>
          <el-tab-pane label="登录日志" name="5"></el-tab-pane> -->
      </el-tabs>
     </td>
    </tr>
  </table>
  <table width="90%">
     <tr style="height:40px">
     <td width="5%"></td>
     <td>
  <el-table
      class="custom-table"
      :data="dataList"
      size="mini"
      v-loading="loading"
      style="padding-top:0;width:100%"
    >
      <div slot="empty" class="empty-wrap">
        <i class="iconfont icon-tishi"></i><span>系统暂无数据</span>
      </div>
      <el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>
      <!-- 收货地址 -->
      <el-table-column v-if="activeType==0" prop="deliveryName" label="收货人" width="150px"></el-table-column>
      <el-table-column v-if="activeType==0" prop="deliveryPhone" label="联系电话" width="150px"></el-table-column>
      <el-table-column v-if="activeType==0" label="收货地址" :formatter="formatDeliveryAddress" show-overflow-tooltip></el-table-column>
      <el-table-column v-if="activeType==0" prop="createdTime" label="修改时间" width="150px"></el-table-column>
      <!-- 账户明细 -->
      <el-table-column v-if="activeType==1" prop="operationTypeDesc" label="变动原因" show-overflow-tooltip></el-table-column>
      <el-table-column v-if="activeType==1" label="变动金额" :formatter="formatBalanceValue" align="center" width="150px"></el-table-column>
      <el-table-column v-if="activeType==1" prop="createdTime" label="操作时间" width="150px"></el-table-column>
      <!-- 积分明细 -->
      <el-table-column v-if="activeType==2" prop="typeDes" label="变动原因" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column v-if="activeType==2" label="变动金额" :formatter="formatCouponValue" align="center" width="150px"></el-table-column>
      <el-table-column v-if="activeType==2" prop="createdTime" label="操作时间" width="150px"></el-table-column>
      <!-- 优惠券 -->
      <el-table-column v-if="activeType==3" prop="name" label="优惠券名称" show-overflow-tooltip></el-table-column>
      <el-table-column v-if="activeType==3" prop="code" label="优惠券编码" width="150px"></el-table-column>
      <el-table-column v-if="activeType==3" label="优惠券类型" :formatter="formatCouponType" width="150px"></el-table-column>
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
     </td>
     </tr>
  </table>
</div>
</template>

<script>
import { fetch, post } from "@/utils/http-client";
export default {
  async mounted() {
    this.$loading = true;
    this.activeType = 0;
    this.loadingUserInfo(this.$route.params.id);
    this.loadingDeliveryAddress(this.$route.params.id);
    this.$loading = false;
  },

  methods: {
    formatDeliveryAddress: function (row, column) {
      return row.provinceName + row.cityName + row.areaName + row.address
    },
    formatCouponType: function (row, column) {
      return row.type==0?'满赠券':row.type==1?'折扣券':row.type==2?'代金券':'--'
    },

    formatCouponValue: function (row, column) {
      return row.points * row.mathType
    },
    formatBalanceValue: function (row, column) {
      return row.operationType==0? -1 * row.value : 1 * row.value
    },

    async changePage(pageNo) {
      this.pageNo = pageNo;
      if (this.activeType === '1') {
        this.$loading = true;
        this.loadingWalletAccount(this.$route.params.id);
        this.$loading = false;
      } 
      else if (this.activeType === '2') {
        this.$loading = true;
        this.loadingPointAccount(this.$route.params.id);
        this.$loading = false;
      } 
      else {
        this.$loading = true;
        this.loadingCouponAccount(this.$route.params.id);
        this.$loading = false;
      }
    },
    async changeSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNo = 1;
      if (this.activeType === '1') {
        this.$loading = true;
        this.loadingWalletAccount(this.$route.params.id);
        this.$loading = false;
      } 
      else if (this.activeType === '2') {
        this.$loading = true;
        this.loadingPointAccount(this.$route.params.id);
        this.$loading = false;
      } 
      else {
        this.$loading = true;
        this.loadingCouponAccount(this.$route.params.id);
        this.$loading = false;
      }
    },

    async loadingDeliveryAddress(memberId) {
        const result = await fetch('/member/address/list',{memberId:memberId});
        if (result.code == 200) {
          this.dataList = result.data
          this.totalCount=result.data.length
        }
        else {
          this.$message.error(result.msg);
        }
    },

    async loadingWalletAccount(memberId) {
      const params = {
        pageNum:this.pageNo,
        pageSize:this.pageSize,
        queryObject:{
          memberId:memberId
        }
      }
      const result = await post('/member/wallet/list',params);
      if (result.code == 200) {
        this.dataList = result.data.list
        this.totalCount = result.data.totalCount * 1
      }
      else {
        this.$message.error(result.msg);
      }
    },

    async loadingPointAccount(memberId) {
      const params = {
        pageNum:this.pageNo,
        pageSize:this.pageSize,
        queryObject:{
          memberId:memberId
        }
      }
      const result = await post('/member/points/list',params);
      if (result.code == 200) {
        this.dataList = result.data.list
        this.totalCount = result.data.totalCount * 1
      }
      else {
        this.$message.error(result.msg);
      }
    },

    async loadingCouponAccount(memberId) {
      const params = {
        pageNum:this.pageNo,
        pageSize:this.pageSize,
        queryObject:{
          userId:memberId
        }
      }
      const result = await post('/member/coupons/list',params);
      if (result.code == 200) {
        this.dataList = result.data.list
        this.totalCount = result.data.totalCount * 1
      }
      else {
        this.$message.error(result.msg);
      }
    },

    async loadingUserInfo(memberId) {
        const result = await fetch('/member/getProfileById',{memberId:memberId});
        if (result.code == 200) {
          this.member.id = result.data.id
          this.member.nickName = result.data.nickName
          this.member.name = result.data.name
          this.member.loginName = result.data.loginName
          this.member.phone = result.data.phone
          this.member.email = result.data.email
          this.member.level = result.data.level
          this.member.sex = result.data.sex
          this.member.birthday = result.data.birthday
          this.member.constellation = result.data.constellation
          this.member.picurl = result.data.picurl
          this.member.province = result.data.province
          this.member.city = result.data.city
          this.member.area = result.data.area
          this.member.address = result.data.address
          this.member.createdTime = result.data.createdTime
          this.member.updatedTime = result.data.updatedTime
          this.member.delFlag = result.data.delFlag
          this.member.points = result.data.points
          this.member.balance = result.data.balance
        }
        else {
             this.$message.error(result.msg);
        }
      },

    handleClick(tab, event) {
      this.dataList = []
      this.pageNo = 1
      this.totalCount = 0
      if (this.activeType === '0') {
        this.$loading = true;
        this.loadingDeliveryAddress(this.$route.params.id);
        this.$loading = false;
      } 
      else if (this.activeType === '1') {
        this.$loading = true;
        this.loadingWalletAccount(this.$route.params.id);
        this.$loading = false;
      } 
      else if (this.activeType === '2') {
        this.$loading = true;
        this.loadingPointAccount(this.$route.params.id);
        this.$loading = false;
      } 
      else {
        this.$loading = true;
        this.loadingCouponAccount(this.$route.params.id);
        this.$loading = false;
      }
    },

    back2Prev(){
      this.$router.back();
    }
  },

  data() {
    return {
      dataList:[],
      pageNo:1,
      pageSize:10,
      totalCount:0,
      loading: false,
      activeType:0,
      member:{
        id:"",//'会员主表 会员基本信息，会员级别',
        loginName:"",//'登录账号',
        nickName:"",//'会员昵称',
        name:"",//'姓名',
        phone:"",//'手机号 唯一',
        email:"",//'邮件',
        level:"",//'会员等级',
        sex:1,//'1 男 2 女',
        birthday:"",//'生日',
        constellation:"",//'星座',
        picurl:"",//'头像地址',
        province:"",//'省',
        city:"",//'市',
        area:"",//'区',
        address:"",//'详细地址',
        createdTime:"",//'创建时间',
        updatedTime:"",//'变更时间',
        delFlag:0,//'默认 1  被禁用0',
        points:0,//积分
        balance:0.00,//余额
      }
    };
  },
};
</script>
<style>
.div-layout{
  padding: 10px 20px;
}
.td-colspan-label {
   text-align:right;font-size:12px
}
.td-colspan-value {
  text-align:left;font-size:12px;font-weight:550;
}
</style>
