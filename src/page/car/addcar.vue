<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">新增车辆</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">车辆信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="brand">
          <div class="dataReviseLabel">
            <em>*</em> 车牌
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车牌" v-model="tabledata.license"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="model">
          <div class="dataReviseLabel">
            <em>*</em> 车架号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车架号" v-model="tabledata.vin"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="type">
          <div class="dataReviseLabel">
            <em>*</em> 车型
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.model" filterable placeholder="车型">
              <el-option
                v-for="item in cartypeData"
                :key="item.id"
                :label="item.model"
                :value="item.model">
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
    name: "addcar",
    data(){
      return{
        tabledata:{
          license:'',
          model:'',
          vin:''
        },
        cartypeData:[],
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
      getData(){
        var url="http://localhost:3000";
        axios.get(url + '/cartype/queryAll')
          .then(response => {
            this.cartypeData = response.data.data
          })
          .catch(error => {
            console.log(error);
          })
      },
    }
  }
</script>

<style scoped>

</style>
