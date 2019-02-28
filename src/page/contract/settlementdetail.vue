<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">合同结算</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <el-tabs :tab-position="tabPosition" style="height: auto" class="detail-tab">
        <el-tab-pane label="合同结算">
          <div class="dataAllHead">合同信息</div>
          <div class="dataDetail">
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车牌号:</div>
              <div class="dataDetailText">
                <span>{{data.contractData.id}}</span>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </el-tab-pane>
        <el-tab-pane label="验车审核"></el-tab-pane>
        <el-tab-pane label="违章审核">角色管理</el-tab-pane>
        <el-tab-pane label="财务审核">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "settlementdetail",
    data() {
      return {
        data: {
          contractData:[],
          carData:[],
          driverData:[],
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
        axios.post(url + '/contract/query', {
          id: id,
          license: '',
          type: '',
          name: '',
        })
          .then(response => {
            this.data.contractData = response.data.data[0]
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
