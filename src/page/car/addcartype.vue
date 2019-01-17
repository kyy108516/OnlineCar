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
      <div class="dataRevise">
        <div class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 品牌
          </div>
          <div class="dataReviseText">
            <el-input placeholder="品牌" v-model="tabledata.brand"></el-input>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
      <div class="dataBot">
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="edit" v-if="this.$route.params.id!=0">编辑</el-button>
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="submit" v-else>提交</el-button>
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
              brand:''
            }
          }
      },
      created(){
        this.getData()
      },
      methods:{
        submit() {
          var url = "http://localhost:3000";
          axios.get(url + '/cartype/addCartype?brand='+this.tabledata.brand)
            .then(response => {
              this.$router.push('/car/cartype')
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        getData(){
          var url="http://localhost:3000";
          var id=this.$route.params.id
          console.log(id)
          axios.get(url + '/cartype/selectCartype?id='+ id)
            .then(response=>{
              this.tabledata.brand=response.data.data[0].brand
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        edit() {
          var url = "http://localhost:3000";
          axios.get(url + '/cartype/updateCartype?brand='+this.tabledata.brand+'&id='+this.$route.params.id)
            .then(response => {
              this.$router.push('/car/cartype')
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      }
    }
</script>

<style scoped>

</style>
