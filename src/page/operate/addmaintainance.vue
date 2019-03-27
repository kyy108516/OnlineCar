<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit" v-if="this.$route.params.id!=0">编辑维保</b>
        <b class="topbar-tit" v-else>新增维保</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">维保信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="type">
          <div class="dataReviseLabel">
            <em>*</em> 维保类型
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.type" filterable placeholder="请选择">
              <el-option
                :label="'维修'"
                :value="'维修'">
              </el-option>
              <el-option
                :label="'保养'"
                :value="'保养'">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="id">
          <div class="dataReviseLabel">
            <em>*</em> 维保单号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="维保单号" v-model="tabledata.id"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="car_id">
          <div class="dataReviseLabel">
            <em>*</em> 车牌号
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.car_id" filterable placeholder="请选择">
              <el-option
                v-for="item in carData"
                :key="item.id"
                :label="item.license"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="send_time">
          <div class="dataReviseLabel">
            <em>*</em> 送修时间
          </div>
          <div class="dataReviseText">
            <el-date-picker
              v-model="tabledata.send_time"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd">
          <div class="dataReviseLabel">
            送修原因
          </div>
          <div class="dataReviseText">
            <el-input placeholder="送修原因" v-model="tabledata.season"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="partner_id">
          <div class="dataReviseLabel">
            <em>*</em> 维修厂家
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.partner_id" filterable placeholder="请选择">
              <el-option
                v-for="item in partnerData"
                :key="item.id"
                :label="item.company_name"
                :value="item.id">
              </el-option>
            </el-select>
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
    name: "addmiantainance",
    data() {
      return {
        tabledata: {
          type: '',
          money: '',
          car_id: '',
          id: '',
          send_time: '',
          season: '',
          partner_id: '',
          driver_id: '',
          contract_id: '',
        },
        carData: [],
        partnerData: [],
        rules: {
          type: [{required: true, message: '请选择类型', trigger: 'change'}],
          car_id: [{required: true, message: '请选择车牌', trigger: 'change'}],
          id: [{required: true, message: '请输入维保单号', trigger: 'blur'}],
          send_time: [{required: true, message: '请选择时间', trigger: 'change'}],
          money: [{required: true, message: '请输入金额', trigger: 'blur'}],
          partner_id: [{required: true, message: '请选择维修厂家', trigger: 'change'}],
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
        var id = this.$route.params.id
        axios.post(url + '/car/query', {
          id: '',
          license: '',
          vin: '',
          model: '',
          state: ''
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
        axios.get(url + '/car/queryPartner?type=维修厂')
          .then(response => {
            if (response.data.code == '200') {
              this.partnerData = response.data.data
            }
            if (response.data.code == '1') {
              this.partnerData = []
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
            axios.get(url + '/maintainance/addMaintainance?id=' + this.tabledata.id + '&type=' + this.tabledata.type + '&money=' + this.tabledata.money + '&send_time=' + this.tabledata.send_time + '&season=' + this.tabledata.season + '&partner_id=' + this.tabledata.partner_id + '&car_id=' + this.tabledata.car_id)
              .then(response => {
                if (response.data.code == '200') {
                  this.$message({
                    message:'提交成功',
                    type:'success'
                  })
                  this.$router.push('/operate/maintainancelist')
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
        var d1 = new Date(this.tabledata.send_time)
        var datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        this.tabledata.send_time = datetime1
      }
    }
  }
</script>

<style scoped>

</style>
