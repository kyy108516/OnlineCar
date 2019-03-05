<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">司机列表</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="/driver/adddriver/0" class="actions"><i class="el-icon-plus"></i>新增司机</router-link>
        </span>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="queryData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="queryData.sex" filterable placeholder="性别">
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              :label="'男'"
              :value="'男'">
            </el-option>
            <el-option
              :label="'女'"
              :value="'女'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="queryData.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain="" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="driverData.slice((currpage - 1) * pagesize, currpage * pagesize)" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="联系方式" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="是否签约" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detailDriver(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="editDriver(scope.row.id)">编辑</el-button>
            <!--<el-button type="text" size="small" @click="deleteDriver(scope.row.id)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.driverData.length"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    inject:['reload'],
    name: "driverlist",
    data() {
      return {
        queryData:{
          id:'',
          name:'',
          sex:'',
          phone:'',
          state:'',
        },
        driverData: [],
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
        axios.post(url + '/driver/query', this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.driverData = response.data.data
            }
            if (response.data.code == '1') {
              this.driverData = []
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
      // deleteDriver(id) {
      //   var url = "http://localhost:3000";
      //   axios.get(url + "/driver/deleteDriver?id=" + id)
      //     .then(response => {
      //       console.log(response)
      //       this.reload()
      //     })
      //     .catch(function (error) {
      //       console.log(error)
      //     })
      // },
      editDriver(id){
        this.$router.push('adddriver/'+id)
      },
      detailDriver(id){
        this.$router.push('driverdetail/'+id)
      }
    },
  }
</script>

<style scoped>

</style>
