<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">应付账款</b>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="应付单号">
          <el-input v-model="queryData.id"></el-input>
        </el-form-item>
        <el-form-item label="财务类型">
          <el-select v-model="queryData.type" filterable>
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              :label="'维保结算'"
              :value="'维保结算'">
            </el-option>
            <el-option
              :label="'事故费用'"
              :value="'事故费用'">
            </el-option>
            <el-option
              :label="'退款结算'"
              :value="'退款结算'">
            </el-option>
            <el-option
              :label="'保险结算'"
              :value="'保险结算'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否结算">
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
        <el-table-column prop="id" label="应付单号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="财务类型">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="应付金额" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="处理日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="是否结算" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state=='未完成'" type="text" size="small" @click="pay(scope.row.id,scope.row.money,scope.row.type)">结算</el-button>
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
    name: "billlist",//应付
    data() {
      return {
        queryData: {
          id: '',
          type: '',
          state: '',
        },
        tableData: [],
        typeData: [],
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
        axios.post(url + '/account/queryBill', this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.tableData = response.data.data
              for (let i=0;i<this.tableData.length;i++){
                this.tableData[i].time=this.timeFormat(this.tableData[i].time)
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
        axios.post(url + '/account/queryBill', this.queryData)
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
      pay(id,money,type) {
        let date = new Date();
        let time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        console.log(time)
        axios.get(url + '/account/updateBill?time=' + time + '&state=已完成&id=' + id)
          .then(response => {
          })
          .catch(function (error) {
            console.log(error)
          })
        axios.get(url + '/account/addDetail?id=' + id + '&type=' + type + '&state=支出&money=' + money + '&time=' + time)
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
