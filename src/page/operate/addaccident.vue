<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit" v-if="this.$route.params.id!=0">编辑事故</b>
        <b class="topbar-tit" v-else>新增事故</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">事故信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="car_id">
          <div class="dataReviseLabel">
            <em>*</em> 车牌号
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.car_id" filterable placeholder="请选择"
                       @change="selectcar(tabledata.car_id)">
              <el-option
                v-for="item in carData"
                :key="item.id"
                :label="item.license"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="driver_id">
          <div class="dataReviseLabel">
            <em>*</em> 司机
          </div>
          <div class="dataReviseText">
            <el-select v-model="tabledata.driver_id" filterable placeholder="请选择"
                       @change="selectdriver(tabledata.driver_id)">
              <el-option
                v-for="item in driverData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" >
          <div class="dataReviseLabel">
            <em>*</em>合同编号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="合同" v-model="tabledata.contract_id" disabled="true"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="happen_time">
          <div class="dataReviseLabel">
            <em>*</em> 出险时间
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
            <em>*</em>出险地点
          </div>
          <div class="dataReviseText">
            <el-input placeholder="出险地点" v-model="tabledata.happen_site"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 定损金额
          </div>
          <div class="dataReviseText">
            <el-input v-model="tabledata.money" disabled="true"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div class="dataAllHead">财务约定
        <el-button type="primary" class="button-caiwu" @click="addLine">添加</el-button>
      </div>
      <el-table
        :data="itemdata"
        style="width: 100%;padding: 0 10px">
        <el-table-column prop="type" label="财务类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.type" filterable placeholder="请选择">
              <el-option
                :label="'保险上浮费'"
                :value="'保险上浮费'">
              </el-option>
              <el-option
                :label="'车损费'"
                :value="'车损费'">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额">
          <template slot-scope="scope">
            <el-input v-model="scope.row.money" placeholder="金额" @blur="sum_money(scope.row.money)" @focus="jian(scope.row.money)"></el-input>
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
    name: "addaccident",
    data() {
      return {
        tabledata: {
          contract_id:'',
          happen_site:'',
          happen_time:'',
          money:0,
          state:'',
          car_id:'',
          driver_id:'',
        },
        itemdata: [{
          type: '',//财务类型
          money: '',
        }],
        carData: [],
        driverData:[],
        rules: {
          car_id: [{required: true, message: '请选择车牌', trigger: 'change'}],
          driver_id: [{required: true, message: '请选择司机', trigger: 'change'}],
          happen_time: [{required: true, message: '请选择日期', trigger: 'change'}],
          happen_site: [{required: true, message: '请输入地点', trigger: 'blur'}],
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
        axios.post(url + '/driver/query', {
          id: '',
          name: '',
          phone: '',
          sex: '',
          state: '是'
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
      selectcar(id){
        var url = "http://localhost:3000";
        axios.post(url + '/contract/query',{
          id: '',
          type: '',
          license: id,
          name: '',
          state:'执行中',
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
      selectdriver(id){
        var url = "http://localhost:3000";
        axios.post(url + '/contract/query',{
          id: '',
          type: '',
          license: '',
          name: id,
          state:'执行中',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.tabledata.car_id = response.data.data[0].car_id;
              this.tabledata.contract_id = response.data.data[0].id;
            }
            if (response.data.code == '1') {
              this.tabledata.car_id = '';
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
            let date = new Date();
            let id = 'SG' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
            var url = "http://localhost:3000";
            axios.get(url + '/accident/add?id='+id+'&contract_id=' + this.tabledata.contract_id + '&happen_site=' + this.tabledata.happen_site + '&happen_time=' + this.tabledata.happen_time+ '&money=' + this.tabledata.money+ '&car_id=' + this.tabledata.car_id+ '&driver_id=' + this.tabledata.driver_id)
              .then(response => {
                if (response.data.code=='200'){
                  this.$message({
                    message:'提交成功',
                    type:'success'
                  })
                }
              })
              .catch(function (error) {
                console.log(error)
              })
            axios.get(url + '/contract/DetainAccident?contract_id=' + this.tabledata.contract_id)
              .then(response => {
              })
              .catch(function (error) {
                console.log(error)
              })
            for (let i=0;i<this.itemdata.length;i++) {
              axios.get(url + '/accident/addItem?id=' +id + '&type=' + this.itemdata[i].type+'&money=' + this.itemdata[i].money)
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
            this.$router.push('/operate/accidentlist')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addLine() { //添加行数
        var newValue = {
          type: '',//财务类型
          money: '',
        };
        //添加新的行数
        this.itemdata.push(newValue);
      },
      handleDelete(index) { //删除行数
        this.itemdata.splice(index, 1)
      },
      changetime() {
        var d1 = new Date(this.tabledata.happen_time)
        var datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        this.tabledata.happen_time = datetime1
      },
      sum_money(x){
        console.log(x)
        if (x==''){
          return 0
        }
        else {
          this.tabledata.money += parseFloat(x)
        }
      },
      jian(x){
        console.log(x)
        console.log(this.tabledata.money)
        if (x==''){
          return 0
        }
        else {
          this.tabledata.money -= parseFloat(x)
        }
      },
    }
  }
</script>

<style scoped>

</style>
