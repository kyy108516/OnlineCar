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
        <el-tab-pane label="保险">
          <el-button icon="el-icon-plus" type="success" @click="addinsurance(cardata.car.id)">新增保险</el-button>
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable" :data="this.cardata.insurance.slice((currpage - 1) * pagesize, currpage * pagesize)" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="id" label="保险单号"></el-table-column>
              <el-table-column prop="type" label="保险类型" ></el-table-column>
              <el-table-column prop="company_name" label="保险公司"></el-table-column>
              <el-table-column prop="start_time" label="起始日"></el-table-column>
              <el-table-column prop="end_time" label="到期日"></el-table-column>
              <el-table-column prop="money" label="金额"></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.cardata.insurance.length"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="维保"></el-tab-pane>
        <el-tab-pane label="事故"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    inject:['reload'],
    name: "cardetail",
    data() {
      return {
        cardata: {
          car:[],
          insurance:[],
        },
        currpage:1,
        pagesize:10,
        tabPosition:'left',
      }
    },
    mounted() {
      this.getData();
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
          });
        axios.get(url+'/car/queryInsurance?id='+id)
          .then(response => {
            if (response.data.code == '200') {
              this.cardata.insurance = response.data.data
            }
            if (response.data.code == '1') {
              this.cardata.insurance = []
            }
          })
          .catch(function (error) {
            console.log(error)
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
      addinsurance(id){
        this.$router.push('addinsurance/'+id)
      }
    },
  }
</script>

<style scoped>

</style>
