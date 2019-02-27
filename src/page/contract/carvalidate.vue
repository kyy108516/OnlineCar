<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">验车</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="type">
          <div class="dataReviseLabel">
            <em>*</em> 车辆信息
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车辆信息" v-model="tabledata.id"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="car_id">
          <div class="dataReviseLabel">
            <em>*</em> 合同编号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="合同编号" v-model="tabledata.id"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="id">
          <div class="dataReviseLabel">
            <em>*</em> 验车类型
          </div>
          <div class="dataReviseText">
            <el-input placeholder="验车类型" v-model="tabledata.id"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div class="dataAllHead">验车事项
        <el-button type="primary" class="button-caiwu" @click="addLine">添加</el-button>
      </div>
      <el-table
        :data="itemdata"
        style="width: 100%;padding: 0 10px">
        <el-table-column prop="type" label="描述">
          <template slot-scope="scope">
            <el-input v-model="scope.row.period" placeholder="请输入描述"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="period" label="金额">
          <template slot-scope="scope">
            <el-input v-model="scope.row.period" placeholder="请输入金额"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    name: "carvalidate",
    data() {
      return {
        tabledata: {
          type: '',
          car_id: '',
          id: '',
          startTime: '',
          endTime: '',
          driver_id: ''
        },
        itemdata: [{
          type: '',//财务类型
          period: '',//期数
          money: '',
          time: ''
        }],
        carData: [],
        driverData: [],
        rules: {
          type: [{required: true, message: '请选择合同类型', trigger: 'change'}],
          car_id: [{required: true, message: '请选择车牌', trigger: 'change'}],
          id: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
          startTime: [{required: true, message: '请选择时间', trigger: 'change'}],
          endTime: [{required: true, message: '请选择时间', trigger: 'change'}],
          driver_id: [{required: true, message: '请选择承租人', trigger: 'change'}],
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
          state: '库存'
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
        axios.post(url + '/driver/query', {
          id: '',
          name: '',
          sex: '',
          phone: '',
          state:'否',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.driverData = response.data.data
            }
            if (response.data.code == '1') {
              this.driverData = []
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
            console.log(this.tabledata.startTime)
            var url = "http://localhost:3000";
            axios.get(url + '/contract/addContract?id=' + this.tabledata.id + '&type=' + this.tabledata.type + '&car_id=' + this.tabledata.car_id+ '&driver_id=' + this.tabledata.driver_id+ '&start_time=' + this.tabledata.startTime+ '&end_time=' + this.tabledata.endTime)
              .then(response => {
                // this.$router.push('/contract/contractlist')
              })
              .catch(function (error) {
                console.log(error)
              })
            for (let i=0;i<this.itemdata.length;i++) {
              var d = new Date(this.itemdata[i].time)
              this.itemdata[i].time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
              axios.get(url + '/contract/addContractItem?id=' + this.tabledata.id + '&type=' + this.itemdata[i].type + '&period=' + this.itemdata[i].period + '&money=' + this.itemdata[i].money + '&time=' + this.itemdata[i].time)
                .then(response => {
                  // this.$router.push('/contract/contractlist')
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
            axios.get(url + '/car/updateState?state=运营中&id=' +this.tabledata.car_id)
              .then(response => {
              })
              .catch(function (error) {
                console.log(error)
              })
            axios.get(url + '/driver/updateState?state=是&id=' +this.tabledata.driver_id)
              .then(response => {
              })
              .catch(function (error) {
                console.log(error)
              })
            axios.get(url + '/validate/addValidate?contract_id=' +this.tabledata.id + '&time='+this.tabledata.startTime)
              .then(response => {
              })
              .catch(function (error) {
                console.log(error)
              })
            this.$router.push('/contract/contractlist')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addLine() { //添加行数
        var newValue = {
          type: '',//财务类型
          period: '',//期数
          money: '',
          time: ''
        };
        //添加新的行数
        this.itemdata.push(newValue);
      },
      handleDelete(index) { //删除行数
        this.itemdata.splice(index, 1)
      },
      changetime() {
        var d1 = new Date(this.tabledata.startTime)
        var d2 = new Date(this.tabledata.endTime)
        var datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        var datetime2 = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();
        this.tabledata.startTime = datetime1
        this.tabledata.endTime = datetime2
      }
    }
  }
</script>

<style scoped>

</style>
