<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">扣车管理</b>
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
        <el-form-item label="状态">
          <el-select v-model="queryData.state" filterable>
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              :label="'未扣车'"
              :value="'未扣车'">
            </el-option>
            <el-option
              :label="'已扣车'"
              :value="'已扣车'">
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
      <el-table ref="multipleTable" :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column prop="id" label="扣车号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="车牌号"></el-table-column>
        <el-table-column prop="name" label="司机"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="accident" label="事故次数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="violation" label="违章" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.violation}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state=='未扣车'" type="text" size="small" @click="detain(scope.row.id)">扣车</el-button>
            <el-button v-if="scope.row.state=='已扣车'" type="text" size="small" @click="removedetain(scope.row.id)">解冻</el-button>
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
    name: "detainlist",//扣车管理
    data() {
      return {
        queryData: {
          name:'',
          license: '',
          state:'',
        },
        tableData:[],
        carData: [],
        driverData:[],
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
        axios.post(url + '/contract/queryDetain',this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.tableData = response.data.data
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
        axios.post(url + '/contract/queryDetain', this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.tableData = response.data.data
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
      detain(id){
        axios.get(url + '/contract/updateDetain?state=已扣车&id='+id)
          .then(response => {
          })
          .catch(error => {
            console.log(error);
          });
        this.reload()
      },
      removedetain(id){
        axios.get(url + '/contract/updateDetain?state=已完成&id='+id)
          .then(response => {
          })
          .catch(error => {
            console.log(error);
          });
        this.reload()
      },
    },
  }
</script>

<style scoped>

</style>
