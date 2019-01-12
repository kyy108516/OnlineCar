<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">车型管理</b>
      </div>
      <div class="topbar-cell">
        <span class="fr">
          <a class="actions"><i class="el-icon-plus"></i>新增车型</a>
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
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cartype"
    }
</script>

<style scoped>

</style>
