<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">车辆详情</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <el-tabs :tab-position="tabPosition" style="height: auto" class="detail-tab" v-model="activeName">
        <el-tab-pane label="车辆" name="one">
          <div class="dataAllHead">车辆信息</div>
          <div class="dataDetail">
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车牌号:</div>
              <div class="dataDetailText">
                <span>{{car.license}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车架号:</div>
              <div class="dataDetailText">
                <span>{{car.vin}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">运营状态:</div>
              <div class="dataDetailText">
                <span>{{car.state}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">品牌:</div>
              <div class="dataDetailText">
                <span>{{car.brand}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车型:</div>
              <div class="dataDetailText">
                <span>{{car.model}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">类型:</div>
              <div class="dataDetailText">
                <span>{{car.type}}</span>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </el-tab-pane>
        <el-tab-pane label="保险" name="two">
          <el-button icon="el-icon-plus" type="success" @click="addinsurance(car.id)">新增保险</el-button>
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable"
                      :data="this.insurance.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="id" label="保险单号"></el-table-column>
              <el-table-column prop="type" label="保险类型"></el-table-column>
              <el-table-column prop="company_name" label="保险公司"></el-table-column>
              <el-table-column prop="start_time" label="起始日"></el-table-column>
              <el-table-column prop="end_time" label="到期日"></el-table-column>
              <el-table-column prop="money" label="金额"></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.insurance.length"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="维保" name="three">
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable"
                      :data="this.maintenance.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="id" label="维修单号">
                <template slot-scope="scope">
                  <span>{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="司机"></el-table-column>
              <el-table-column prop="type" label="维保类型"></el-table-column>
              <el-table-column prop="send_time" label="送修时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="money" label="维保金额" show-overflow-tooltip></el-table-column>
              <el-table-column prop="company_name" label="维修厂" show-overflow-tooltip></el-table-column>
              <el-table-column prop="season" label="送修原因" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.maintenance.length"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="事故" name="four">
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
              <el-table-column prop="contract_id" label="合同编号"></el-table-column>
              <el-table-column prop="name" label="司机"></el-table-column>
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
        <el-tab-pane label="违章" name="five">
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
              <el-table-column prop="name" label="司机"></el-table-column>
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
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  var url = "http://localhost:3000";
  export default {
    inject: ['reload'],
    name: "cardetail",
    data() {
      return {
        activeName: "one",
        car: [],
        insurance: [],
        maintenance: [],
        accident: [],
        violation: [],
        currpage: 1,
        pagesize: 10,
        tabPosition: 'left',
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        var id = this.$route.params.id
        axios.post(url + '/car/query', {
          id: id,
          license: '',
          vin: '',
          model: '',
          state: ''
        })
          .then(response => {
            this.car = response.data.data[0]
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.get(url + '/car/queryInsurance?id=' + id)
          .then(response => {
            if (response.data.code == '200') {
              this.insurance = response.data.data
              for (let i=0;i<this.insurance.length;i++){
                this.insurance[i].start_time=this.timeFormat(this.insurance[i].start_time)
                this.insurance[i].end_time=this.timeFormat(this.insurance[i].end_time)
              }
            }
            if (response.data.code == '1') {
              this.insurance = []
            }
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.post(url + '/maintainance/query',{
          id: '',
          license: id,
          state:'',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.maintenance = response.data.data
              for (let i=0;i<this.maintenance.length;i++){
                this.maintenance[i].send_time=this.timeFormat(this.maintenance[i].send_time)
              }
            }
            if (response.data.code == '1') {
              this.maintenance = []
            }
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.post(url + '/accident/query',{
          id: '',
          license: id,
          name: '',
          state:'',
          contract:'',
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
        axios.post(url + '/car/queryViolation',{
          state:'',
          license: id,
          name: '',
          contract:'',
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
      addinsurance(id) {
        this.$router.push('addinsurance/' + id)
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
