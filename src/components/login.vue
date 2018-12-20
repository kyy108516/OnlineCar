<template>
  <div class="body">
    <div class="form">
      <el-form  label-width="80px" :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="jump">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "login",
      data(){
          return{
            loginForm:{
              username:"",
              password:"",
            },
            rules:{

            }
          }
      },
      methods:{
          jump(){
            var url="http://localhost:3000";
            let data=this.loginForm;
            axios.get(url+'/users/addUser?user_id='+data.username+'&user_password='+data.password)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error)
              })

          }
      }
    }
</script>

<style scoped>
.body{
  position: absolute;
  background-color: #324057;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.form{
  position: absolute;
  background-color: white;
  width:500px;
  height: 300px;
  left: 35%;
  margin-top: 300px;
}

</style>
