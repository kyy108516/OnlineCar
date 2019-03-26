<template>
  <div class="body">
    <div class="logo1">
      <img src="../../assets/login/分组3.png">
      <div class="logo">
        <img src="../../assets/login/Group.png">
      </div>
      <h1 class="biaoti">车管360车队管理系统</h1>
      <p>打破传统模式 解决核心难题 让工作更高效 让管理更有效</p>
      <p>全方位多角度解读市场核心需求，为中国车队保驾护航</p>
    </div>
    <el-form label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
      <div class="form">
        <h1 class="login_h1">欢迎登陆</h1>
        <div class="form_item">
          <el-form-item class="login_item" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item class="login_item" style="margin-top: 30px" prop="password">
            <el-input type="password" auto-complete="off" v-model="loginForm.password" placeholder="请输入您的密码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="login('loginForm')" class="form_login">登录</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState} from 'vuex'

  export default {
    name: "login",
    data() {
      return {
        centerDialogVisible: false,
        loginForm: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      insurance: {
        get() {
          return this.$store.state.insurance
        },
      },
      contract: {
        get() {
          return this.$store.state.contract
        },
      },
      accident: {
        get() {
          return this.$store.state.accident
        },
      },
      violation: {
        get() {
          return this.$store.state.violation
        },
      },
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = "http://localhost:3000";
            var data = this.loginForm
            axios.post(url + '/users/query', {
              username: data.username,
              name: '',
              type: '激活',
            })
              .then(response => {
                if (response.data.code == '200') {
                  if (response.data.data[0].password != data.password) {
                    this.$message.error('密码错误')
                    return 0
                  } else {
                    this.$store.commit('updateUsername', response.data.data[0].username)
                    this.$router.push('home')
                  }
                }
                if (response.data.code == '1') {
                  this.$message.error('用户名不存在')
                  return 0
                }
              })
              .catch(function (error) {
                console.log(error)
              });
            axios.post(url + '/users/queryFunction')
              .then(response => {
                this.$store.commit('updateViolation', response.data.data[0].violation)
                this.$store.commit('updateAccident', response.data.data[0].accident)
                this.$store.commit('updateInsurance', response.data.data[0].insurance)
                this.$store.commit('updateContract', response.data.data[0].contract)
              })
              .catch(function (error) {
                console.log(error)
              });
            axios.post(url + '/users/queryRoleMenu', {
              username: 'kyy'
            })
              .then(response => {
                this.$store.commit('updateArray', this.translateDataToTree(response.data.data))
              })
              .catch(function (error) {
                console.log(error)
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // jump() {
      //   var url = "http://localhost:3000";
      //   axios.post(url + '/users/queryFunction')
      //     .then(response => {
      //       this.$store.commit('updateViolation', response.data.data[0].violation)
      //       this.$store.commit('updateAccident', response.data.data[0].accident)
      //       this.$store.commit('updateInsurance', response.data.data[0].insurance)
      //       this.$store.commit('updateContract', response.data.data[0].contract)
      //     })
      //     .catch(function (error) {
      //       console.log(error)
      //     });
      //   axios.post(url + '/users/queryRoleMenu',{
      //     username:'kyy'
      //   })
      //     .then(response => {
      //       this.$store.commit('updateArray', this.translateDataToTree(response.data.data))
      //     })
      //     .catch(function (error) {
      //       console.log(error)
      //     });
      //   this.$router.push('home')
      // },
      translateDataToTree(data) { //权限数组赚树
        let parents = data.filter(value => value.parent_id == 0 || value.parent_id == null)
        let children = data.filter(value => value.parent_id !== 'undefined' && value.parent_id != 0)
        let translator = (parents, children) => {
          parents.forEach((parent) => {
              children.forEach((current, index) => {
                  if (current.parent_id === parent.id) {
                    let temp = JSON.parse(JSON.stringify(children))
                    temp.splice(index, 1)
                    translator([current], temp)
                    typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
                  }
                }
              )
            }
          )
        }
        translator(parents, children)
        return parents
      },
    }
  }
</script>

<style scoped>
  .body {
    background-image: url("../../assets/login/底图.png");
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 720px;
    min-width: 1200px;
  }

  .form {
    position: absolute;
    background-color: white;
    width: 464px;
    height: 400px;
    left: 59%;
    bottom: 28%;
  }

  .login_h1 {
    font-family: PingFang-SC-Bold;
    font-size: 22px;
    color: #3695F7;
    letter-spacing: 0;
    width: 88px;
    height: 30px;
    left: 2.5%;
    margin: 48px;
  }

  .form_item {
    width: 368px;
    margin: 48px auto;
  }

  .login_item {
    margin-left: -80px;
  }

  .form_login {
    width: 100%;
    background: #3695F7;
    border-radius: 2px;
    margin-top: 20px;
  }

  .logo {
    display: table-cell;
    vertical-align: middle;
    text-align: center;

  }

  .logo1 {
    width: 500px;
    height: 400px;
    position: absolute;
    left: 15%;
    bottom: 24%;
  }

  .biaoti {
    font-family: PingFang-SC-Regular;
    font-size: 50px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 64px;
    margin-top: 20px;
  }

  p {
    font-family: PingFangSC-Light;
    font-size: 19.2px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 19.2px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
