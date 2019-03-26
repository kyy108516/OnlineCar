<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit" v-if="this.$route.params.id!=0">编辑司机</b>
        <b class="topbar-tit" v-else>新增司机</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">司机信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="name">
          <div class="dataReviseLabel">
            <em>*</em> 姓名
          </div>
          <div class="dataReviseText">
            <el-input placeholder="姓名" v-model="tabledata.name"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="sex">
          <div class="dataReviseLabel">
            <em>*</em> 性别
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.sex" filterable placeholder="请选择">
              <el-option
                :label="'男'"
                :value="'男'">
              </el-option>
              <el-option
                :label="'女'"
                :value="'女'">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="phone">
          <div class="dataReviseLabel">
            <em>*</em> 联系方式
          </div>
          <div class="dataReviseText">
            <el-input placeholder="联系方式" v-model="tabledata.phone"></el-input>
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
    name: "adddriver",
    data(){
      return{
        tabledata:{
          name:'',
          sex:'',
          phone:'',
        },
        rules:{
          name:[{required:true,message:'请输入车牌',trigger:'blur'}],
          sex:[{required:true,message:'请选择性别',trigger:'change'}],
          phone:[{required:true,message:'请输入联系方式',trigger:'blur'}]
        },
      }
    },
    created(){
      this.getData()
    },
    methods:{
      getData(){
        var url="http://localhost:3000";
        var id=this.$route.params.id
        axios.post(url + '/driver/query',{
          id:id,
          name:'',
          sex:'',
          phone:'',
          state:''
        })
          .then(response=>{
            this.tabledata=response.data.data[0]
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = "http://localhost:3000";
            axios.post(url + '/driver/query', {
              id:'',
              name:'',
              sex:'',
              phone:this.tabledata.phone,
              state:'',
            })
              .then(response => {
                if (response.data.code == '200') {
                  this.$message.error('已存在改手机号')
                }
                if (response.data.code == '1') {
                  axios.get(url + '/driver/addDriver?name='+this.tabledata.name+'&sex='+this.tabledata.sex+'&phone='+this.tabledata.phone)
                    .then(response => {
                      this.$message({
                        message:'提交成功',
                        type:'success',
                      })
                      this.$router.push('/driver/driverlist')
                    })
                    .catch(function (error) {
                      console.log(error)
                    })
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      edit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var id=this.$route.params.id
            var url = "http://localhost:3000";
            axios.post(url + '/driver/driverExist', {
              id:id,
              phone:this.tabledata.phone,
            })
              .then(response => {
                if (response.data.code == '200') {
                  this.$message.error('已存在该手机号')
                }
                if (response.data.code == '1') {
                  axios.get(url + '/driver/updateDriver?name='+this.tabledata.name+'&sex='+this.tabledata.sex+'&phone='+this.tabledata.phone+'&id='+this.$route.params.id)
                    .then(response => {
                      this.$message({
                        message:'编辑成功',
                        type:'success'
                      })
                      this.$router.push('/driver/driverlist')
                    })
                    .catch(function (error) {
                      console.log(error)
                    })
                }
              })
              .catch(error => {
                console.log(error);
              });
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
