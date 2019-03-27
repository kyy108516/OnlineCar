<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">维保管理</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="/operate/addmaintainance/0" class="actions"><i class="el-icon-plus"></i>新增维保</router-link>
        </span>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="维修单号">
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
        <el-form-item label="状态">
          <el-select v-model="queryData.state" filterable>
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              :label="'已完成'"
              :value="'已完成'">
            </el-option>
            <el-option
              :label="'未完成'"
              :value="'未完成'">
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="维修单号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="车牌号"></el-table-column>
        <el-table-column prop="type" label="维保类型"></el-table-column>
        <el-table-column prop="send_time" label="送修时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="money" label="维保金额" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="company_name" label="维修厂" show-overflow-tooltip></el-table-column>
        <el-table-column prop="season" label="送修原因" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state=='未完成'" type="text" size="small" @click="submit(scope.row.id,scope.row.money)">完成</el-button>
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
    name: "maintainancelist",//维保管理
    data() {
      return {
        queryData: {
          id: '',
          license: '',
          state:'',
        },
        tableData:[],
        carData: [],
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
        axios.post(url + '/maintainance/query',this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.tableData = response.data.data
              for (let i=0;i<this.tableData.length;i++){
                this.tableData[i].send_time=this.timeFormat(this.tableData[i].send_time)
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
      },
      query() {
        axios.post(url + '/maintainance/query', this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.tableData = response.data.data
              for (let i=0;i<this.tableData.length;i++){
                this.tableData[i].send_time=this.timeFormat(this.tableData[i].send_time)
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
      submit(id,money){
        let date = new Date();
        let bill_id = 'YF' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
        axios.get(url + '/maintainance/update?id='+id)
          .then(response => {
            if (response.data.code=='200'){
              this.$message({
                message:'提交成功',
                type:'success'
              })
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.get(url + '/account/addBill?id=' + bill_id + '&type=维保结算&money=' + money)
          .then(response => {
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
