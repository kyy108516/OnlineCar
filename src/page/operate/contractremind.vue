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
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="车牌号">
          <el-input v-model="queryData.license"></el-input>
        </el-form-item>
        <el-form-item label="车型">
          <el-select v-model="queryData.model" filterable placeholder="车型">
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              v-for="item in cartypeData"
              :key="item.id"
              :label="item.model"
              :value="item.model">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车架号">
          <el-input v-model="queryData.vin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain="" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="carData.slice((currpage - 1) * pagesize, currpage * pagesize)" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id1" label="编号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="车牌号" ></el-table-column>
        <el-table-column prop="vin" label="车架号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="model" label="车型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="状态" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detailCar(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="editCar(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteCar(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.carData.length"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    inject:['reload'],
    name: "contractremind",
    data() {
      return {
        queryData:{
          id:'',
          license:'',
          vin:'',
          model:'',
          state:''
        },
        activeName:'two',
        carData: [],
        cartypeData:[],
        currpage:1,
        pagesize:10,
        data:''
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        var url = "http://localhost:3000";
        axios.post(url + '/car/query', this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.carData = response.data.data
            }
            if (response.data.code == '1') {
              this.carData = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.get(url + '/cartype/queryAll')
          .then(response => {
            this.cartypeData = response.data.data
          })
          .catch(error => {
            console.log(error);
          })
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
        // var url = "http://localhost:3000";
        // axios.post(url + '/car/query', this.queryData)
        //   .then(response => {
        //     if (response.data.code == '200') {
        //       this.carData = response.data.data
        //     }
        //     if (response.data.code == '1') {
        //       this.carData = []
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      },
      deleteCar(id) {
        var url = "http://localhost:3000";
        axios.get(url + "/car/deleteCar?id=" + id)
          .then(response => {
            console.log(response)
            this.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      editCar(id){
        this.$router.push('addcar/'+id)
      },
      detailCar(id){
        this.$router.push('cardetail/'+id)
      }
    },
  }
</script>

<style scoped>

</style>
