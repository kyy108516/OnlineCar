<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">合同结算</b>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="合同编号">
          <el-input v-model="queryData.id"></el-input>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-select filterable v-model="queryData.license">
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              v-for="item in carData"
              :key="item.id"
              :label="item.license"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="承租人">
          <el-select filterable v-model="queryData.name">
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              v-for="item in driverData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain="" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="contractData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="contract_id" label="合同编号">
          <template slot-scope="scope">
            <span>{{scope.row.contract_id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="车牌号"></el-table-column>
        <el-table-column prop="model" label="承租人"></el-table-column>
        <el-table-column prop="validatecheck" label="验车审核" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.validatecheck}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="验车号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="financecheck" label="财务审核" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.financecheck}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="结算状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.financecheck=='已完成'" type="text" size="small" @click="detailSettlement(scope.row.contract_id)">查看</el-button>
            <el-button v-if="scope.row.validatecheck=='未完成'" type="text" size="small" @click="validate(scope.row.id)">验车</el-button>
            <el-button v-if="scope.row.financecheck=='已完成'&&scope.row.state=='结算中'" type="text" size="small" @click="finishcontract(scope.row.contract_id)">合同结束</el-button>
            <el-button v-if="scope.row.financecheck=='未完成'&&scope.row.validatecheck=='已完成'" type="text" size="small" @click="finance(scope.row.contract_id)">财务审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.contractData.length"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  var url = "http://localhost:3000";
  export default {
    inject: ['reload'],
    name: "settlementlist",//合同结算
    data() {
      return {
        queryData: {
          id: '',
          type: '',
          license: '',
          name: '',
          state:'',
        },
        carData: [],
        driverData: [],
        contractData: [],
        currpage: 1,
        pagesize: 10,
        data: ''
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
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
        axios.post(url + '/driver/query', {
          id: '',
          name: '',
          sex: '',
          phone: '',
          state:'',
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
        axios.post(url + '/contract/querySettle', this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.contractData = response.data.data
            }
            if (response.data.code == '1') {
              this.contractData = []
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      query() {
        axios.post(url + '/contract/querySettle', this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.contractData = response.data.data
            }
            if (response.data.code == '1') {
              this.contractData = []
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(cpage) {
        this.currpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      detailSettlement(id){
        this.$router.push('settlementdetail/'+id)
      },
      validate(id){
        this.$router.push("carvalidate/"+id)
      },
      finance(id){
        this.$router.push("financecheck/"+id)
      },
      finishcontract(id){
        axios.get(url+"/contract/updateState?state=已完成&id="+id)
          .then(response => {
          })
          .catch(error => {
            console.log(error);
          });
        this.reload()
      }
    },
  }
</script>

<style scoped>

</style>
