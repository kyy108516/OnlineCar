<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">交车管理</b>
      </div>
    </div>
    <div class="list-tit">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="所有"></el-tab-pane>
        <el-tab-pane label="未验车"></el-tab-pane>
        <el-tab-pane label="已验车"></el-tab-pane>
        <el-tab-pane label="已完成"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="验车号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="车牌号"></el-table-column>
        <el-table-column prop="vin" label="车架号"></el-table-column>
        <el-table-column prop="model" label="车型"></el-table-column>
        <el-table-column prop="time" label="验车时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="处理状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contract_id" label="合同编号" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="validate(scope.row.id)" v-if="scope.row.state=='已验车'">交车</el-button>
            <el-button type="text" size="small" @click="validate(scope.row.id)" v-if="scope.row.state=='未验车'">验车</el-button>
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
    name: "carchecklist",//交车管理
    data() {
      return {
        queryData: {
          state:''
        },
        tableData:[],
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
        axios.post(url + '/validate/query',this.queryData)
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
      handleClick(tab, event) {
        if (tab.label == '所有') {
          this.queryData.state = ''
        }
        if (tab.label == '未验车') {
          this.queryData.state = '未验车'
        }
        if (tab.label == '已验车') {
          this.queryData.state = '已验车'
        }
        if (tab.label == '已完成') {
          this.queryData.state = '已完成'
        }
        var url = "http://localhost:3000";
        axios.post(url + '/validate/query', this.queryData)
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
      // deleteDriver(id) {
      //   var url = "http://localhost:3000";
      //   axios.get(url + "/driver/deleteDriver?id=" + id)
      //     .then(response => {
      //       console.log(response)
      //       this.reload()
      //     })
      //     .catch(function (error) {
      //       console.log(error)
      //     })
      // },
      // editDriver(id){
      //   this.$router.push('adddriver/'+id)
      // },
      validate(id){
        this.$router.push('carvalidate/'+id)
      }
    },
  }
</script>

<style scoped>

</style>
