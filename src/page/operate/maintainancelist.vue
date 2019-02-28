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
        <el-form-item label="合同编号">
          <el-input v-model="queryData.id"></el-input>
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
        <el-table-column prop="id" label="车牌号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="司机"></el-table-column>
        <el-table-column prop="model" label="维保类型"></el-table-column>
        <el-table-column prop="name" label="送修时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="维保金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="start_time" label="维修厂" show-overflow-tooltip></el-table-column>
        <el-table-column prop="end_time" label="送修原因" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detailSettlement(scope.row.id)">查看</el-button>
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
    name: "maintainancelist",//维保管理
    data() {
      return {
        queryData: {
          id: '',
          type: '',
          license: '',
          name: '',
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
          sex: '',
          phone: '',
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
      }
    },
  }
</script>

<style scoped>

</style>
