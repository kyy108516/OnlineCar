<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">角色管理</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="/system/addrole" class="actions"><i class="el-icon-plus"></i>新增角色</router-link>
        </span>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="角色编号">
          <el-input v-model="queryData.id"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="queryData.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain="" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column prop="id" label="角色编号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" ></el-table-column>
        <el-table-column prop="description" label="角色描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
           <el-button type="text" size="small" @click="deleteDriver(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.tableData.length"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    inject:['reload'],
    name: "rolelist",
    data() {
      return {
        queryData:{
          id:'',
          name:'',
          state:'激活',
        },
        tableData: [],
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
        axios.post(url + '/users/queryRole',this.queryData)
          .then(response => {
            if (response.data.code == '200') {
              this.tableData = response.data.data
            }
            if (response.data.code == '1') {
              this.tableData = []
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
    },
  }
</script>

<style scoped>

</style>
