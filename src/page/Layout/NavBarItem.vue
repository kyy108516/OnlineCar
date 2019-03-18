<template>
  <!--<div>-->
    <!--<el-menu-item index="/home">工作台</el-menu-item>-->
    <!--<el-submenu index="1">-->
      <!--<template slot="title">车辆管理</template>-->
      <!--<el-menu-item index="/car/carlist">车辆列表</el-menu-item>-->
      <!--<el-menu-item index="/car/cartype">车型管理</el-menu-item>-->
    <!--</el-submenu>-->
    <!--<el-submenu index="2">-->
      <!--<template slot="title">司机管理</template>-->
      <!--<el-menu-item index="/driver/driverlist">司机列表</el-menu-item>-->
    <!--</el-submenu>-->
    <!--<el-submenu index="3">-->
      <!--<template slot="title">合同管理</template>-->
      <!--<el-menu-item index="/contract/contractlist">合同列表</el-menu-item>-->
      <!--<el-menu-item index="/contract/carchecklist">交车管理</el-menu-item>-->
      <!--<el-menu-item index="/contract/settlementlist">合同结算</el-menu-item>-->
    <!--</el-submenu>-->
    <!--<el-submenu index="4">-->
      <!--<template slot="title">运营管理</template>-->
      <!--<el-menu-item index="/operate/maintainancelist">维保管理</el-menu-item>-->
      <!--<el-menu-item index="/operate/accidentlist">事故管理</el-menu-item>-->
      <!--<el-menu-item index="/operate/insuranceremind">到期提醒</el-menu-item>-->
      <!--<el-menu-item index="/operate/violationlist">违章管理</el-menu-item>-->
      <!--<el-menu-item index="/operate/detainlist">扣车管理</el-menu-item>-->
    <!--</el-submenu>-->
    <!--<el-submenu index="5">-->
      <!--<template slot="title">财务管理</template>-->
      <!--<el-menu-item index="/account/receivablelist">应收账款</el-menu-item>-->
      <!--<el-menu-item index="/account/practicallist">实收账款</el-menu-item>-->
      <!--<el-menu-item index="/account/billlist">应付账款</el-menu-item>-->
      <!--<el-menu-item index="/account/detaillist">财务明细</el-menu-item>-->
    <!--</el-submenu>-->
    <!--<el-submenu index="6">-->
      <!--<template slot="title">用户中心</template>-->
      <!--<el-menu-item index="/system/info">用户信息</el-menu-item>-->
      <!--<el-menu-item index="/system/rolelist">角色管理</el-menu-item>-->
      <!--<el-menu-item index="/system/userlist">账户管理</el-menu-item>-->
      <!--<el-menu-item index="/system/functionset">功能设置</el-menu-item>-->
      <!--<el-menu-item index="/system/partnerlist">合作伙伴</el-menu-item>-->
    <!--</el-submenu>-->
  <!--</div>-->
   <!--如果当前item中有子节点-->
  <el-submenu v-if="item.child && item.child.length" :index="navIndex">
    <!-- 创建菜单分组 -->
    <template slot="title">{{ item.name }}</template>
    <!-- 递归调用自身，直到subItem不含有子节点 -->
    <nav-item v-for="(subItem,i) in item.child" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" >
    </nav-item>
  </el-submenu>

  <!--如果当前item不含有子节点-->
  <el-menu-item v-else :index="item.path">{{ item.name }}</el-menu-item>
</template>

<script>
  export default {
    name: "NavBarItem",
    props: ['item','navIndex']
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
