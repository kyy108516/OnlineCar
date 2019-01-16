<template>
  <div class="side-nav" :class="layout">
    <el-menu router ref="navbar"  unique-opened>
      <nav-bar-item></nav-bar-item>
    </el-menu>
  </div>
</template>

<script>
    import NavBarItem from "@/page/Layout/NavBarItem";
    export default {
        name: "NavBar",
      components: {NavBarItem}
    }
</script>

<style scoped>
.side-nav{
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  width: 160px;
  border-right: 1px solid #ccc;
  overflow: auto;
  box-sizing: border-box;
  background-color: #35435b;
  height:100%;
}
  .el-menu{
    background-color: #35435b;
  }

</style>
