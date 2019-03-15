<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">到期提醒</b>
      </div>
    </div>
    <div class="list-tit">
      <el-tabs @tab-click="handleClick" v-model="activeName">
        <el-tab-pane label="保险到期" name="one"></el-tab-pane>
        <el-tab-pane label="合同到期" name="two"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="contractData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column prop="id" label="合同编号"></el-table-column>
        <el-table-column prop="type" label="合同类型"></el-table-column>
        <el-table-column prop="license" label="车牌号"></el-table-column>
        <el-table-column prop="model" label="车型"></el-table-column>
        <el-table-column prop="name" label="承租人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="联系方式" show-overflow-tooltip></el-table-column>
        <el-table-column prop="end_time" label="合同到期日" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.contractData.length"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  var url = "http://localhost:3000";
  export default {
    inject: ['reload'],
    name: "contractremind",
    data() {
      return {
        activeName: "two",
        contractData: [],
        currpage: 1,
        pagesize: 10,
        data: ''
      }
    },
    computed:{
      contract:{
        get () {
          return this.$store.state.contract
        },
      },
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        axios.post(url + '/contract/queryExpire',{
          day:this.contract
        })
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
        if (tab.label == '保险到期') {
          this.$router.push('insuranceremind')
        }
      },
    },
  }
</script>

<style scoped>

</style>
