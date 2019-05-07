<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">用户管理</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="/system/adduser/0" class="actions"><i class="el-icon-plus"></i>新增用户</router-link>
        </span>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="queryData.username"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="queryData.name" filterable placeholder="用户角色">
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option
              v-for="item in roleData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain="" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column prop="username" label="账号">
          <template slot-scope="scope">
            <span>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户角色"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small" @click="detailDriver(scope.row.id)">查看</el-button>-->
            <el-button type="text" size="small" @click="editUser(scope.row.username)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteUser(scope.row.username)">删除</el-button>
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
    inject: ['reload'],
    name: "userlist",
    data() {
      return {
        queryData: {
          username: '',
          name: '',
          type: '激活',
        },
        tableData: [],
        roleData: [],
        currpage: 1,
        pagesize: 10,
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        var url = "http://localhost:3000";
        axios.post(url + '/users/query', this.queryData)
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
        axios.post(url + '/users/queryRole', {
          id: '',
          name: '',
          state: '激活',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.roleData = response.data.data
            }
            if (response.data.code == '1') {
              this.roleData = []
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      query() {
        var url = "http://localhost:3000";
        axios.post(url + '/users/query', this.queryData)
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
      deleteUser(id) {
        var url = "http://localhost:3000";
        axios.get(url + "/users/deleteUser?username=" + id)
          .then(response => {
            if (response.data.code=='200') {
              this.$message({
                message:'删除成功',
                type:'success'
              })
              console.log(response)
              this.reload()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      editUser(id) {
        this.$router.push('adduser/' + id)
      },
    },
  }
</script>

<style scoped>

</style>
