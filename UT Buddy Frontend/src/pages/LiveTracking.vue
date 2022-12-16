<template>

  <div>
    <div v-if="xModal">
          <modal class="my-modal"
            :show.sync="xModal"
            :centered="false"
            :show-close="true"
          >
            <template v-slot:header class='bg-gradient-dark'>
              
            </template>
              <h2 class='text-success'>This is the Live Tracking Page</h2>

            <h4 class='text-dark'>Under this page, you will be able to view your utility at real time.</h4>
            
            <br>
            <h4 class='text-primary'>Click anywhere to continue </h4>
                      
            <template v-slot:close-button>
            </template>
          </modal>
           </div>
    
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <!-- big line graph -->
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h3 class="card-category text-white">
                  Electricity Real-Time Consumption
                </h3>
                <h2 class="card-title"> <i class="fas fa-bolt text-success"></i> Electricity : {{total}} kWh</h2>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons"
                >
                  
                </div>
              </div>
            </div>
          </template>


          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>

  <div class="row">
      <div class="col-xl-3 col-md-6 d-flex text-white">
        <card class="card-body flex-fill">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-success">
                  <i class="fas fa-tv fa-3x text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers text-white">
                  <p>Television</p>
                  {{usage1}} kWh
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats text-white">
            
                <i class="tim-icons icon-refresh-02"></i> Detecting Electricity</div>
              
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3 col-md-6 d-flex text-white ">
        <card class="card-body flex-fill">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-center">
                  <i class="fas fa-concierge-bell fa-3x text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers">
                  <p>Fridge</p>
                  {{usage2}} kWh
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-02"></i> Detecting Electricity</div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3 col-md-6 d-flex text-white" >
        <card class="card-body flex-fill" >
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-large text-center">
                  <i class="fas fa-fan fa-3x text-success "></i>
                </div>
              </div>
              <div class="col-7 ">
                <div class="numbers ">
                  <p>Fan & Light</p>
                  {{usage3}} kWh
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-02"></i> Detecting Electricity</div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3 col-md-6 d-flex text-white">
        <card class="card-body flex-fill ">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-center">
                  <i class="fas fa-snowflake fa-3x snowflake text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers">
                  <p>AirCon</p>
                  {{usage4}} kWh
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-01"></i> Detecting Electricity</div>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="row">


      
    <!-- water mini line graph -->

      <div class="col-xl-12 col-md-12" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category text-white">Water Real-Time Consumption</h5>
            <h3 class="card-title">
              <i class="fa fa-tint text-success"></i> Water : {{waterTotal}} Cu M
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart2.chartData"
              :gradient-stops="greenLineChart2.gradientStops"
              :extra-options="greenLineChart2.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
<!-- water cards -->
      <div class="row">
      <div class="col-xl-3 col-md-6 d-flex text-white">
        <card class="card-body flex-fill">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-success">
                  <i class="fas fa-shower fa-3x text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers text-white">
                  <p>Common</p>
                  {{waterUsage1}} Cu M
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats text-white">
            
                <i class="tim-icons icon-refresh-02"></i> Detecting Water Pressure </div>
              
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3 col-md-6 d-flex text-white ">
        <card class="card-body flex-fill">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-center">
                  <i class="fas fa-faucet fa-3x text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers">
                  <p>Master</p>
                  {{waterUsage2}} Cu M
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-02"></i> Detecting Water Pressure </div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3 col-md-6 d-flex text-white" >
        <card class="card-body flex-fill" >
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-large text-center">
                  <i class="fas fa-water fa-3x text-success "></i>
                </div>
              </div>
              <div class="col-7 ">
                <div class="numbers ">
                  <p>Washer</p>
                  {{waterUsage3}} Cu M
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-02"></i> Detecting Water Pressure</div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3 col-md-6 d-flex text-white">
        <card class="card-body flex-fill ">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-center">
                  <i class="fas fa-hand-holding-water fa-3x text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers">
                  <p>Kitchen</p>
                  {{waterUsage4}} Cu M
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-01"></i> Detecting Water Pressure</div>
            </div>
          </div>
        </card>
      </div>
    </div>

<!-- gas mini line graph-->

      <div class="col-xl-12 col-md-12 " :class="{ 'text-right': isRTL }">
        <card type="chart ">
          <template slot="header">
            <h5 class="card-category text-white">Gas Real-Time Consumption</h5>
            <h3 class="card-title">
              <i class="fas fa-burn text-success"></i> Gas : {{gasTotal}} kWh
            </h3>
          </template>

          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart3.chartData"
              :gradient-stops="greenLineChart3.gradientStops"
              :extra-options="greenLineChart3.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>

    <!-- gas card rows  -->

    <div class="row">
      <div class="col-xl-4 col-md-4 d-flex text-white">
        <card class="card-body flex-fill">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-success">
                  <i class="fas fa-gas-pump fa-3x text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers text-white">
                  <p>Gas Stove 1</p>
                  {{gasUsage1}} kWh
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats text-white">
            
                <i class="tim-icons icon-refresh-02"></i> Detecting Gas Pressure </div>
              
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-4 col-md-4 d-flex text-white ">
        <card class="card-body flex-fill">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-center">
                  <i class="fas fa-gas-pump fa-3x text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers">
                  <p>Gas Stove 2</p>
                  {{gasUsage2}} kWh
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-02"></i> Detecting Gas Pressure </div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-4 col-md-4 d-flex text-white" >
        <card class="card-body flex-fill" >
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-large text-center">
                  <i class="fas fa-gas-pump fa-3x text-success "></i>
                </div>
              </div>
              <div class="col-7 ">
                <div class="numbers ">
                  <p>Gas Stove 3</p>
                  {{gasUsage3}} kWh
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-02"></i> Detecting Gas Pressure</div>
            </div>
          </div>
        </card>
      </div>
     
    </div>


<!-- the card row for water breakdown and gas breakdown  -->
    
    
  </div>
</template>
<script>
import API from '../api/API'
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import { Modal } from "@/components";



export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable,
    Modal
  },
  data() {
    return {
      timeLabel :[],
      gasTimeLabel :[],
      waterTimeLabel :[],
      smalltimeLabel :[],
      randomData:[],
      timeLabel :[], 
      waterRandomData:[],
      gasRandomData:[],
      total:100,
      usage1:100,
      usage2:200,
      usage3:234,
      usage4:123,
      waterTotal:90,
      waterUsage1:45,
      waterUsage2:57,
      waterUsage3:89,
      waterUsage4:90,
      gasTotal:87,
      gasUsage1:23,
      gasUsage2:12,
      gasUsage3:0,
      xModal: false,
    
      
      bigLineChart: {
        allData: [
          [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
        ],
        // activeIndex: 0,
        chartData: {
          
          datasets: [{data: [90, 27, 60, 12, 80,100,20,19,40,80,19,50]}],
          labels: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      
      greenLineChart1: {
        extraOptions: chartConfigs.greenChartOptions1,
        chartData: {
          labels: ["", "", "", "", ""],
          datasets: [
            {
              data: [90, 27, 60, 12, 80]
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      
      greenLineChart2: {
        extraOptions: chartConfigs.greenChartOptions2,
        chartData: {
          labels: ["", "", "", "", ""],
          datasets: [
            {
              fill: true,
              borderColor: config.colors.secondary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.secondary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.secondary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
              
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      
      greenLineChart3: {
        extraOptions: chartConfigs.greenChartOptions3,
        chartData: {
          labels: ["", "", "", "", ""],
          datasets: [
            {
              
              fill: true,
              borderColor: config.colors.secondary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.secondary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.secondary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      
    };

    
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategories");
    },
  },
  methods: {
    initBigChart(index) {
      setInterval(() => {
      let chartData = {
        datasets: [
          {           
            lineTension :0,
            bezierCurve: false, 
            fill: true,
            borderColor: config.colors.secondary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.secondary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 1,
            data:this.randomData
          },
        ],
        labels: this.timeLabel
      };
      this.bigLineChart.chartData = chartData;
       }, 1100);
    },


// water chart
    initGreenChart2(index) {
      setInterval(() => {
      let chartData = {
        
          datasets: [
            {
              lineTension :0,
              bezierCurve: false, 
              fill: true,
              borderColor: config.colors.secondary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.secondary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.secondary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 1,
              data:this.waterRandomData,
              
            },
          ],labels: this.waterTimeLabel
        }
      this.greenLineChart2.chartData = chartData;
       }, 6000);
    },
// gas chart
    initGreenChart3(index) {
      setInterval(() => {
      let chartData = {
        
          datasets: [
            {
              lineTension :0,
            bezierCurve: false, 
              fill: true,
              borderColor: config.colors.secondary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.secondary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.secondary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 1,
              data:this.gasRandomData,
            },
          ],
          
          labels: this.gasTimeLabel, 
        }
            // this.$refs.bigChart.updateGradients(chartData);
      this.greenLineChart3.chartData = chartData;
      // this.LineChart.activeIndex = index;
       }, 5000);
    },

    
    // 

//  this is the big bar chart graph
    getRandomDatapoints(){
     
      // let randnum =0
      this.randomData =[]
      setInterval(() => {
        
           this.randomData.push(this.usage1+ this.usage2 + this.usage3 + this.usage4)
           this.total = this.usage1+ this.usage2 + this.usage3 + this.usage4
        
      }, 1100)}
      
    ,

    // get water graph data
    getWaterDatapoints(){
     
      this.waterRandomData =[]
      setInterval(() => {
        
           this.waterRandomData.push(this.waterUsage1+ this.waterUsage2 + this.waterUsage3+ this.waterUsage4 )

           this.waterTotal = this.waterUsage1+ this.waterUsage2 + this.waterUsage3+ this.waterUsage4
        
      }, 6000)}
      
      
    ,
    // get gas datapoints random number
    getWaterDatapoints1(){
    let  randnum =0
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           this.waterUsage1 = randnum
        
      }, 6000)},

    getWaterDatapoints2(){
     let randnum =0
      
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           this.waterUsage2 = randnum
        
      }, 6000)},

    getWaterDatapoints3(){
     let randnum =0

      
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           
           this.waterUsage3 = randnum
        
      }, 6000)},

    getWaterDatapoints4(){
     let randnum =0

    
    setInterval(() => {
      
          randnum = Math.floor(Math.random()*100);
          
          this.waterUsage4 = randnum
      
    }, 6000)},


   
    // get gas graph data
    
    getGasDatapoints(){
    let  randnum =0
     
      this.gasRandomData =[]
      setInterval(() => {
        
           this.gasRandomData.push(this.gasUsage1+ this.gasUsage2 + this.gasUsage3 )
           this.gasTotal = this.gasUsage1+ this.gasUsage2 + this.gasUsage3
        
      }, 5000)}
      
      
    ,
    // get gas datapoints random number
    getGasDatapoints1(){
    let  randnum =0
      
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           this.gasUsage1 = randnum
        
      }, 5000)},

    getGasDatapoints2(){
    let  randnum =0
      
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           this.gasUsage2 = randnum
        
      }, 5000)},

    getGasDatapoints3(){
     let randnum =0
      
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           
           this.gasUsage3 = randnum
        
      }, 5000)},

   

// this is the television data 
    getRandomDatapointssmall(){
      let randnum =0
      this.smallrandomData =[]
      // while (this.randomData.length <10){
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           this.smallrandomData.push(randnum)
           this.usage1 = randnum
        
      // console.log((this.randomData))
      }, 1100)}

      
    ,
// this is the fridge data

    getRandomDatapointssmall2(){
      let randnum =0
      this.smallrandomData2 =[]
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           this.smallrandomData2.push(randnum)
           this.usage2 = randnum
        
      }, 1100);

      
    },
// this is the fan n light data

    getRandomDatapointssmall3(){
    
      let randnum =0
      this.smallrandomData3 =[]
      // while (this.randomData.length <10){
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           this.smallrandomData3.push(randnum)
           this.usage3 =randnum
        
      // console.log((this.randomData))
      }, 1100)

    },

//  this is the aircon data 
    getRandomDatapointssmall4(){
    
      let randnum =0
      this.smallrandomData4 =[]
      setInterval(() => {
        
           randnum = Math.floor(Math.random()*100);
           this.usage4 =randnum
        
      }, 1100)

    },

      showModal() {
      this.xModal = true;
    },
    closeModal() {
      this.xModal = false;

      
    },

    getTimeLabel(){
      this.timeLabel =[]
      // randnum = 0

      // while (this.randomData.length <10){
      setInterval(() => {
        var today = new Date()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        this.timeLabel.push(time)
      
      // console.log((this.randomData))
      }, 1100)},



    getSmallTimeLabel(){
      this.smalltimeLabel =[]
      // randnum = 0

      // while (this.randomData.length <10){
      setInterval(() => {
        var today = new Date()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        this.smalltimeLabel.push(time)
      
      // console.log((this.randomData))
      }, 1100)},
      
    getGasTimeLabel(){
      this.gasTimeLabel =[]
      // randnum = 0

      // while (this.randomData.length <10){
      setInterval(() => {
        var today = new Date()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        this.gasTimeLabel.push(time)
      
      // console.log((this.randomData))
      }, 5000)}
      
      ,getWaterTimeLabel(){
      this.waterTimeLabel =[]
      // randnum = 0

      // while (this.randomData.length <10){
      setInterval(() => {
        var today = new Date()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        this.waterTimeLabel.push(time)
      
      // console.log((this.randomData))
      }, 6000)}
      



  },
  async mounted() {
    const token = window.localStorage.getItem("token");
    try {
      
      
        const res1 = await API.findProfile(token)
        const { live } = res1.data[0]
        if (!live){
          this.xModal = true
          const result = await API.updateFirst({live: true}, token)
        } 
      
      
    } catch (error) {
      console.log(error)
    }
    try {
      
      
      this.i18n = this.$i18n;
      this.getRandomDatapoints();
      this.getRandomDatapointssmall();
      this.getRandomDatapointssmall2();
      this.getRandomDatapointssmall3();
      this.getRandomDatapointssmall4();
      this.getTimeLabel();
      this.getSmallTimeLabel();
      this.getGasTimeLabel();
      this.getWaterDatapoints();
      this.getWaterTimeLabel();
      this.getGasDatapoints3();
      this.getGasDatapoints2();
      this.getGasDatapoints1();
      this.getGasDatapoints();
      this.getWaterDatapoints();
      this.getWaterDatapoints1();
      this.getWaterDatapoints2();
      this.getWaterDatapoints3();
      this.getWaterDatapoints4();



      if (this.enableRTL) {
        this.i18n.locale = "ar";
        this.$rtl.enableRTL();
      }
      this.initBigChart(0);
      this.initGreenChart2(0);
      this.initGreenChart3(0);

    } catch(err){
      console.log(err)
    }
    


  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style>
 .my-modal{
    text-align: center;
  }
</style>
