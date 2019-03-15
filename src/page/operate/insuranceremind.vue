<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit">到期提醒</b>
      </div>
    </div>
    <div class="list-tit">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="保险到期"></el-tab-pane>
        <el-tab-pane label="合同到期"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="view_table">
      <el-table ref="multipleTable" :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" highlight-current-row>
        <el-table-column prop="id" label="保单号">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="license" label="车牌号" ></el-table-column>
        <el-table-column prop="type" label="保险类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="company_name" label="保险公司" show-overflow-tooltip></el-table-column>
        <el-table-column prop="end_time" label="到期时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="collect(scope.row.id)">更新</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :page-sizes="[10, 20, 30, 40]" :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="this.tableData.length"></el-pagination>
    </div>
    <el-dialog title="更新保单" :visible.sync="dialogFormVisible">
      <el-form :model="insuranceData" :rules="rules" ref="insuranceData">
        <el-form-item label="保险单号" :label-width="'120px'" prop="id">
          <el-input v-model="insuranceData.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="保险费" :label-width="'120px'" prop="money">
          <el-input v-model="insuranceData.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="保险公司" :label-width="'120px'" prop="partner_id">
          <el-select filterable v-model="insuranceData.partner_id">
            <el-option
              v-for="item in partnerData"
              :key="item.id"
              :label="item.company_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始日" :label-width="'120px'" prop="start_time">
          <el-date-picker
            v-model="insuranceData.start_time"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期日" :label-width="'120px'" prop="end_time">
          <el-date-picker
            v-model="insuranceData.end_time"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('insuranceData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    inject:['reload'],
    name: "insuranceremind",
    data() {
      return {
        dialogFormVisible: false,
        queryData:{
          id:'',
          license:'',
          vin:'',
          model:'',
          state:''
        },
        insuranceData:{
          id:'',
          partner_id:'',
          start_time:'',
          end_time:'',
          money:'',
          original_id:'',
        },
        carData: [],
        tableData:[],
        partnerData:[],
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
        currpage:1,
        pagesize:10,
        data:'',
        rules: {
          start_time: [{required: true, message: '请选择时间', trigger: 'change'}],
          end_time: [{required: true, message: '请选择时间', trigger: 'change'}],
          id: [{required: true, message: '请输入保险单号', trigger: 'blur'}],
          partner_id: [{required: true, message: '请选择保险公司', trigger: 'change'}],
          money: [{required: true, message: '请输入保费', trigger: 'blur'}],
        },
      }
    },
    computed:{
      insurance:{
        get () {
          return this.$store.state.insurance
        },
      },
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        var url = "http://localhost:3000";
        axios.post(url + '/car/queryInsuranceRemind',{
          day:this.insurance
        })
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
        axios.post(url + '/car/query', {
          id: '',
          license: '',
          vin: '',
          model: '',
          state: ''
        })
          .then(response => {
            if (response.data.code == '200') {
              this.carData = response.data.data
            }
            if (response.data.code == '1') {
              this.carData = []
            }
          })
          .catch(error => {
            console.log(error);
          });
        axios.post(url + '/car/Partner', {
          id: '',
          company_name: '',
          type: '保险公司',
          state:'激活',
        })
          .then(response => {
            if (response.data.code == '200') {
              this.partnerData = response.data.data
            }
            if (response.data.code == '1') {
              this.partnerData = []
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
      handleClick(tab, event) {
        if (tab.label == '合同到期') {
          this.$router.push('contractremind')
        }
        // var url = "http://localhost:3000";
        // axios.post(url + '/car/query', this.queryData)
        //   .then(response => {
        //     if (response.data.code == '200') {
        //       this.carData = response.data.data
        //     }
        //     if (response.data.code == '1') {
        //       this.carData = []
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      },
      deleteCar(id) {
        var url = "http://localhost:3000";
        axios.get(url + "/car/deleteCar?id=" + id)
          .then(response => {
            console.log(response)
            this.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      editCar(id){
        this.$router.push('addcar/'+id)
      },
      detailCar(id){
        this.$router.push('cardetail/'+id)
      },
      collect(id){
        this.dialogFormVisible=true
        this.insuranceData.original_id=id
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.changetime()
            var url = "http://localhost:3000";
            axios.get(url + '/car/updateInsurance?id=' + this.insuranceData.id + '&partner_id=' + this.insuranceData.partner_id + '&start_time=' + this.insuranceData.start_time+ '&end_time=' + this.insuranceData.end_time+ '&money=' + this.insuranceData.money+ '&original_id=' + this.insuranceData.original_id)
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
      changetime() {
        var d1 = new Date(this.insuranceData.start_time)
        var d2 = new Date(this.insuranceData.end_time)
        var datetime1 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
        var datetime2 = d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate();
        this.insuranceData.start_time = datetime1
        this.insuranceData.end_time = datetime2
      }
    },
  }
</script>

<style scoped>

</style>
