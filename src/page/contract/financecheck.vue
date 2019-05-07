<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">财务审核</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">财务信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" >
          <div class="dataReviseLabel">
            <em>*</em>合同编号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="合同" v-model="tabledata.contract_id" disabled="true"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 车牌号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="" v-model="tabledata.license" disabled="true"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 承租人
          </div>
          <div class="dataReviseText">
            <el-input placeholder="出险地点" v-model="tabledata.name" disabled="true"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="time">
          <div class="dataReviseLabel">
            <em>*</em> 收付款日期
          </div>
          <div class="dataReviseText">
            <el-date-picker
              v-model="tabledata.time"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="finance_money">
          <div class="dataReviseLabel">
            <em>*</em>账单金额
          </div>
          <div class="dataReviseText">
            <el-input placeholder="0" v-model="tabledata.finance_money" disabled="true"></el-input>
          </div>
          <p v-if="this.tabledata.finance_money>0" style="margin: 0;color: red;">注：将会生成一笔{{tabledata.finance_money}}元的应收账单</p>
          <p v-if="this.tabledata.finance_money<0" style="margin: 0;color: red;">注：将会生成一笔{{finance_money_fu}}元的应付账单</p>
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
                :label="'押金'"
                :value="'押金'">
              </el-option>
              <el-option
                :label="'其他'"
                :value="'其他'">
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
    name: "financecheck",
    data() {
      return {
        tabledata: {
          contract_id:'',
          license:'',
          name:'',
          time:'',
          finance_money:0,
        },
        finance_money_fu:0,
        itemdata: [{
          type: '验车审核',//财务类型
          money: 0,
        }],
        rules: {
          time: [{required: true, message: '请选择日期', trigger: 'change'}],
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
        axios.post(url+"/contract/query",{
          id: id,
          type: '',
          license: '',
          name: '',
          state:'',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.tabledata.contract_id = response.data.data[0].id;
              this.tabledata.license = response.data.data[0].license;
              this.tabledata.name = response.data.data[0].name;
            }
            if (response.data.code == '1') {
              this.tabledata.contract_id = '';
              this.tabledata.license = '';
              this.tabledata.name = '';
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/validate/query',{
          id:'',
          contract_id:id,
          state:'',
          type:'',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.itemdata[0].money = response.data.data[1].money-response.data.data[0].money
              this.tabledata.finance_money = response.data.data[1].money-response.data.data[0].money
              this.finance_money_fu=-this.tabledata.finance_money
            }
            if (response.data.code == '1') {
              this.itemdata[0].money = 0
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
            var url = "http://localhost:3000";
            this.changetime()
            let date = new Date();
            if (this.tabledata.finance_money<0){
              let money=0-this.tabledata.finance_money
              let bill_id = 'YF' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
              axios.get(url + '/account/addBill?id=' + bill_id + '&type=尾款结算&money=' + money)
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
              axios.get(url + '/contract/updateSettleFinance?financecheck=已完成&finance_money='+money+'&id=' + this.tabledata.contract_id)
                .then(response => {
                  this.$router.push('/contract/settlementlist')
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
            if (this.tabledata.finance_money>0){
              let receivable_id = 'YS' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
              axios.get(url + '/account/addReceivable?id='+receivable_id+'&contract_id=' + this.tabledata.contract_id+'&money='+this.tabledata.finance_money+'&time='+this.tabledata.time+'&type=尾款结算')
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
              axios.get(url + '/contract/updateSettleFinance?financecheck=已完成&finance_money='+this.tabledata.finance_money+'&id=' + this.tabledata.contract_id)
                .then(response => {
                  this.$router.push('/contract/settlementlist')
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
            for (let i=0;i<this.itemdata.length;i++) {
              axios.get(url + '/contract/addSettleItem?id=' +this.tabledata.contract_id + '&type=' + this.itemdata[i].type+'&money=' + this.itemdata[i].money)
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
            this.$router.push('/contract/settlementlist')
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
        var d1 = new Date(this.tabledata.time)
        var datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        this.tabledata.time = datetime1
      },
      sum_money(x){
        if (x==''){
          return 0
        }
        else {
          this.tabledata.finance_money += parseFloat(x)
          this.finance_money_fu=-this.tabledata.finance_money
        }
      },
      jian(x){
        if (x==''){
          return 0
        }
        else {
          this.tabledata.finance_money -= parseFloat(x)
          this.finance_money_fu=-this.tabledata.finance_money
        }
      },
    }
  }
</script>

<style scoped>

</style>
