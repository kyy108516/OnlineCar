<template>
  <el-submenu index="1">
    <template slot="title">车辆管理</template>
    <el-menu-item index="/car/carlist">车辆列表</el-menu-item>
    <el-menu-item index="/car/cartype">车型管理</el-menu-item>
  </el-submenu>
</template>

<script>
    export default {
        name: "NavBarItem"
    }
</script>

<style scoped>

</style>
