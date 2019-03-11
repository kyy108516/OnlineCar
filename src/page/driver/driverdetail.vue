<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">司机详情</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <el-tabs :tab-position="tabPosition" style="height: auto" class="detail-tab">
        <el-tab-pane label="司机">
          <div class="dataAllHead">司机信息</div>
          <div class="dataDetail">
            <div class="dataDetailTd">
              <div class="dataDetailLabel">姓名:</div>
              <div class="dataDetailText">
                <span>{{driver.name}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">性别:</div>
              <div class="dataDetailText">
                <span>{{driver.sex}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">联系方式:</div>
              <div class="dataDetailText">
                <span>{{driver.phone}}</span>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </el-tab-pane>
        <el-tab-pane label="运营合同">
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable" :data="contract.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="id" label="合同编号">
                <template slot-scope="scope">
                  <span>{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="合同类型"></el-table-column>
              <el-table-column prop="license" label="车牌号"></el-table-column>
              <el-table-column prop="model" label="车型"></el-table-column>
              <el-table-column prop="start_time" label="合同起始日" show-overflow-tooltip></el-table-column>
              <el-table-column prop="end_time" label="合同到期日" show-overflow-tooltip></el-table-column>
              <el-table-column prop="state" label="合同状态" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.contract.length"></el-pagination>
          </div>
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
              <el-table-column prop="contract_id" label="合同编号"></el-table-column>
              <el-table-column prop="license" label="车牌号"></el-table-column>
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
              <el-table-column prop="license" label="车牌号"></el-table-column>
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
  export default {
    name: "driverdetail",
    data() {
      return {
        driver:[],
        accident:[],
        violation:[],
        contract:[],
        tabPosition: 'left',
        currpage: 1,
        pagesize: 10,
      }
    },
    created(){
      this.getData()
    },
    methods: {
      getData() {
        var url="http://localhost:3000";
        var id = this.$route.params.id
        axios.post(url + '/driver/query', {
          id:id,
          name:'',
          sex:'',
          phone:'',
          state:'',
        })
          .then(response => {
            this.driver = response.data.data[0]
          })
          .catch(function (error) {
            console.log(error)
          })
        axios.post(url + '/accident/query',{
          id: '',
          license: '',
          name: id,
          state:'',
          contract:'',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.accident = response.data.data
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
          license: '',
          name: id,
          contract:'',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.violation = response.data.data
            }
            if (response.data.code == '1') {
              this.violation = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/contract/query',{
          id: '',
          type: '',
          license: '',
          name: id,
          state:'',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.contract = response.data.data
            }
            if (response.data.code == '1') {
              this.contract = []
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
  }
</script>

<style scoped>

</style>
