<template>
  <div class="main-content" v-loading="loading">
<!--    <el-breadcrumb separator="/">-->
<!--      <el-breadcrumb-item>设备信息</el-breadcrumb-item>-->
<!--    </el-breadcrumb>-->
<!--    <production></production>-->
<!--    <area-map></area-map>-->
<!--    <activate></activate>-->
   <!-- <status>1111</status> -->
  </div>
</template>
<script>
  // import Production from './production'
  // import Activate from './activate'
  // import AreaMap from './area'
  // import Status from './status'
  export default {
    name: 'DeviceStatics',
    data() {
      return {
        loading: false,
      }
    },
    components: {
      // Production,
      // Activate,
      // Status,
      // AreaMap
    },
    async mounted() {

    },
    methods: {

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
