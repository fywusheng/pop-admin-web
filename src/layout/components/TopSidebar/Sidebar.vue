<template>
  <header v-loading="loading">

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :style="{ minHeight: contentHeight }"
        :default-active="activeIndex"
        class="side-menu-list"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-menu-item :index="nav.code" @click="menuClick(nav)" :key="nav.code" v-for="nav in navList">
          <i class="iconfont" :class="nav.icon"/>
          <span slot="title">{{ nav.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { bizList, fetchMenuList } from '@/api/sys'
import variables from '@/styles/variables.scss'

export default {
  name: 'Sidebar',
  data() {
    return {
      activeIndex: location.hash.substr(1).split('/').splice(0, 3).join('/'),
      contentHeight: window.innerHeight - 100 + 'px',
      loading: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'name']),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    navList() {
      return this.$store.getters['sidebar/topNavList']
    },
    variables() {
      return variables
    }
  },
  components: {},
  async mounted() {
    this.loading = true
    this.$store.dispatch('sidebar/updateTopNavList', [])
    const navRes = await bizList()
    this.loading = false
    if (navRes.code == 200) {
      this.$store.dispatch('sidebar/updateTopNavList', navRes.data);
      this.menuClick(navRes.data[0])
    } else {
      this.$message.error(navRes.message)
    }
  },
  methods: {
    async menuClick(nav) {
      const navRes = await fetchMenuList({
        bizCode: nav.code
      })
      this.loading = false
      if (navRes.code == 200) {
        this.$store.dispatch('sidebar/updateNavList', navRes.data)
      } else {
        this.$message.error(navRes.msg)
      }
    }
  }
}
</script>


<style lang="scss" rel="stylesheet/scss">
.sidebar {
  position: relative;
  background-color: rgb(5, 5, 5);

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 100px);
    }
  }

  .side-menu-list {
    padding-top: 10px;
    box-sizing: border-box;

    .el-menu-item {
      display: flex;
      align-items: center;
      padding-left: 10px;
      height: 10px;
      line-height: 10px;
      font-size: 5px;
      font-weight: 0;

      .iconfont {
        margin-right: 10px;
      }

      .menu-icon,
      .menu-icon-active {
        width: 10px;
        margin-right: 10px;
      }

      .menu-icon {
        display: inline-block;
      }

      .menu-icon-active {
        display: none;
      }

      &.is-active {
        font-weight: 0;

        .menu-icon {
          display: none;
        }

        .menu-icon-active {
          display: inline-block;
        }
      }
    }

    .el-submenu {
      .el-submenu__title {
        padding-left: 0 !important;
        height: 10px;
        line-height: 10px;
        font-size: 5px;
      }

      .iconfont {
        padding-left: 1px;
        margin-right: 1px;
      }

      .menu-icon,
      .menu-icon-active {
        width: 10px;
        margin-right: 10px;
      }

      .menu-icon {
        display: inline-block;
      }

      .menu-icon-active {
        display: none;
      }

      &.is-active {
        font-weight: 10;

        .menu-icon {
          display: none;
        }

        .menu-icon-active {
          display: inline-block;
        }
      }

      .el-menu-item {
        min-width: 10px;
      }
    }
  }
}
</style>
