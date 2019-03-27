<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">事故详情</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <el-tabs :tab-position="tabPosition" style="height: auto" class="detail-tab" v-model="activeName">
        <el-tab-pane label="事故" name="one">
          <div class="dataAllHead">事故信息</div>
          <div class="dataDetail">
            <div class="dataDetailTd">
              <div class="dataDetailLabel">合同编号:</div>
              <div class="dataDetailText">
                <span>{{accident.contract_id}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">车牌号:</div>
              <div class="dataDetailText">
                <span>{{accident.license}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">司机:</div>
              <div class="dataDetailText">
                <span>{{accident.name}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">出险地点:</div>
              <div class="dataDetailText">
                <span>{{accident.happen_site}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">出险日期:</div>
              <div class="dataDetailText">
                <span>{{accident.happen_time}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">定损金额:</div>
              <div class="dataDetailText">
                <span>{{accident.money}}</span>
              </div>
            </div>
            <div class="dataDetailTd">
              <div class="dataDetailLabel">事故状态:</div>
              <div class="dataDetailText">
                <span>{{accident.state}}</span>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
        </el-tab-pane>
        <el-tab-pane label="事故财务事项" name="two">
        <div class="view_table" style="margin-top: 0">
        <el-table ref="multipleTable"
        :data="this.item.slice((currpage - 1) * pagesize, currpage * pagesize)"
        tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column prop="type" label="保险类型"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        </el-table>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.item.length"></el-pagination>
        </div>
        </el-tab-pane>
        <el-tab-pane label="事故赔款" name="three">
          <el-button icon="el-icon-plus" type="success" @click="dialogFormVisible=true" v-if="accident.state=='待理赔'">新增赔款</el-button>
          <div class="view_table" style="margin-top: 0">
            <el-table ref="multipleTable"
                      :data="this.reparation.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange" highlight-current-row>
              <el-table-column prop="money" label="金额"></el-table-column>
              <el-table-column prop="time" label="实收日期"></el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="this.reparation.length"></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="新增赔款" :visible.sync="dialogFormVisible">
      <el-form :model="reparationData" :rules="rules" ref="reparationData">
        <el-form-item label="赔款金额" :label-width="'120px'" prop="money">
          <el-input v-model="reparationData.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实收日期" :label-width="'120px'" prop="time">
          <el-date-picker
            v-model="reparationData.time"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('reparationData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  var url = "http://localhost:3000";
  export default {
    inject: ['reload'],
    name: "accidentdetail",
    data() {
      return {
        dialogFormVisible: false,
        reparationData:{
          money:'',
          time:'',
        },
        activeName: "one",
        reparation: [],
        accident: [],
        item: [],
        currpage: 1,
        pagesize: 10,
        tabPosition: 'left',
        pickerOptions1: { //日期选择器
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        rules: {
          time: [{required: true, message: '请选择时间', trigger: 'change'}],
          money: [{required: true, message: '请输入金额', trigger: 'blur'}],
        },
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        var id = this.$route.params.id
        axios.post(url + '/accident/query', {
          id: id,
          license: '',
          name: '',
          state: '',
          contract: '',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.accident = response.data.data[0]
              this.accident.happen_time=this.timeFormat(this.accident.happen_time)
            }
            if (response.data.code == '1') {
              this.accident = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/accident/queryItem')
          .then(response => {
            if (response.data.code == '200') {
              this.item = response.data.data
            }
            if (response.data.code == '1') {
              this.item = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/accident/queryReparation',{
          id:id
        })
          .then(response => {
            if (response.data.code == '200') {
              this.reparation = response.data.data
              for (let i=0;i<this.reparation.length;i++){
                this.reparation[i].time=this.timeFormat(this.reparation[i].time)
              }
            }
            if (response.data.code == '1') {
              this.reparation = []
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
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var id = this.$route.params.id
            var d1 = new Date(this.reparationData.time)
            var datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
            this.reparationData.time = datetime1
            let date = new Date();
            let practical_id = 'SS' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
            axios.get(url + '/accident/addReparation?id=' + id  + '&money=' + this.reparationData.money+ '&time=' + this.reparationData.time)
              .then(response => {
                if (response.data.code=='200'){
                  this.$message({
                    message:'提交成功',
                    type:'success'
                  })
                }
              })
              .catch(function (error) {
                console.log(error)
              })
            axios.get(url + '/account/addDetail?id=' + practical_id + '&type=事故理赔&state=收入&money=' + this.reparationData.money + '&time=' + this.reparationData.time)
              .then(response => {
              })
              .catch(function (error) {
                console.log(error)
              })
            this.reload()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      timeFormat(date) {
        let d1 = new Date(date)
        let datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        return datetime1
      }
    },
  }
</script>

<style scoped>

</style>
