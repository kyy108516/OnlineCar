<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">新增保险</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">保险信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="id">
          <div class="dataReviseLabel">
            <em>*</em> 保险单号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="保险单号" v-model="tabledata.id"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="type">
          <div class="dataReviseLabel">
            <em>*</em> 保险类型
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.type" filterable placeholder="请选择">
              <el-option
                :label="'交强险'"
                :value="'交强险'">
              </el-option>
              <el-option
                :label="'商业险'"
                :value="'商业险'">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="partner_id">
          <div class="dataReviseLabel">
            <em>*</em> 保险公司
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.partner_id" filterable placeholder="请选择">
              <el-option
                v-for="item in insuranceData"
                :key="item.id"
                :label="item.company_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="start_time">
          <div class="dataReviseLabel">
            <em>*</em> 起始日
          </div>
          <div class="dataReviseText">
            <el-date-picker
              v-model="tabledata.start_time"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="end_time">
          <div class="dataReviseLabel">
            <em>*</em> 到期日
          </div>
          <div class="dataReviseText">
            <el-date-picker
              v-model="tabledata.end_time"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="money">
          <div class="dataReviseLabel">
            <em>*</em> 金额
          </div>
          <div class="dataReviseText">
            <el-input placeholder="金额" v-model="tabledata.money"></el-input>
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
    name: "addinsurance",
    data() {
      return {
        tabledata: {
          id: '',
          type: '',
          partner_id: '',
          start_time: '',
          end_time: '',
          car_id: this.$route.params.id,
          money: ''
        },
        insuranceData: [],
        rules: {
          id: [{required: true, message: '请输入保险单号', trigger: 'blur'}],
          type: [{required: true, message: '请选择保险类型', trigger: 'change'}],
          partner_id: [{required: true, message: '请选择保险公司', trigger: 'change'}],
          start_time: [{required: true, message: '请选择日期', trigger: 'change'}],
          end_time: [{required: true, message: '请选择日期', trigger: 'change'}],
          money: [{required: true, message: '请输入金额', trigger: 'blur'}],
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
        axios.get(url + '/car/queryPartner?type=保险公司')
          .then(response => {
            this.insuranceData = response.data.data
          })
          .catch(error => {
            console.log(error);
          })
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isTrue(this.tabledata.start_time, this.tabledata.end_time)) {
              this.changetime()
              let date = new Date();
              let bill_id = 'YF' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
              console.log(this.tabledata.end_time)
              var url = "http://localhost:3000";
              axios.get(url + '/car/addInsurance?id=' + this.tabledata.id + '&type=' + this.tabledata.type + '&partner_id=' + this.tabledata.partner_id + '&car_id=' + this.tabledata.car_id + '&start_time=' + this.tabledata.start_time + '&end_time=' + this.tabledata.end_time + '&money=' + this.tabledata.money)
                .then(response => {
                  if (response.data.code == '200') {
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    })
                    this.$router.go(-1)
                  }
                  if (response.data.code == '1') {
                    this.$message.error('提交失败')
                  }
                })
                .catch(function (error) {
                  console.log(error)
                })
              axios.get(url + '/account/addBill?id=' + bill_id + '&type=保险结算&money=' + this.tabledata.money)
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
            else {
              this.$message.error('保险到期日需要晚于起始日')
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changetime() {
        var d1 = new Date(this.tabledata.start_time)
        var d2 = new Date(this.tabledata.end_time)
        var datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        var datetime2 = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();
        this.tabledata.start_time = datetime1
        this.tabledata.end_time = datetime2
      },
      isTrue(date1, date2) {
        var d1 = new Date(date1)
        var d2 = new Date(date2)
        if (d1.getTime()<d2.getTime()){
          return 1
        }else {
          return 0
        }
      },
    }
  }
</script>

<style scoped>

</style>
