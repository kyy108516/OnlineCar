<template>
  <div>
    <div class="content1">
      <div class="cont_wid_l">
        <div class="content-main">
          <h1 class="welInfo">欢迎您，尊敬的用户</h1>
          <div class="baseInfo">
            <div class="baseImg">
              <img src="../../assets/login/img.png">
            </div>
            <div class="myInfo">
              <div class="myInfo-fir">
                <span style="font-weight: 600;font-size: 16px">陈文杰</span>
              </div>
              <div class="myInfo-sec" style="margin-top: 15px">
                <span>账户角色：</span>
                <span>管理员</span>
              </div>
              <div class="myInfo-sec">
                <span>所属组织：</span>
                <span>贝因美</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_wid_r">
        <div class="content-main">
          <h1 class="welInfo" style="border-left: 1px solid green">运营状况</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "home",

    }
</script>

<style scoped>
h1{
  display: block;
  font-weight: bold;
  top: 60px;
}
</style>
