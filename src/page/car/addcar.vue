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
      <div class="dataAllHead">车辆信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="license">
          <div class="dataReviseLabel">
            <em>*</em> 车牌
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车牌" v-model="tabledata.license"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="vin">
          <div class="dataReviseLabel">
            <em>*</em> 车架号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车架号" v-model="tabledata.vin"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="cartype">
          <div class="dataReviseLabel">
            <em>*</em> 车型
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.cartype" filterable placeholder="车型">
              <el-option
                v-for="item in cartypeData"
                :key="item.id"
                :label="item.model"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div class="dataBot">
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="edit('tabledata')" v-if="this.$route.params.id!=0">编辑
        </el-button>
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="submit('tabledata')" v-else>提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "addcar",
    data() {
      return {
        tabledata: {
          license: '',
          cartype: '',
          vin: '',
          model: '',
          cartype1: ''
        },
        cartypeData: [],
        rules: {
          license: [{required: true, message: '请输入车牌', trigger: 'blur'}],
          vin: [{required: true, message: '请输入车架号', trigger: 'blur'}],
          cartype: [{required: true, message: '请选择车型', trigger: 'change'}]
        },
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        var url = "http://localhost:3000";
        axios.get(url + '/cartype/queryAll')
          .then(response => {
            this.cartypeData = response.data.data
          })
          .catch(error => {
            console.log(error);
          })
        var id = this.$route.params.id
        axios.post(url + '/car/query', {
          id: id,
          license: '',
          vin: '',
          model: '',
          state: ''
        })
          .then(response => {
            this.tabledata.license = response.data.data[0].license
            this.tabledata.vin = response.data.data[0].vin
            this.tabledata.model = response.data.data[0].model
            this.tabledata.cartype = response.data.data[0].model
            this.tabledata.cartype1 = response.data.data[0].cartype
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = "http://localhost:3000";
            axios.post(url + '/car/query', {
              id:'',
              license:this.tabledata.license,
              vin:this.tabledata.vin,
              model:'',
              state:''
            })
              .then(response => {
                if (response.data.code == '200') {
                  this.$message.error('该车牌号或车架号已存在')
                }
                if (response.data.code == '1') {
                  axios.get(url + '/car/addCar?license=' + this.tabledata.license + '&vin=' + this.tabledata.vin + '&cartype=' + this.tabledata.cartype)
                    .then(response => {
                      if (response.data.code == '200') {
                        this.$message({
                          message: '提交成功',
                          type: 'success'
                        })
                        this.$router.push('/car/carlist')
                      }
                      if (response.data.code == '1') {
                        this.$message.error('提交失败')
                      }
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
            if (isNaN(this.tabledata.cartype)) {
              this.tabledata.cartype = this.tabledata.cartype1
            }
            var url = "http://localhost:3000";
            axios.get(url + '/car/updateCar?license=' + this.tabledata.license + '&vin=' + this.tabledata.vin + '&cartype=' + this.tabledata.cartype + '&id=' + this.$route.params.id)
              .then(response => {
                this.$router.push('/car/carlist')
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
