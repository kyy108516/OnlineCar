<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">新增违章</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">违章信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="car_id">
          <div class="dataReviseLabel">
            <em>*</em> 车牌号
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.car_id" filterable placeholder="请选择"
                       @change="selectinfo(tabledata.car_id)">
              <el-option
                v-for="item in carData"
                :key="item.id"
                :label="item.license"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="happen_time">
          <div class="dataReviseLabel">
            <em>*</em> 违章时间
          </div>
          <div class="dataReviseText">
            <el-date-picker
              v-model="tabledata.happen_time"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="happen_site">
          <div class="dataReviseLabel">
            <em>*</em>违章地点
          </div>
          <div class="dataReviseText">
            <el-input placeholder="违章地点" v-model="tabledata.happen_site"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="score">
          <div class="dataReviseLabel">
            <em>*</em> 扣分
          </div>
          <div class="dataReviseText">
            <el-input placeholder="扣分" v-model="tabledata.score"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="money">
          <div class="dataReviseLabel">
            <em>*</em> 罚款
          </div>
          <div class="dataReviseText">
            <el-input placeholder="罚款" v-model="tabledata.money"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div class="dataBot">
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="submit('tabledata')">提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "addviolation",
    data() {
      return {
        tabledata: {
          contract_id: '',
          happen_site: '',
          happen_time: '',
          money: '',
          score: '',
          contract_id: '',
          driver_id: '',
        },
        carData: [],
        rules: {
          car_id: [{required: true, message: '请选择车牌', trigger: 'change'}],
          happen_time: [{required: true, message: '请选择时间', trigger: 'change'}],
          happen_site: [{required: true, message: '请输入地点', trigger: 'blur'}],
          money: [{required: true, message: '请输入罚款金额', trigger: 'blur'}],
          score: [{required: true, message: '请输入扣分', trigger: 'blur'}],
        },
        pickerOptions1: { //日期选择器
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        var url = "http://localhost:3000";
        axios.post(url + '/car/query', {
          id: '',
          license: '',
          vin: '',
          model: '',
          state: '运营中'
        })
          .then(response => {
            if (response.data.code == '200') {
              this.carData = response.data.data
            }
            if (response.data.code == '1') {
              this.carData = []
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      selectinfo(id) {
        var url = "http://localhost:3000";
        axios.post(url + '/contract/query', {
          id: '',
          type: '',
          license: id,
          name: '',
          state: '执行中',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.tabledata.driver_id = response.data.data[0].driver_id;
              this.tabledata.contract_id = response.data.data[0].id;
            }
            if (response.data.code == '1') {
              this.tabledata.driver_id = '';
              this.tabledata.contract_id = '';
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.changetime()
            var url = "http://localhost:3000";
            axios.get(url + '/contract/DetainViolation?contract_id=' + this.tabledata.contract_id)
              .then(response => {
              })
              .catch(function (error) {
                console.log(error)
              })
            axios.get(url + '/car/addViolation?car_id=' + this.tabledata.car_id + '&happen_site=' + this.tabledata.happen_site + '&happen_time=' + this.tabledata.happen_time + '&money=' + this.tabledata.money + '&score=' + this.tabledata.score + '&driver_id=' + this.tabledata.driver_id + '&contract_id=' + this.tabledata.contract_id)
              .then(response => {
                if (response.data.code == '200') {
                  this.$message({
                    message:'提交成功',
                    type:'success'
                  })
                  this.$router.push('/operate/violationlist')
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
      changetime() {
        var d1 = new Date(this.tabledata.happen_time)
        var datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        this.tabledata.happen_time = datetime1
      }
    }
  }
</script>

<style scoped>

</style>
