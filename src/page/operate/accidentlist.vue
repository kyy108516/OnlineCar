<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">事故管理</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="/operate/addaccident/0" class="actions"><i class="el-icon-plus"></i>新增事故</router-link>
        </span>
      </div>
    </div>
    <div class="list-tit">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="所有"></el-tab-pane>
        <el-tab-pane label="待结案"></el-tab-pane>
        <el-tab-pane label="待理赔"></el-tab-pane>
        <el-tab-pane label="理赔完毕"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
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
        <el-form-item label="司机">
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
      <el-table ref="multipleTable" :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column prop="id" label="事故编号" width="140">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contract_id" label="合同编号" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.contract_id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="车牌号" width="90"></el-table-column>
        <el-table-column prop="name" label="司机" width="80"></el-table-column>
        <el-table-column prop="happen_site" label="出险地点" show-overflow-tooltip></el-table-column>
        <el-table-column prop="happen_time" label="出险时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="money" label="定损金额" width="90" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="事故状态" width="90" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row.id)">查看</el-button>
            <el-button v-if="scope.row.state=='待结案'" type="text" size="small" @click="submit1(scope.row.id,scope.row.contract_id,scope.row.money)">结案</el-button>
            <el-button v-if="scope.row.state=='待理赔'" type="text" size="small" @click="submit2(scope.row.id)">完成</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.tableData.length"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  var url = "http://localhost:3000";
  export default {
    inject: ['reload'],
    name: "accidentlist",//事故管理
    data() {
      return {
        queryData: {
          id: '',
          license: '',
          name: '',
          state:'',
          contract:'',
        },
        tableData:[],
        carData: [],
        driverData: [],
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
        axios.post(url + '/accident/query',this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.tableData = response.data.data
              for (let i=0;i<this.tableData.length;i++){
                this.tableData[i].happen_time=this.timeFormat(this.tableData[i].happen_time)
              }
            }
            if (response.data.code == '1') {
              this.tableData = []
            }
          })
          .catch(error => {
            console.log(error);
          });
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
      },
      query() {
        axios.post(url + '/accident/query',this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.tableData = response.data.data
              for (let i=0;i<this.tableData.length;i++){
                this.tableData[i].happen_time=this.timeFormat(this.tableData[i].happen_time)
              }
            }
            if (response.data.code == '1') {
              this.tableData = []
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
      detail(id){
        this.$router.push('accidentdetail/'+id)
      },
      handleClick(tab, event) {
        if (tab.label == '所有') {
          this.queryData.state = ''
        }
        if (tab.label == '待结案') {
          this.queryData.state = '待结案'
        }
        if (tab.label == '待理赔') {
          this.queryData.state = '待理赔'
        }
        if (tab.label == '理赔完毕') {
          this.queryData.state = '理赔完毕'
        }
        axios.post(url + '/accident/query',this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.tableData = response.data.data
              for (let i=0;i<this.tableData.length;i++){
                this.tableData[i].happen_time=this.timeFormat(this.tableData[i].happen_time)
              }
            }
            if (response.data.code == '1') {
              this.tableData = []
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      submit1(id,contract_id,money){
        let date=new Date();
        let date1=new Date(date)
        date1.setDate(date.getDate()+7)
        let time = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
        let receivable_id='YS'+date.getFullYear()+(date.getMonth()+1)+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()
        if (money!=0) {
          axios.get(url + '/account/addReceivable?id=' + receivable_id + '&contract_id=' + contract_id + '&money=' + money + '&time=' + time + '&type=事故费用')
            .then(response => {
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        axios.get(url + '/accident/update?state=待理赔&id=' + id)
          .then(response => {
            if (response.data.code=='200'){
              this.$message({
                message:'编辑成功',
                type:'success'
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        this.reload()
      },
      submit2(id){
        axios.get(url + '/accident/update?state=理赔完毕&id=' + id)
          .then(response => {
            if (response.data.code=='200'){
              this.$message({
                message:'编辑成功',
                type:'success'
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        this.reload()
      },
      timeFormat(date) {
        let d1 = new Date(date)
        let datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        return datetime1
      }
    },
  }
</script>

<style scoped>

</style>
