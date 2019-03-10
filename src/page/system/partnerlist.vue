<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">合作伙伴</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <router-link to="addpartner/0" class="actions"><i class="el-icon-plus"></i>新增合作</router-link>
        </span>
      </div>
    </div>
    <div class="query-bar">
      <el-form :inline="true" :label-position="right" label-width="80px">
        <el-form-item label="公司名称">
          <el-input v-model="queryData.company_name"></el-input>
        </el-form-item>
        <el-form-item label="合作类型">
          <el-select v-model="queryData.type" placeholder="请选择">
            <el-option :key="1" :label="'全部'" :value="''"></el-option>
            <el-option :key="2" :label="'保险公司'" :value="'保险公司'"></el-option>
            <el-option :key="3" :label="'维修厂'" :value="'维修厂'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" plain="" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="company_name" label="公司名称" ></el-table-column>
        <el-table-column prop="type" label="合作类型" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editPartner(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="deletePartner(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[5,10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total=this.tableData.length :current-page="currpage"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    inject:['reload'],
    name: "partnerlist",
    data() {
      return {
        queryData:{
          id:'',
          company_name:'',
          type:'',
          state:'激活',
        },
        tableData: [],
        currpage:1,
        pagesize:5,
        dialogFormVisible:false
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(){
        var url = "http://localhost:3000";
        axios.post(url+'/car/Partner',this.queryData)
          .then(response=>{
            if (response.data.code=='200') {
              this.tableData = response.data.data
            }
            if (response.data.code=='1'){
              this.tableData=[]
            }
          })
          .catch(error=>{
            console.log(error);
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
      deletePartner(id) {
        var url = "http://localhost:3000";
        axios.get(url + "/car/deletePartner?id=" + id)
          .then(response => {
            console.log(response)
            this.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      editPartner(id){
        this.$router.push('addpartner/'+id)
      }
    }
  }
</script>

<style scoped>

</style>
