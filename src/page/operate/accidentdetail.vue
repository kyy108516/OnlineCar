<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">事故详情</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <el-tabs :tab-position="tabPosition" style="height: auto" class="detail-tab" v-model="activeName">
        <el-tab-pane label="事故" name="one">
          <div class="dataAllHead">事故信息</div>
          <div class="dataDetail">
            <div class="dataDetailTd">
              <div class="dataDetailLabel">合同编号:</div>
              <div class="dataDetailText">
                <span>{{accident.contract_id}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车牌号:</div>
              <div class="dataDetailText">
                <span>{{accident.license}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">司机:</div>
              <div class="dataDetailText">
                <span>{{accident.name}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">出险地点:</div>
              <div class="dataDetailText">
                <span>{{accident.happen_site}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">出险日期:</div>
              <div class="dataDetailText">
                <span>{{accident.happen_time}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">定损金额:</div>
              <div class="dataDetailText">
                <span>{{accident.money}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">事故状态:</div>
              <div class="dataDetailText">
                <span>{{accident.state}}</span>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </el-tab-pane>
        <el-tab-pane label="事故财务事项" name="two">
        <div class="view_table" style="margin-top: 0">
        <el-table ref="multipleTable"
        :data="this.item.slice((currpage - 1) * pagesize, currpage * pagesize)"
        tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column prop="type" label="保险类型"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.item.length"></el-pagination>
        </div>
        </el-tab-pane>
        <el-tab-pane label="事故赔款" name="three">
        <!--<div class="view_table" style="margin-top: 0">-->
        <!--<el-table ref="multipleTable"-->
        <!--:data="this.maintenance.slice((currpage - 1) * pagesize, currpage * pagesize)"-->
        <!--tooltip-effect="dark" style="width: 100%"-->
        <!--@selection-change="handleSelectionChange" highlight-current-row>-->
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <!--<el-table-column prop="id" label="维修单号">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{scope.row.id}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="司机"></el-table-column>-->
        <!--<el-table-column prop="type" label="维保类型"></el-table-column>-->
        <!--<el-table-column prop="send_time" label="送修时间" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="money" label="维保金额" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="company_name" label="维修厂" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="season" label="送修原因" show-overflow-tooltip></el-table-column>-->
        <!--</el-table>-->
        <!--<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
        <!--:page-sizes="[10, 20, 30, 40]" :page-size="pagesize"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="this.maintenance.length"></el-pagination>-->
        <!--</div>-->
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
    name: "accidentdetail",
    data() {
      return {
        activeName: "one",
        reparation: [],
        accident: [],
        item: [],
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
        axios.post(url + '/accident/query', {
          id: id,
          license: '',
          name: '',
          state: '',
          contract: '',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.accident = response.data.data[0]
            }
            if (response.data.code == '1') {
              this.accident = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/accident/queryItem')
          .then(response => {
            if (response.data.code == '200') {
              this.item = response.data.data
            }
            if (response.data.code == '1') {
              this.item = []
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
      }
    },
  }
</script>

<style scoped>

</style>
