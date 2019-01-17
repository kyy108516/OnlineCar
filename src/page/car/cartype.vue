<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">车型管理</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="addcartype/0" class="actions"><i class="el-icon-plus"></i>新增车型</router-link>
        </span>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="60px">
        <el-form-item label="车牌号">
          <el-input></el-input>
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
        <el-form-item label="车型">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain="">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="tableData.data.slice((currpage - 1) * pagesize, currpage * pagesize)" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="brand" label="品牌" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="exitCar(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteCar(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[5,10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total=this.tableData.data.length :current-page="currpage"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState,mapMutations} from'vuex'
    export default {
      inject:['reload'],
      name: "cartype",
      data() {
        return {
          tableData: {
            loading: true,
            data: []
          },
          currpage:1,
          pagesize:5,
          dialogFormVisible:false
        }
      },
      // computed:{
      //   ...mapState({
      //     currpage: state => state.currpage_cartype
      //   })
      // },
      created() {
        this.getData();
      },
      methods: {
        // ...mapMutations([
        //   'update',
        //   'reset'
        // ]),
        getData() {
          var url = "http://localhost:3000";
          axios.get(url + '/cartype/queryAll')
            .then(response => {
              this.tableData.loading = false
              this.tableData.data = response.data.data
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleCurrentChange(cpage){
          this.currpage=cpage
        },
        handleSizeChange(psize) {
          this.pagesize = psize;
        },
        deleteCar(id) {
          var url = "http://localhost:3000";
          axios.get(url + "/cartype/deleteCartype?id=" + id)
            .then(response => {
              console.log(response)
              this.reload()
            })
            .catch(function (error) {
              console.log(error)
            })
        },
        exitCar(id){
          this.$router.push('addcartype/'+id)
        }
      }
    }
</script>

<style scoped>

</style>
