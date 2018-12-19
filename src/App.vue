<template>
  <div id="app">
    <el-container>
      <el-header class="head">Header</el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu :default-openeds="['1','6']">
            <el-submenu index="1">
              <template slot="title">运营管理</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">到期提醒</el-menu-item>
                <el-menu-item index="1-2">事故管理</el-menu-item>
                <el-menu-item index="1-3">维保管理</el-menu-item>
                <el-menu-item index="1-4">验车管理</el-menu-item>
                <el-menu-item index="1-5">违章管理</el-menu-item>
                <el-menu-item index="1-6">扣车管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">车辆管理</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">车辆列表</el-menu-item>
                <el-menu-item index="2-2">车型管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">司机管理</template>
              <el-menu-item-group>
                <el-menu-item index="3-1">司机列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">合同管理</template>
              <el-menu-item-group>
                <el-menu-item index="4-1">签约管理</el-menu-item>
                <el-menu-item index="4-2">交车管理</el-menu-item>
                <el-menu-item index="4-3">合同结算</el-menu-item>
                <el-menu-item index="4-4">合同收款</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
}
  .head{
    background-color: dodgerblue;
  }
  .aside{
    background-color: gray;
  }
</style>
