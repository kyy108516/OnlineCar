<template>
  <div class="wrapper">
    <template>
      <header-bar v-once>
        <p slot="logo"><router-link to="/home">车管助手</router-link></p>
      </header-bar>
      <nav-bar></nav-bar>
    </template>
    <div class="sys-content" >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "@/page/Layout/HeaderBar";
  import NavBar from "@/page/Layout/NavBar";
  export default {
    name: "index",
    components: {NavBar, HeaderBar},
    methods: {
      jump() {
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
p{
  margin: 0;
  padding: 0;
}
.sys-content{
  left: 160px;
  top: 60px;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
a{
    text-decoration: none;
    color: white;
    font-size: 20px;
}
</style>
