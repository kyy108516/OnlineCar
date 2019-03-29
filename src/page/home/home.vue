<template>
  <div style="width: 100%;height: 100%">
    <!--<div class="content1">-->
    <!--<div class="cont_wid_l">-->
    <!--<div class="content-main">-->
    <!--<h1 class="welInfo">欢迎您，尊敬的用户</h1>-->
    <!--<div class="baseInfo">-->
    <!--<div class="baseImg">-->
    <!--<img src="../../assets/login/img.png">-->
    <!--</div>-->
    <!--<div class="myInfo">-->
    <!--<div class="myInfo-fir">-->
    <!--<span style="font-weight: 600;font-size: 16px">{{this.username}}</span>-->
    <!--</div>-->
    <!--<div class="myInfo-sec" style="margin-top: 15px">-->
    <!--<span>账户角色：</span>-->
    <!--<span>管理员</span>-->
    <!--</div>-->
    <!--<div class="myInfo-sec">-->
    <!--<span>今天是：</span>-->
    <!--<span>{{this.time}}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="content_wid_r">-->
    <!--<div class="content-main">-->
    <!--<h1 class="welInfo" style="border-left: 3px solid #2bac84;padding-left: 8px;">运营状况</h1>-->
    <!--<div style="padding: 10px">-->
    <!--<div class="yunying-box">111</div>-->
    <!--<div class="yunying-box" style="margin-left: 8px">111</div>-->
    <!--<div class="yunying-box" style="margin-left: 8px">111</div>-->
    <!--<div class="yunying-box" style="margin-left: 8px">111</div>-->
    <!--<div class="yunying-box" style="margin-left: 8px">111</div>-->
    <!--<div class="yunying-box" style="margin-left: 8px">111</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <el-row :gutter="10" type="flex" class="row-bg" justify="start">
      <el-col :span="8">
        <div class="grid-a-contentWidth">
          <div class="head1">欢迎您，尊敬的用户!</div>
          <div class="baseInfo">
            <div class="baseImg">
              <img src="../../assets/login/img.png" style="margin-left: 15px">
            </div>
            <div class="myInfo">
              <div class="myInfo-fir">
                <span style="font-weight: 600;font-size: 16px">{{this.username}}</span>
              </div>
              <div class="myInfo-sec" style="margin-top: 15px">
                <span style="color: #999;">账户角色：</span>
                <span>管理员</span>
              </div>
              <div class="myInfo-sec">
                <span style="color: #999;">今天是：</span>
                <span>{{this.time}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16" class="grid-a-contentWidth">
        <el-row>
          <div class="head2" style="border-left: 5px solid #2bac84">运营状况</div>
        </el-row>
        <el-row style="margin-top: 15px;padding: 0 15px" :gutter="10">
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">全部车辆</p>
                <span class="box-num">5</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">全部车辆</p>
                <span class="box-num">5</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">全部车辆</p>
                <span class="box-num">5</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">全部车辆</p>
                <span class="box-num">5</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">全部车辆</p>
                <span class="box-num">5</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">全部车辆</p>
                <span class="box-num">5</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="10" type="flex" class="row-bg" justify="start">
      <el-col :span="16">
        <div class="grid-a-content-a-Width"></div>
      </el-col>
      <el-col :span="8">
        <el-row class="grid-a-contentWidth">
          <div class="head2" style="border-left: 5px solid #2bac84">快捷按钮</div>
        </el-row>
        <el-row></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        time: ''
      }
    },
    computed: {
      username: {
        get() {
          return this.$store.state.username
        },
      },
    },
    created() {
      let date = new Date()
      this.time = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日'
    }
  }
</script>

<style scoped>
  h1 {
    display: block;
    font-weight: bold;
    top: 60px;
  }

  .box-tit {
    margin-top: 5px;
    color: #999;
  }

  .box-num {
    font-size: 36px;
    color: #3695F7;
  }

  .head1 {
    margin-left: 15px;
    padding-top: 15px;
    font-weight: 700;
  }

  .head2 {
    margin-left: 15px;
    margin-top: 15px;
    font-weight: 700;
    padding-left: 10px;
  }

  .grid-a-contentWidth {
    background-color: white;
    border-radius: 4px;
    min-height: 180px;
  }

  .grid-a-content-a-Width {
    background-color: white;
    border-radius: 4px;
    min-height: 380px;
  }

  .grid-a-contentWidth1 {
    background-color: white;
    border-radius: 4px;
    min-height: 115px;
    border: #E6E6E6 solid 1px;
  }
</style>
