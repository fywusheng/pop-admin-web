<template>
  <header v-loading="loading">

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeIndex"
        class="side-menu-list sub-menu-list"
        :router="true"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <template v-for="nav in navList">
          <!--template-->
          <el-submenu :key="nav.id" :index="nav.id">
            <template slot="title">
              <i class="iconfont" :class="nav.icon"/>
              <span slot="title">{{ nav.name }}</span>
            </template>
            <el-menu-item
              :index="subMenu.url"
              v-for="(subMenu, subIndex) in nav.children"
              :key="subIndex"
              @click="menuClick(subMenu)"
            >
              <span slot="title">{{ subMenu.name }}</span>
            </el-menu-item>
          </el-submenu>
          <!--/template-->
        </template>
      </el-menu>
    </el-scrollbar>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchMenuList } from '@/api/sys'
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
      return this.$store.getters['sidebar/navList']
    },
    variables() {
      return variables
    }
  },
  components: { },
  async mounted() {

  },
  methods: {
    menuClick(nav) {
    }
  }
}
</script>


<style lang="scss" rel="stylesheet/scss">
.sub-menu-list {
  .el-submenu__title, .el-menu-item {
    font-size: 13px!important;
  }
}
.sidebar {
  position: relative;
  background-color: #fff;

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 100px);
    }
  }
  .side-menu-list {
    padding-top: 10px;
    box-sizing: border-box;
    height: 100vh;
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
        font-weight: 5px;
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
