<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit" v-if="this.$route.params.id!=0">编辑用户</b>
        <b class="topbar-tit" v-else>新增用户</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">用户信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="username">
          <div class="dataReviseLabel">
            <em>*</em> 用户名
          </div>
          <div class="dataReviseText">
            <el-input placeholder="用户名" v-model="tabledata.username" v-if="this.$route.params.id!=0" disabled="true"></el-input>
            <el-input placeholder="用户名" v-model="tabledata.username" v-else></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="password">
          <div class="dataReviseLabel">
            <em>*</em> 密码
          </div>
          <div class="dataReviseText">
            <el-input placeholder="密码" v-model="tabledata.password"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="role_id">
          <div class="dataReviseLabel">
            <em>*</em> 用户角色
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.role_id" filterable placeholder="用户角色">
              <el-option
                v-for="item in roleData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div class="dataBot">
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="edit('tabledata')" v-if="this.$route.params.id!=0">编辑</el-button>
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="submit('tabledata')" v-else>提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "adduser",
    data(){
      return{
        tabledata:{
          username:'',
          password:'',
          role_id:'',
          name:'',
        },
        roleData:[],
        rules:{
          username:[{required:true,message:'请输入用户名',trigger:'blur'}],
          password:[{required:true,message:'请输入密码',trigger:'blur'}],
          role_id:[{required:true,message:'请选择用户角色',trigger:'change'}]
        },
      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
        var url="http://localhost:3000";
        axios.post(url + '/users/queryRole',{
          id:'',
          name:'',
          state:'激活',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.roleData = response.data.data
            }
            if (response.data.code == '1') {
              this.roleData = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        var id=this.$route.params.id
        axios.post(url + '/users/query',{
          username: id,
          name: '',
          type: '激活',
        })
          .then(response=>{
            this.tabledata.username=response.data.data[0].username
            this.tabledata.role_id=response.data.data[0].name
            this.tabledata.name=response.data.data[0].role_id
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = "http://localhost:3000";
            axios.get(url + '/users/addUser?username='+this.tabledata.username+'&password='+this.tabledata.password+'&role_id='+this.tabledata.role_id)
              .then(response => {
                if (response.data.code=='200') {
                  this.$message({
                    message:'提交成功',
                    type:'success'
                  })
                  this.$router.push('/system/userlist')
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      edit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (isNaN(this.tabledata.role_id)){
              this.tabledata.role_id=this.tabledata.name
            }
            var url = "http://localhost:3000";
            axios.get(url + '/users/updateUser?password='+this.tabledata.password+'&role_id='+this.tabledata.role_id+'&username='+this.tabledata.username)
              .then(response => {
                if (response.data.code=='200') {
                  this.$message({
                    message:'编辑成功',
                    type:'success'
                  })
                  this.$router.push('/system/userlist')
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
