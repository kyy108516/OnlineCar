<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">功能设置</b>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">到期提醒</div>
      <div class="dataRevise">
        <div class="dataReviseTd">
          <div class="dataReviseLabel">
            保险到期
          </div>
          <div class="dataReviseText">
            <el-input placeholder="请输入保险到期天数" v-model="insurance" style="display:inline;"></el-input>
            <span>天</span>
          </div>
        </div>
        <div class="dataReviseTd">
          <div class="dataReviseLabel">
            合同到期
          </div>
          <div class="dataReviseText">
            <el-input placeholder="请输入合同到期天数" v-model="contract" style="display:inline;"></el-input>
            <span>天</span>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="edit">
      <div class="dataAllHead">扣车提醒</div>
      <div class="dataRevise">
        <div class="dataReviseTd">
          <div class="dataReviseLabel">
            事故次数
          </div>
          <div class="dataReviseText">
            <el-input placeholder="请输入事故次数" v-model="accident" style="display:inline;"></el-input>
            <span>次</span>
          </div>
        </div>
        <div class="dataReviseTd">
          <div class="dataReviseLabel">
            总违章次数
          </div>
          <div class="dataReviseText">
            <el-input placeholder="请输入总违章次数" v-model="violation" style="display:inline;"></el-input>
            <span>次</span>
          </div>
        </div>
      </div>
      <div style="clear:both"></div>
      <div class="dataBot">
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="submit()">保存
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "functionset",
    data() {
      return {
        // tabledata: {
        //   insurance: 0,
        //   contract: 0,
        //   violation: 0,
        //   accident: 0,
        // },
      }
    },
    computed:{
      insurance:{
        get () {
          return this.$store.state.insurance
        },
        set (val) {
          this.$store.commit('updateInsurance', val)
          console.log(this.$store.state.insurance)
        }
      },
      contract:{
        get () {
          return this.$store.state.contract
        },
        set (val) {
          this.$store.commit('updateContract', val)
          console.log(this.$store.state.contract)
        }
      },
      accident:{
        get () {
          return this.$store.state.accident
        },
        set (val) {
          this.$store.commit('updateAccident', val)
          console.log(this.$store.state.accident)
        }
      },
      violation:{
        get () {
          return this.$store.state.violation
        },
        set (val) {
          this.$store.commit('updateViolation', val)
          console.log(this.$store.state.violation)
        }
      },
    },
    created() {
      // this.getData()
      // this.tabledata.insurance=this.func.insurance
    },
    methods: {
      // getData() {
      //   var url = "http://localhost:3000";
      //   axios.post(url + '/users/queryFunction')
      //     .then(response => {
      //       this.tabledata.insurance = response.data.data[0].insurance
      //       this.tabledata.contract = response.data.data[0].contract
      //       this.tabledata.accident = response.data.data[0].accident
      //       this.tabledata.violation = response.data.data[0].violation
      //     })
      //     .catch(function (error) {
      //       console.log(error)
      //     })
      // },
      submit() {
        var url = "http://localhost:3000";
        if (this.insurance===''||this.contract===''||this.violation===''||this.accident===''){
          console.log(typeof (this.insurance))
          console.log(this.contract)
          console.log(this.violation)
          console.log(typeof this.accident)
          this.$message.error('请填入正确信息');
          return 0;
        }
        axios.get(url + '/users/updateFunction?insurance=' + this.insurance + '&contract=' + this.contract+ '&violation=' + this.violation+'&accident='+this.accident)
          .then(response => {
            if (response.data.code == '200') {
              this.$message({
                message: '设置成功',
                type: 'success'
              });
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        this.reload()
      },
    }
  }
</script>

<style scoped>

</style>
