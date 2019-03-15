<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit" v-if="this.$route.params.id!=0">编辑合作伙伴</b>
        <b class="topbar-tit" v-else>新增合作伙伴</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">合作伙伴信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="company_name">
          <div class="dataReviseLabel">
            <em>*</em> 公司名称
          </div>
          <div class="dataReviseText">
            <el-input placeholder="公司名称" v-model="tabledata.company_name"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="type">
          <div class="dataReviseLabel">
            <em>*</em> 合作类型
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.type" placeholder="请选择">
              <el-option :key="1" :label="'保险公司'" :value="'保险公司'"></el-option>
              <el-option :key="2" :label="'维修厂'" :value="'维修厂'"></el-option>
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
    name: "addpartner",
    data(){
      return{
        tabledata:{
          company_name:'',
          type:'',
        },
        rules:{
          company_name:[{required:true,message:'请输入公司名称',trigger:'blur'}],
          type:[{required:true,message:'请选择类型',trigger:'change'}]
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
            axios.get(url + '/car/addPartner?company_name='+this.tabledata.company_name+'&type='+this.tabledata.type)
              .then(response => {
                this.$router.push('/system/partnerlist')
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
        axios.post(url + '/car/Partner',{
          id:id,
          company_name:'',
          type:'',
          state:'激活'
        })
          .then(response=>{
            this.tabledata.company_name=response.data.data[0].company_name
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
            axios.get(url + '/car/updatePartner?company_name='+this.tabledata.company_name+'&type='+this.tabledata.type+'&id='+this.$route.params.id)
              .then(response => {
                this.$router.push('/system/partnerlist')
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
