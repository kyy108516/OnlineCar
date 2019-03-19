<template>
  <div class="side-nav" :class="layout">
    <!--<el-menu router ref="navbar" unique-opened :default-active="onRoutes">-->
      <!--<nav-bar-item v-for="(item, index) in navList" :item="item" :navIndex="String(index)" :key="index"></nav-bar-item>-->
    <!--</el-menu>-->
    <el-menu router ref="navbar"  unique-opened>
      <nav-bar-item></nav-bar-item>
    </el-menu>
  </div>
</template>

<script>
  import NavBarItem from "@/page/Layout/NavBarItem";
  export default {
    name: "NavBar",
    components: {NavBarItem},
    data() {
      return {
        navList: [
          {
            path: '/home',
            name: '首页'
          },
          {
            name: '系统组件',
            child: [
              {
                name: '介绍',
                path: '/components'
              },
              {
                name: '功能类',
                child: [
                  {
                    path: '/components/permission',
                    name: '详细鉴权'
                  },
                  {
                    path: '/components/pageTable',
                    name: '表格分页'
                  }
                ]
              }
            ]
          }
        ],
      }
    },
    computed: {
      // 首次进入页面时展开当前页面所属的菜单
      onRoutes(){
        return this.$route.path
      }
    }
  }
</script>

<style scoped>
  .side-nav {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    width: 160px;
    border-right: 1px solid #ccc;
    overflow: auto;
    box-sizing: border-box;
    background-color: #35435b;
    height: 100%;
  }

  .el-menu {
    background-color: #35435b;
  }

</style>
