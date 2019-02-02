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
      <el-tabs :tab-position="tabPosition" style="height: auto" class="detail-tab">
        <el-tab-pane label="车辆">
          <div class="dataAllHead">车辆信息</div>
          <div class="dataDetail">
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车牌号:</div>
              <div class="dataDetailText">
                <span>{{cardata.car.license}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车架号:</div>
              <div class="dataDetailText">
                <span>{{cardata.car.vin}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">运营状态:</div>
              <div class="dataDetailText">
                <span>{{cardata.car.state}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">品牌:</div>
              <div class="dataDetailText">
                <span>{{cardata.car.brand}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车型:</div>
              <div class="dataDetailText">
                <span>{{cardata.car.model}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">类型:</div>
              <div class="dataDetailText">
                <span>{{cardata.car.type}}</span>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </el-tab-pane>
        <el-tab-pane label="保险"></el-tab-pane>
        <el-tab-pane label="维保">角色管理</el-tab-pane>
        <el-tab-pane label="事故">
          <el-button type="primary" class="tab-button">新增事故</el-button>
          <div class="view_table" style="margin-top: 0">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="400"></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "cardetail",
    data() {
      return {
        cardata: {
          car:[]
        },
        tabPosition: 'left',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    created(){
      this.getData()
    },
    methods: {
      getData() {
        var url="http://localhost:3000";
        var id = this.$route.params.id
        axios.post(url + '/car/query', {
          id: id,
          license: '',
          vin: '',
          model: '',
          state: ''
        })
          .then(response => {
            this.cardata.car = response.data.data[0]
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    },
  }
</script>

<style scoped>

</style>
