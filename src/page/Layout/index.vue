<template>
  <el-container>
    <el-header class="head">
      <p><router-link to="/home">是是是</router-link></p>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu>
          <el-submenu>
            <template slot="title">车辆管理</template>
            <el-menu-item-group>
              <el-menu-item @click="jump">车辆列表</el-menu-item>
              <el-menu-item >车型管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "index",
    methods:{
      jump() {
        this.$router.push('car/carlist')
      }
    }
  }
</script>

<style scoped>

</style>
