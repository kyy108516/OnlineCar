<template>
  <div style="width: 100%;height: 100%">
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
                <span class="box-num">{{allcar}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">运营车辆</p>
                <span class="box-num">{{yunyingcar}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">库存车辆</p>
                <span class="box-num">{{kucuncar}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">全部司机</p>
                <span class="box-num">{{alldriver}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">签约司机</p>
                <span class="box-num">{{qianyuedriver}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-a-contentWidth1">
              <div style="padding: 8px">
                <p class="box-tit">逾期司机</p>
                <span class="box-num">{{yuqidriver}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="10" type="flex" class="row-bg" justify="start">
      <el-col :span="16" class="grid-a-content-a-Width">
        <el-row :gutter="10" type="flex" justify="center">
          <el-col :span="24" class="grid-a-contentWidth2">
            <el-carousel indicator-position="outside" autoplay="false" interval="7000">
              <el-carousel-item :key="1">
                <div style="display: table;width: 100%;">
                  <div style="display: table-cell;margin-top: 30px">
                    <div id="myChart1" style="width: 500px; height: 300px ;margin: auto"></div>
                  </div>
                </div>
              </el-carousel-item>
              <el-carousel-item :key="2">
                <div style="display: table;width: 100%;">
                  <div style="display: table-cell;margin-top: 30px">
                    <div id="myChart2" style="width: 500px; height: 300px ;margin: auto"></div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>

          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="grid-a-contentWidth">
          <div class="head2" style="border-left: 5px solid #2bac84">快捷按钮</div>
        </el-row>
        <el-row style="margin-top: 15px;padding: 0 15px" :gutter="10" class="grid-a-contentWidth">
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
                <img src="../../assets/login/square-car-light.png">
                <br>
                <span class="box-tit">全部车辆</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/pie')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: "home",
    data() {
      return {
        time: '',
        allcar:'',
        kucuncar:'',
        yunyingcar:'',
        alldriver:'',
        qianyuedriver:'',
        yuqidriver:'',
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
    },
    mounted() {
      this.drawLine();
      this.getData();
    },
    methods: {
      getData(){
        var url = "http://localhost:3000";
        axios.post(url + '/home/allCar')
          .then(response => {
            this.allcar=response.data.data[0].num
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.post(url + '/home/kucunCar')
          .then(response => {
            this.kucuncar=response.data.data[0].num
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.post(url + '/home/yunyingCar')
          .then(response => {
            this.yunyingcar=response.data.data[0].num
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.post(url + '/home/allDriver')
          .then(response => {
            this.alldriver=response.data.data[0].num
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.post(url + '/home/qianyueDriver')
          .then(response => {
            this.qianyuedriver=response.data.data[0].num
          })
          .catch(function (error) {
            console.log(error)
          });
        axios.post(url + '/home/yuqiDriver')
          .then(response => {
            this.yuqidriver=response.data.data[0].num
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = echarts.init(document.getElementById('myChart1'))
        let myChart2 = echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        myChart1.setOption({
          // title: {},
          // tooltip: {},
          // // grid:{
          // //   top:0,
          // //   bottom:0
          // // },
          // xAxis: {
          //   data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          // },
          // yAxis: {
          //   type: 'value'
          // },
          // series: [{
          //   name: '销量',
          //   type: 'line',
          //   data: [5, 20, 36, 10, 10, 20]
          // }],
          // backgroundColor: 'white',
          //
          // title: {
          //   text: 'Customized Pie',
          //   left: 'center',
          //   top: 20,
          //   textStyle: {
          //     color: 'black'
          //   }
          // },
          //
          // tooltip : {
          //   trigger: 'item',
          //   formatter: "{a} <br/>{b} : {c} ({d}%)"
          // },
          //
          // visualMap: {
          //   show: false,
          //   min: 80,
          //   max: 600,
          //   inRange: {
          //     colorLightness: [0, 1]
          //   }
          // },
          // series : [
          //   {
          //     name:'访问来源',
          //     type:'pie',
          //     radius : '55%',
          //     center: ['50%', '50%'],
          //     data:[
          //       {value:335, name:'直接访问'},
          //       {value:310, name:'邮件营销'},
          //       {value:274, name:'联盟广告'},
          //       {value:235, name:'视频广告'},
          //       {value:400, name:'搜索引擎'}
          //     ].sort(function (a, b) { return a.value - b.value; }),
          //     roseType: 'radius',
          //     label: {
          //       normal: {
          //         textStyle: {
          //           color: 'black'
          //         }
          //       }
          //     },
          //     labelLine: {
          //       normal: {
          //         lineStyle: {
          //           color: 'black'
          //         },
          //         smooth: 0.2,
          //         length: 10,
          //         length2: 20
          //       }
          //     },
          //     itemStyle: {
          //       normal: {
          //         color: '#c23531',
          //         shadowBlur: 200,
          //         shadowColor: 'rgba(0, 0, 0, 0.5)'
          //       }
          //     },
          //
          //     animationType: 'scale',
          //     animationEasing: 'elasticOut',
          //     animationDelay: function (idx) {
          //       return Math.random() * 200;
          //     }
          //   }
          // ]
          title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        myChart2.setOption({
          // title: {},
          // tooltip: {},
          // // grid:{
          // //   top:0,
          // //   bottom:0
          // // },
          // xAxis: {
          //   data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          // },
          // yAxis: {
          //   type: 'value'
          // },
          // series: [{
          //   name: '销量',
          //   type: 'line',
          //   data: [5, 20, 36, 10, 10, 20]
          // }],
          backgroundColor: 'white',

          title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
              color: 'black'
            }
          },

          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '55%',
              center: ['50%', '50%'],
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: 'black'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'black'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
          // title : {
          //   text: '某站点用户访问来源',
          //   subtext: '纯属虚构',
          //   x:'center'
          // },
          // tooltip : {
          //   trigger: 'item',
          //   formatter: "{a} <br/>{b} : {c} ({d}%)"
          // },
          // legend: {
          //   orient: 'vertical',
          //   left: 'left',
          //   data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          // },
          // series : [
          //   {
          //     name: '访问来源',
          //     type: 'pie',
          //     radius : '55%',
          //     center: ['50%', '60%'],
          //     data:[
          //       {value:335, name:'直接访问'},
          //       {value:310, name:'邮件营销'},
          //       {value:234, name:'联盟广告'},
          //       {value:135, name:'视频广告'},
          //       {value:1548, name:'搜索引擎'}
          //     ],
          //     itemStyle: {
          //       emphasis: {
          //         shadowBlur: 10,
          //         shadowOffsetX: 0,
          //         shadowColor: 'rgba(0, 0, 0, 0.5)'
          //       }
          //     }
          //   }
          // ]
        });
      }
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

  .grid-a-contentWidth2 {
    background-color: white;
    min-height: 380px;
  }
</style>
