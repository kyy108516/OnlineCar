<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">验车</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <el-form class="dataRevise" :model="tabledata"  ref="tabledata">
        <el-form-item class="dataReviseTd" >
          <div class="dataReviseLabel">
            <em>*</em> 车辆信息
          </div>
          <div class="dataReviseText">
            <el-input placeholder="车辆信息" v-model="tabledata.license" disabled="true"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 合同编号
          </div>
          <div class="dataReviseText">
            <el-input placeholder="合同编号" v-model="tabledata.contract_id" disabled="true"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 验车类型
          </div>
          <div class="dataReviseText">
            <el-input placeholder="验车类型" v-model="tabledata.type" disabled="true"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd">
          <div class="dataReviseLabel">
            <em>*</em> 验车金额
          </div>
          <div class="dataReviseText">
            <el-input placeholder="0" v-model="tabledata.money" disabled="true"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <div class="dataAllHead">验车事项
        <el-button type="primary" class="button-caiwu" @click="addLine">添加</el-button>
        <!--<el-button type="primary" class="button-caiwu" @click="save">显示</el-button>-->
      </div>
      <el-table
        :data="itemdata"
        style="width: 100%;padding: 0 10px">
        <el-table-column prop="description" label="描述">
          <template slot-scope="scope">
            <el-input v-model="scope.row.description" placeholder="请输入描述"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额">
          <template slot-scope="scope">
            <el-input v-model="scope.row.money" placeholder="请输入金额" @blur="sum_money(scope.row.money)" @focus="jian(scope.row.money)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="dataBot">
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="submit('tabledata')">提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "carvalidate",
    data() {
      return {
        tabledata: {
          id:'',
          contract_id:'',
          license:'',
          type:'',
          money:0,
        },
        itemdata: [{
          description: '',
          money: '',
        }],
        // rules: {
        //   type: [{required: true, message: '请选择合同类型', trigger: 'change'}],
        //   car_id: [{required: true, message: '请选择车牌', trigger: 'change'}],
        //   id: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
        //   startTime: [{required: true, message: '请选择时间', trigger: 'change'}],
        //   endTime: [{required: true, message: '请选择时间', trigger: 'change'}],
        //   driver_id: [{required: true, message: '请选择承租人', trigger: 'change'}],
        // },
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
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        var url = "http://localhost:3000";
        var id = this.$route.params.id
        axios.post(url + '/validate/query', {
          id: id,
          state: '',
          type:'',
          contract_id:'',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.tabledata.license = response.data.data[0].license;
              this.tabledata.id = response.data.data[0].id;
              this.tabledata.type = response.data.data[0].type;
              this.tabledata.contract_id = response.data.data[0].contract_id;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      submit(formName) {
            var url = "http://localhost:3000";
            for (let i=0;i<this.itemdata.length;i++) {
              axios.get(url + '/validate/addValidateItem?id=' + this.tabledata.id + '&description=' + this.itemdata[i].description+ '&money=' + this.itemdata[i].money)
                .then(response => {
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
            axios.get(url + '/validate/updateState?state=已验车&money='+this.tabledata.money+'&id=' + this.tabledata.id)
              .then(response => {
              })
              .catch(function (error) {
                console.log(error)
              })
        if (this.tabledata.type=='交车') {
          this.$router.push('/contract/carchecklist')
        }
        if (this.tabledata.type=='还车'){
          axios.get(url + '/contract/updateSettle?validatecheck=已完成&id=' + this.tabledata.contract_id)
            .then(response => {
              this.$router.push('/contract/settlementlist')
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      addLine() { //添加行数
        var newValue = {
          description: '',//描述
          money: '',
        };
        //添加新的行数
        this.itemdata.push(newValue);
      },
      handleDelete(index) { //删除行数
        this.itemdata.splice(index, 1)
      },
      // save(){
      //   //这部分应该是保存提交你添加的内容
      //   console.log(JSON.stringify(this.itemdata))
      // },
      sum_money(x){
        console.log(x)
        if (x==''){
          return 0
        }
        else {
          this.tabledata.money += parseInt(x)
        }
      },
      jian(x){
        console.log(x)
        console.log(this.tabledata.money)
        if (x==''){
          return 0
        }
        else {
          this.tabledata.money -= parseInt(x)
        }
      },
    }
  }
</script>

<style scoped>

</style>
