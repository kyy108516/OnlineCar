<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">违章管理</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="/operate/addviolation" class="actions"><i class="el-icon-plus"></i>新增违章</router-link>
        </span>
      </div>
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
        <el-form-item label="是否处理">
          <el-select v-model="queryData.state" filterable>
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              :label="'是'"
              :value="'是'">
            </el-option>
            <el-option
              :label="'否'"
              :value="'否'">
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
        <el-table-column prop="id" label="违章单号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="车牌号"></el-table-column>
        <el-table-column prop="name" label="司机"></el-table-column>
        <el-table-column prop="happen_site" label="违章地点" show-overflow-tooltip></el-table-column>
        <el-table-column prop="happen_time" label="违章时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="score" label="扣分" show-overflow-tooltip></el-table-column>
        <el-table-column prop="money" label="罚款" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="是否处理" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state=='否'" type="text" size="small" @click="handleviolation(scope.row.id)">处理</el-button>
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
    name: "violationlist",//违章管理
    data() {
      return {
        queryData: {
          state:'',
          license: '',
          name: '',
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
        axios.post(url + '/car/queryViolation',this.queryData)
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
      query() {
        axios.post(url + '/car/queryViolation',this.queryData)
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
      handleviolation(id){
        axios.get(url + '/car/updateViolation?id='+id)
          .then(response => {
            if (response.data.code=='200'){
              this.$message({
                message:'编辑成功',
                type:'success'
              })
            }
          })
          .catch(error => {
            console.log(error);
          });
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
