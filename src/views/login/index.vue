<template>
  <div class="login-container">
    <div class="particles" id="particles"></div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
             label-position="center" size="large">

      <div class="title-container">
        <h3 class="title">您好，欢迎登录</h3>
      </div>
      <el-form-item prop="userName">
        <el-input
          ref="userName"
          v-model="loginForm.userName"
          placeholder="请输入登录账号..."
          name="userName"
          type="text"
          tabindex="1"
          autocomplete="on"
        >
          <i slot="prefix" class="el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="请输入登陆密码..."
          name="password"
          tabindex="2"
          autocomplete="on"
        >
          <img slot="prefix" src="./img/password_ic.png">
        </el-input>
      </el-form-item>
      <el-button class="btn-login" :loading="loading" size="large" type="primary" @click.native.prevent="handleLogin">{{
          loading ? '正在登录...' : '登录'
        }}</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('登录账号不能为空，请输入...'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位，请检查！'))
      } else {
      callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  async mounted() {
    // if (this.loginForm.userName === '') {
    //   this.$refs.userName.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
    await this.$store.dispatch('tagsView/delAllViews');
    this.$nextTick(() => {
      particlesJS.load('particles', './particles.json', function() {
        console.log('callback - particles.js config loaded');
      });
    })
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    async handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const result = await this.$store.dispatch('user/login', this.loginForm)
          this.loading = false
          console.info(result)
          result && this.$router.push({ path: this.redirect || '/apps/dashboard', query: this.otherQuery })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/index.scss";

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .particles {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(./img/login_bg.png) center no-repeat;
    background-size: cover;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 20px;
      color: #373f55;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .login-form {
    @include middle-center();
    width: 450px;
    padding: 50px;
    margin: 0 auto;
    overflow: hidden;
    z-index: 500;
    background-color: #fff;
    border-radius: 10px;

    .btn-login {
      display: block;
      width: 100%;
      margin-top: 30px;
      padding: 12px;
      font-size: 18px;
      letter-spacing: 5px;
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    .el-form-item__error {
      margin-top: 5px;
      font-size: 14px;
    }
    .el-input--large {
      .el-input__prefix {
        display: flex;
        align-items: center;
        left: 15px;
        color: #656870;
        i {
         font-size: 18px;
        }
      }
      .el-input__inner {
        padding-left: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
      }
    }
  }
}
</style>
