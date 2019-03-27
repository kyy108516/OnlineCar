<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">合同列表</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="/contract/addcontract/0" class="actions"><i class="el-icon-plus"></i>新增合同</router-link>
        </span>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="合同编号">
          <el-input v-model="queryData.id"></el-input>
        </el-form-item>
        <el-form-item label="合同类型">
          <el-select v-model="queryData.type" filterable placeholder="合同类型">
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              :label="'以租代购'"
              :value="'以租代购'">
            </el-option>
            <el-option
              :label="'长租'"
              :value="'长租'">
            </el-option>
          </el-select>
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
        <el-form-item label="合同状态">
          <el-select v-model="queryData.state" filterable placeholder="合同状态">
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              :label="'录入中'"
              :value="'录入中'">
            </el-option>
            <el-option
              :label="'执行中'"
              :value="'执行中'">
            </el-option>
            <el-option
              :label="'结算中'"
              :value="'结算中'">
            </el-option>
            <el-option
              :label="'已完成'"
              :value="'已完成'">
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
        <el-table-column prop="id" label="合同编号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="合同类型"></el-table-column>
        <el-table-column prop="license" label="车牌号"></el-table-column>
        <el-table-column prop="model" label="车型"></el-table-column>
        <el-table-column prop="name" label="承租人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="联系方式" show-overflow-tooltip></el-table-column>
        <el-table-column prop="start_time" label="合同起始日" show-overflow-tooltip></el-table-column>
        <el-table-column prop="end_time" label="合同到期日" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="合同状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detailContract(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="settle(scope.row.id)" v-if="scope.row.state=='执行中'">结算</el-button>
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
    name: "contractlist",
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
          state:''
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
        axios.post(url + '/contract/query', this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.contractData = response.data.data
              for (let i=0;i<this.contractData.length;i++){
                this.contractData[i].start_time=this.timeFormat(this.contractData[i].start_time)
                this.contractData[i].end_time=this.timeFormat(this.contractData[i].end_time)
              }
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
        axios.post(url + '/contract/query', this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.contractData = response.data.data
              for (let i=0;i<this.contractData.length;i++){
                this.contractData[i].start_time=this.timeFormat(this.contractData[i].start_time)
                this.contractData[i].end_time=this.timeFormat(this.contractData[i].end_time)
              }
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
      detailContract(id){
        this.$router.push('contractdetail/'+id)
      },
      settle(id){
        let date = new Date();
        date.setDate(date.getDate()+2)
        let time=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        axios.get(url+"/contract/updateState?state=结算中&id="+id)
          .then(response => {
          })
          .catch(function (error) {
            console.log(error)
          })
        axios.get(url + '/validate/addValidate?contract_id=' +id + '&time='+time+"&type=还车")
          .then(response => {
          })
          .catch(function (error) {
            console.log(error)
          })
        this.reload()
      },
      timeFormat(date){
        let d1=new Date(date)
        let datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        return datetime1
      }
    },
  }
</script>

<style scoped>

</style>
