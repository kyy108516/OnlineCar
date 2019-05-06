<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">应收账款</b>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="合同编号">
          <el-input v-model="queryData.contract_id"></el-input>
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
        <el-table-column prop="id" label="应收单号" :width="'170px'">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contract_id" label="合同编号"></el-table-column>
        <el-table-column prop="type" label="财务类型">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="应收金额" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="already_money" label="已缴金额" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.already_money}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="应收日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="账单状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small"
                       @click="collect(scope.row.id,scope.row.money,scope.row.already_money,scope.row.type)"
                       v-if="scope.row.state=='未完成'">收款
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.tableData.length"></el-pagination>
    </div>
    <el-dialog title="收款" :visible.sync="dialogFormVisible">
      <el-form :model="practicalData" :rules="rules" ref="practicalData">
        <el-form-item label="实收金额" :label-width="'120px'" prop="money">
          <el-input v-model="practicalData.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实收日期" :label-width="'120px'" prop="time">
          <el-date-picker
            v-model="practicalData.time"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('practicalData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'

  var url = "http://localhost:3000";
  export default {
    inject: ['reload'],
    name: "receiveablelist",//应收
    data() {
      return {
        dialogFormVisible: false,
        queryData: {
          contract_id: '',
        },
        practicalData: {
          money: '',
          receivable_id: '',
          time: '',
          type: '',
        },
        rowData: {
          receivable_id: '',
          money: '',
          already_money: '',
          type: '',
        },
        tableData: [],
        carData: [],
        driverData: [],
        contractData: [],
        currpage: 1,
        pagesize: 10,
        data: '',
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
        rules: {
          time: [{required: true, message: '请选择时间', trigger: 'change'}],
          money: [{required: true, message: '请输入金额', trigger: 'blur'}],
        },
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        axios.post(url + '/account/queryReceivable', this.queryData)
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
        axios.post(url + '/account/queryReceivable', this.queryData)
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(cpage) {
        this.currpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      collect(id, money, already_money, type) {
        this.rowData.receivable_id = id;
        this.rowData.money = money;
        this.rowData.already_money = already_money;
        this.rowData.type = type;
        this.dialogFormVisible = true
      },

      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var d1 = new Date(this.practicalData.time)
            var datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
            let date = new Date();
            let practical_id = 'SS' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
            this.practicalData.time = datetime1
            if (this.practicalData.money > (this.rowData.money - this.rowData.already_money)) {
              this.$message.error('实收金额大于未缴金额');
              return 0;
            }
            if (this.practicalData.money == (this.rowData.money - this.rowData.already_money)) {
              axios.get(url + '/account/updateReceivable?money=' + this.practicalData.money + '&state=已完成&id=' + this.rowData.receivable_id)
                .then(response => {
                  this.$message({
                    message:'收款成功',
                    type:'success'
                  })
                })
                .catch(error => {
                  console.log(error);
                });
              axios.get(url + '/account/addPractical?id=' + practical_id + '&receivable_id=' + this.rowData.receivable_id + '&money=' + this.practicalData.money + '&time=' + this.practicalData.time + '&type=' + this.rowData.type)
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
              axios.get(url + '/account/addDetail?id=' + practical_id + '&type=' + this.rowData.type + '&state=收入&money=' + this.practicalData.money + '&time=' + this.practicalData.time)
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
              this.reload()
            }
            if (this.practicalData.money < (this.rowData.money - this.rowData.already_money)) {
              axios.get(url + '/account/updateReceivable?money=' + this.practicalData.money + '&state=未完成&id=' + this.rowData.receivable_id)
                .then(response => {
                  this.$message({
                    message:'收款成功',
                    type:'success'
                  })
                })
                .catch(error => {
                  console.log(error);
                });
              axios.get(url + '/account/addPractical?id=' + practical_id + '&receivable_id=' + this.rowData.receivable_id + '&money=' + this.practicalData.money + '&time=' + this.practicalData.time + '&type=' + this.rowData.type)
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
              axios.get(url + '/account/addDetail?id=' + practical_id + '&type=' + this.rowData.type + '&state=收入&money=' + this.practicalData.money + '&time=' + this.practicalData.time)
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
              this.reload()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
