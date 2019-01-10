<template>
  <div class="sys-header">
    <div class="logo">
      <slot name="logo"></slot>
    </div>
    <div class="userInfo">
      <ul>
        <li class="user-li">
          <el-dropdown>
            <span class="user">应么乱<i class="el-icon-caret-bottom el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout"><i class="el-icon-close"></i>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "HeaderBar"
    }
</script>

<style scoped>
  .sys-header{
    width: 100%;
    height: 60px;
    background-color: #52bab5;
    z-index: 500;
    top: 0;
    left: 0;
  }
  .logo{
    float: left;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
  }
  .userInfo{
    float: right;
    height: 60px;
  }
  ul{
    list-style: none;
    vertical-align: top;
    margin: 0;
  }
  .user-li{
    display: inline-block;
    height: 60px;
    line-height: 60px;
    margin-right: 20px;
  }
  .user{
    color: white;
  }
  .el-icon-close{
    margin-left: -10px;
    margin-right: 5px;
  }
  .wrapper{
    margin: 0;
    padding: 0;
  }
</style>
