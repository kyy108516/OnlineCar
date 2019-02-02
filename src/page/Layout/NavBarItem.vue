<template>
  <div>
    <el-menu-item index="/home">工作台</el-menu-item>
    <el-submenu index="1">
      <template slot="title">车辆管理</template>
      <el-menu-item index="/car/carlist">车辆列表</el-menu-item>
      <el-menu-item index="/car/cartype">车型管理</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">司机管理</template>
      <el-menu-item index="/driver/driverlist">司机列表</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">合同管理</template>
      <el-menu-item index="/contract/contractlist">合同列表</el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
  export default {
    name: "NavBarItem"
  }
</script>

<style scoped>
  .el-submenu .el-menu-item {
    min-width: 158px;
  }

  .el-menu-item.is-active {
    color: white;
    background-color: #2bac84;
  }

  .el-menu-item {
    background-color: #35435b;
    color: white;
  }

</style>
