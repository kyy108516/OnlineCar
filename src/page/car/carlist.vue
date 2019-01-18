<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">车辆列表</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="/car/addcar" class="actions"><i class="el-icon-plus"></i>新增车辆</router-link>
        </span>
      </div>
    </div>
    <div class="list-tit">
      <el-tabs>
        <el-tab-pane label="所有车辆"></el-tab-pane>
        <el-tab-pane label="运营中车辆"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="60px">
        <el-form-item label="车牌号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="车型">
          <el-select v-model="data" filterable placeholder="活动区域">
            <el-option
              v-for="item in cartypeData"
              :key="item.id"
              :label="item.brand"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车型">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="车型">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="车型">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain="">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="carData.slice((currpage - 1) * pagesize, currpage * pagesize)" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="车牌号" ></el-table-column>
        <el-table-column prop="vin" label="车架号" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
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
    name: "carlist",
    data() {
      return {
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
        function getcarData(){
          return axios.get(url+'/car/queryAll')
        }
        function getcartypeData(){
          return axios.get(url + '/cartype/queryAll')
        }
        axios.all([getcarData(),getcartypeData()])
          .then(axios.spread((getcarData,getcartypeData) =>{
            this.carData=getcarData.data.data
            this.cartypeData=getcartypeData.data.data
          }
          ))
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
      deleteCar(id){
        var url = "http://localhost:3000";
        axios.get(url+"/car/deleteCar?id="+id)
          .then(response=>{
            console.log(response)
            this.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    }
  }
</script>

<style scoped>
</style>
