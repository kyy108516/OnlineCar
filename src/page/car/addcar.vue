<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">新增车辆</b>
        <a class="back-last">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </a>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">车辆信息</div>
      <div class="dataRevise">
        <div class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 车牌号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车牌号" clearable=""></el-input>
          </div>
        </div>
        <div class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 车型
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车牌号" clearable=""></el-input>
          </div>
        </div>
        <div class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 车架号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车牌号" clearable=""></el-input>
          </div>
        </div>
        <div class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 发动机号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车牌号" clearable=""></el-input>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
      <div class="dataBot">
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addcar"
  }
</script>

<style scoped>

</style>
