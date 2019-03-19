<template>
  <div>
    <div class="topbar">
      <div class="topbar-cell">
        <b class="topbar-tit" v-if="this.$route.params.id!=0">编辑角色</b>
        <b class="topbar-tit" v-else>新增角色</b>
        <el-button class="back-last" @click="$router.go(-1)">
          <span class="icon"><i class="el-icon-back"></i> 返回上一级</span>
        </el-button>
      </div>
    </div>
    <div class="edit">
      <div class="dataAllHead">角色信息</div>
      <el-form class="dataRevise" :model="tabledata" :rules="rules" ref="tabledata">
        <el-form-item class="dataReviseTd" prop="brand">
          <div class="dataReviseLabel">
            <em>*</em> 角色名称
          </div>
          <div class="dataReviseText">
            <el-input placeholder="角色名称" v-model="tabledata.brand"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="dataReviseTd" prop="model">
          <div class="dataReviseLabel">
            角色描述
          </div>
          <div class="dataReviseText">
            <el-input placeholder="角色描述" v-model="tabledata.model"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
      <tree-transfer :title="['权限列表','角色权限']" :from_data='fromData' :to_data='toData'
                     :defaultProps="{label:'label'}"
                     @addBtn='add' @removeBtn='remove' style="margin-left: calc(10% - 20px)"
                     :mode='mode' height='540px' width='80%' filter openAll >
      </tree-transfer>
      <div class="dataBot">
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="edit('tabledata')" v-if="this.$route.params.id!=0">编辑
        </el-button>
        <el-button type="success" style="min-width: 120px;margin:0 auto;display: block"
                   @click="submit('tabledata')" v-else>提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import treeTransfer from 'el-tree-transfer' // 引入
  export default {
    name: "addrole",
    data() {
      return {
        tabledata: {
          brand: '',
          model: '',
          type: ''
        },
        rules: {
          brand: [{required: true, message: '请输入品牌', trigger: 'blur'}],
          model: [{required: true, message: '请输入车型', trigger: 'blur'}],
          type: [{required: true, message: '请选择品牌', trigger: 'change'}]
        },
        mode: "transfer", // transfer addressList
        fromData: [
          {
            id: "1",
            pid: 0,
            label: "车辆管理",
            children: [
              {
                id: "1-1",
                pid: "1",
                label: "车辆列表",
                children: []
              },
              {
                id: "1-2",
                pid: "1",
                label: "车型管理",
                children: []
              }
            ]
          },
          {
            id: "2",
            pid: 0,
            label: "司机管理",
            children: [
              {
                id: "2-1",
                pid: "1",
                label: "司机列表",
                children: []
              },
            ]
          },
          {
            id: "3",
            pid: 0,
            label: "合同管理",
            children: [
              {
                id: "3-1",
                pid: "1",
                label: "合同列表",
                children: []
              },
              {
                id: "3-2",
                pid: "1",
                label: "交车管理",
                children: []
              },
              {
                id: "3-3",
                pid: "1",
                label: "合同结算",
                children: []
              },
            ]
          },
          {
            id: "4",
            pid: 0,
            label: "运营管理",
            children: [
              {
                id: "4-1",
                pid: "1",
                label: "维保管理",
                children: []
              },
              {
                id: "4-1",
                pid: "1",
                label: "事故管理",
                children: []
              },
              {
                id: "4-1",
                pid: "1",
                label: "到期提醒",
                children: []
              },
              {
                id: "4-1",
                pid: "1",
                label: "违章管理",
                children: []
              },
              {
                id: "4-1",
                pid: "1",
                label: "扣车管理",
                children: []
              },
            ]
          },
          {
            id: "5",
            pid: 0,
            label: "财务管理",
            children: [
              {
                id: "5-1",
                pid: "1",
                label: "应收账款",
                children: []
              },
              {
                id: "5-1",
                pid: "1",
                label: "实收账款",
                children: []
              },
              {
                id: "5-1",
                pid: "1",
                label: "应付账款",
                children: []
              },
              {
                id: "5-1",
                pid: "1",
                label: "财务明细",
                children: []
              },
            ]
          },
          {
            id: "6",
            pid: 0,
            label: "用户中心",
            children: [
              {
                id: "6-1",
                pid: "1",
                label: "用户信息",
                children: []
              },
              {
                id: "6-1",
                pid: "1",
                label: "角色管理",
                children: []
              },
              {
                id: "6-1",
                pid: "1",
                label: "账户管理",
                children: []
              },
              {
                id: "6-1",
                pid: "1",
                label: "功能设置",
                children: []
              },
              {
                id: "6-1",
                pid: "1",
                label: "合作伙伴",
                children: []
              },
            ]
          },
        ],
      }
    },
    created() {
      this.getData()
    },
    methods: {
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = "http://localhost:3000";
            axios.get(url + '/cartype/addCartype?brand=' + this.tabledata.brand + '&model=' + this.tabledata.model + '&type=' + this.tabledata.type)
              .then(response => {
                this.$router.push('/car/cartype')
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getData() {
        var url = "http://localhost:3000";
        var id = this.$route.params.id
        console.log(id)
        axios.get(url + '/cartype/selectCartype?id=' + id)
          .then(response => {
            this.tabledata.brand = response.data.data[0].brand
            this.tabledata.model = response.data.data[0].model
            this.tabledata.type = response.data.data[0].type
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      edit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = "http://localhost:3000";
            axios.get(url + '/cartype/updateCartype?brand=' + this.tabledata.brand + '&model=' + this.tabledata.model + '&type=' + this.tabledata.type + '&id=' + this.$route.params.id)
              .then(response => {
                this.$router.push('/car/cartype')
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
      changeMode() {
        if (this.mode == "transfer") {
          this.mode = "addressList";
        } else {
          this.mode = "transfer";
        }
      },
      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的        {keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromData:", JSON.stringify(fromData));
        console.log("toData:", JSON.stringify(toData));
        console.log("obj:", obj);
      },
      // 监听穿梭框组件移除
      remove(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log("fromData:", fromData);
        console.log("toData:", toData);
        console.log("obj:", obj);
      },
    },
    components: {treeTransfer},
  }
</script>

<style scoped>

</style>
