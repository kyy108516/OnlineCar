<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit" v-if="this.$route.params.id!=0">编辑车辆</b>
        <b class="topbar-tit" v-else>新增车辆</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">车型信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="brand">
          <div class="dataReviseLabel">
            <em>*</em> 品牌
          </div>
          <div class="dataReviseText">
            <el-input placeholder="品牌" v-model="tabledata.brand"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="model">
          <div class="dataReviseLabel">
            <em>*</em> 车型
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车型" v-model="tabledata.model"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="type">
          <div class="dataReviseLabel">
            <em>*</em> 类型
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.type" placeholder="请选择">
              <el-option :key="1" :label="'普通'" :value="'普通'"></el-option>
              <el-option :key="2" :label="'新能源'" :value="'新能源'"></el-option>
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
        name: "addcartype",
      data(){
          return{
            tabledata:{
              brand:'',
              model:'',
              type:''
            },
            rules:{
              brand:[{required:true,message:'请输入品牌',trigger:'blur'}],
              model:[{required:true,message:'请输入车型',trigger:'blur'}],
              type:[{required:true,message:'请选择品牌',trigger:'change'}]
            },
          }
      },
      created(){
        this.getData()
      },
      methods:{
        submit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var url = "http://localhost:3000";
              axios.get(url + '/cartype/addCartype?brand='+this.tabledata.brand+'&model='+this.tabledata.model+'&type='+this.tabledata.type)
                .then(response => {
                  this.$router.push('/car/cartype')
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
        getData(){
          var url="http://localhost:3000";
          var id=this.$route.params.id
          console.log(id)
          axios.get(url + '/cartype/selectCartype?id='+ id)
            .then(response=>{
              this.tabledata.brand=response.data.data[0].brand
              this.tabledata.model=response.data.data[0].model
              this.tabledata.type=response.data.data[0].type
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        edit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var url = "http://localhost:3000";
              axios.get(url + '/cartype/updateCartype?brand='+this.tabledata.brand+'&model='+this.tabledata.model+'&type='+this.tabledata.type+'&id='+this.$route.params.id)
                .then(response => {
                  this.$router.push('/car/cartype')
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
