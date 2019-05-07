<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">合同详情</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <el-tabs :tab-position="tabPosition" style="height: auto" class="detail-tab">
        <el-tab-pane label="合同">
          <div class="dataAllHead">合同信息</div>
          <div class="dataDetail">
            <div class="dataDetailTd">
              <div class="dataDetailLabel">合同编号:</div>
              <div class="dataDetailText">
                <span>{{contract.id}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">合同类型:</div>
              <div class="dataDetailText">
                <span>{{contract.type}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">合同状态:</div>
              <div class="dataDetailText">
                <span>{{contract.state}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车牌号:</div>
              <div class="dataDetailText">
                <span>{{contract.id}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车型:</div>
              <div class="dataDetailText">
                <span>{{contract.model}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车架号:</div>
              <div class="dataDetailText">
                <span>{{contract.vin}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">承租人:</div>
              <div class="dataDetailText">
                <span>{{contract.name}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">联系方式:</div>
              <div class="dataDetailText">
                <span>{{contract.phone}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">合同起始日:</div>
              <div class="dataDetailText">
                <span>{{contract.start_time}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">合同到期日:</div>
              <div class="dataDetailText">
                <span>{{contract.end_time}}</span>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </el-tab-pane>
        <el-tab-pane label="事故">
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable"
                      :data="this.accident.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="id" label="事故编号">
                <template slot-scope="scope">
                  <span>{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="happen_site" label="出险地点" show-overflow-tooltip></el-table-column>
              <el-table-column prop="happen_time" label="出险时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="money" label="定损金额" show-overflow-tooltip></el-table-column>
              <el-table-column prop="state" label="事故状态" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.accident.length"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="违章">
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable"
                      :data="this.violation.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="id" label="违章单号">
                <template slot-scope="scope">
                  <span>{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="happen_site" label="违章地点" show-overflow-tooltip></el-table-column>
              <el-table-column prop="happen_time" label="违章时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="score" label="扣分" show-overflow-tooltip></el-table-column>
              <el-table-column prop="money" label="罚款" show-overflow-tooltip></el-table-column>
              <el-table-column prop="state" label="是否处理" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.violation.length"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="财务约定">
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable"
                      :data="this.item.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="type" label="财务类型"></el-table-column>
              <el-table-column prop="period" label="期数" show-overflow-tooltip></el-table-column>
              <el-table-column prop="money" label="金额" show-overflow-tooltip></el-table-column>
              <el-table-column prop="time" label="第一次付款日期" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.item.length"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="应收账单">
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable"
                      :data="this.receivable.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="id" label="应收单号"></el-table-column>
              <el-table-column prop="type" label="财务类型" show-overflow-tooltip></el-table-column>
              <el-table-column prop="money" label="应收金额" show-overflow-tooltip></el-table-column>
              <el-table-column prop="already_money" label="已缴金额" show-overflow-tooltip></el-table-column>
              <el-table-column prop="time" label="应收日期" show-overflow-tooltip></el-table-column>
              <el-table-column prop="state" label="账单状态" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.receivable.length"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="验车">
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable"
                      :data="this.validate.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="id" label="验车单号"></el-table-column>
              <el-table-column prop="description" label="描述" show-overflow-tooltip></el-table-column>
              <el-table-column prop="money" label="金额" show-overflow-tooltip></el-table-column>
              <el-table-column prop="type" label="类型" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.validate.length"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="结算事项">
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable"
                      :data="this.settle.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="type" label="类型" show-overflow-tooltip></el-table-column>
              <el-table-column prop="money" label="金额" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.settle.length"></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "contractdetail",
    data() {
      return {
        contract: [],
        violation: [],
        accident: [],
        item: [],
        receivable: [],
        validate: [],
        settle: [],
        tabPosition: 'left',
        currpage: 1,
        pagesize: 10,
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        var url = "http://localhost:3000";
        var id = this.$route.params.id
        axios.post(url + '/contract/query', {
          id: id,
          license: '',
          type: '',
          name: '',
          state: '',
        })
          .then(response => {
            this.contract = response.data.data[0]
            this.contract.start_time = this.timeFormat(this.contract.start_time)
            this.contract.end_time = this.timeFormat(this.contract.end_time)
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.post(url + '/accident/query', {
          id: '',
          license: '',
          name: '',
          state: '',
          contract: id,
        })
          .then(response => {
            if (response.data.code == '200') {
              this.accident = response.data.data
              for (let i=0;i<this.accident.length;i++){
                this.accident[i].happen_time=this.timeFormat(this.accident[i].happen_time)
              }
            }
            if (response.data.code == '1') {
              this.accident = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/car/queryViolation', {
          state: '',
          license: '',
          name: '',
          contract: '',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.violation = response.data.data
              for (let i=0;i<this.violation.length;i++){
                this.violation[i].happen_time=this.timeFormat(this.violation[i].happen_time)
              }
            }
            if (response.data.code == '1') {
              this.violation = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/contract/queryItem', {
          id: id,
        })
          .then(response => {
            if (response.data.code == '200') {
              this.item = response.data.data
              for (let i=0;i<this.item.length;i++){
                this.item[i].time=this.timeFormat(this.item[i].time)
              }
            }
            if (response.data.code == '1') {
              this.item = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/account/queryReceivable', {
          contract_id: id,
          state:'',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.receivable = response.data.data
              for (let i=0;i<this.receivable.length;i++){
                this.receivable[i].time=this.timeFormat(this.receivable[i].time)
              }
            }
            if (response.data.code == '1') {
              this.receivable = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/validate/queryItem', {
          contract_id: id,
        })
          .then(response => {
            if (response.data.code == '200') {
              this.validate = response.data.data
            }
            if (response.data.code == '1') {
              this.validate = []
            }
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.post(url + '/contract/querySettleItem', {
          id: id,
        })
          .then(response => {
            if (response.data.code == '200') {
              this.settle = response.data.data
            }
            if (response.data.code == '1') {
              this.settle = []
            }
          })
          .catch(function (error) {
            console.log(error)
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
