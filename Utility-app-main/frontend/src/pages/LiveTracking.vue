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

            <h4>Under this page, you will be able to view your utility at real time.</h4>
            
            <br>
            <h4 class='text-primary'>Click anywhere to continue </h4>
                      
            <template v-slot:close-button>
            </template>
          </modal>
           </div>
    <div class="row">
      <div class="col-xl-3 col-md-12 d-flex">
        <card class="card-body flex-fill">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-center">
                  <i class="tim-icons tim-icons-32 icon-atom text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers">
                  <p>Television</p>
                  {{usage1}} kwH
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats">
            
                <i class="tim-icons icon-refresh-02"></i> Updating Live</div>
              
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3 col-md-12 d-flex">
        <card class="card-body flex-fill">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-center">
                  <i class="tim-icons tim-icons-32 icon-mobile text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers">
                  <p>Electrical Stove</p>
                  {{usage2}} kwH
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-02"></i> Updating Live</div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3 col-md-12 d-flex" >
        <card class="card-body flex-fill" >
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-large text-center">
                  <i class="tim-icons tim-icons-32 icon-spaceship text-success "></i>
                </div>
              </div>
              <div class="col-7 ">
                <div class="numbers ">
                  <p>Oven</p>
                  {{usage3}} kwH
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-02"></i> Updating Live</div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3 col-md-12 d-flex">
        <card class="card-body flex-fill ">
          <div>
            <div class="row">
              <div class="col-5">
                <div class="icon-big text-center">
                  <i class="tim-icons tim-icons-32 icon-laptop text-success"></i>
                </div>
              </div>
              <div class="col-7">
                <div class="numbers">
                  <p>Air-Conditioner</p>
                  {{usage4}} kwH
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats"><i class="tim-icons icon-refresh-01"></i> Updating Live</div>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <!-- big line graph -->
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  {{ $t("dashboard.totalShipments") }}
                </h5>
                <h2 class="card-title">{{ $t("dashboard.monthlyUtilConsumption") }}: {{total}} </h2>
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
<!-- first mini line graph -->
      <div class="col-xl-4 col-md-12" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.electricityBreakdown") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i> {{usage1}}
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart1.chartData"
              :gradient-stops="greenLineChart1.gradientStops"
              :extra-options="greenLineChart1.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>

    <!-- second mini line graph -->

      <div class="col-xl-4 col-md-12" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.waterBreakdown") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-video-66 text-primary"></i> {{usage2}}
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

<!-- third mini line graph-->

      <div class="col-xl-4 col-md-12" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.gasBreakdown") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-atom text-primary"></i> {{usage3}}
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
    
  </div>
</template>
<script>
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
      xModal: false,
      randomData:[],
      smallrandomData:[],
      smallrandomData2:[],
      smallrandomData3:[],
      total:'',
      usage1:'',
      usage2:'',
      usage3:'',
      usage4:'',
    
      
      bigLineChart: {
        allData: [
          [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
        ],
        // activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      
      greenLineChart1: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["", "", "", "", ""],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
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
      
      greenLineChart2: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["", "", "", "", "git"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
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
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["", "", "", "", ""],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
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
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data:this.randomData,
          },
        ],
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
          "",
        ],
      };
      // this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      // this.bigLineChart.activeIndex = index;
       }, 1100);
    },


    initGreenChart1(index) {
      setInterval(() => {
      let chartData = {
        
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data:this.smallrandomData,
            },
          ],
        }
            // this.$refs.bigChart.updateGradients(chartData);
      this.greenLineChart1.chartData = chartData;
      // this.LineChart.activeIndex = index;
       }, 1100);
    },

    initGreenChart2(index) {
      setInterval(() => {
      let chartData = {
        
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data:this.smallrandomData2,
            },
          ],
        }
            // this.$refs.bigChart.updateGradients(chartData);
      this.greenLineChart2.chartData = chartData;
      // this.LineChart.activeIndex = index;
       }, 1100);
    },

    initGreenChart3(index) {
      setInterval(() => {
      let chartData = {
        
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data:this.smallrandomData,
            },
          ],
        }
            // this.$refs.bigChart.updateGradients(chartData);
      this.greenLineChart3.chartData = chartData;
      // this.LineChart.activeIndex = index;
       }, 1100);
    },



    getUsage1(){
      setInterval(() => {
      var usage_list = [100, 200, 3000, 400, 550, 300, 400, 700, 676, 765, 233];
      var random =  Math.floor(Math.random() * usage_list.length);
      this.usage1 = usage_list[random];
       }, 1100);
    },
    getUsage2(){
      setInterval(() => {
      var usage_list = [100, 200, 3000, 400, 550, 300, 400, 700, 676, 765, 233];
      var random =  Math.floor(Math.random() * usage_list.length);
      this.usage2 = usage_list[random];
       }, 1100);
    },
    getUsage3(){
      setInterval(() => {
      var usage_list = [100, 200, 3000, 400, 550, 300, 400, 700, 676, 765, 233, 5000, 670, 563, 5498, 3874, 2763, 465, 579,];
      var random =  Math.floor(Math.random() * usage_list.length);
      this.usage3 = usage_list[random];
       }, 1100);
    },
    
    getUsage4(){
      setInterval(() => {
      var usage_list = [100, 200, 3000, 400, 550, 300, 400, 700, 676, 765, 233];
      var random =  Math.floor(Math.random() * usage_list.length);
      this.usage4 = usage_list[random];
       }, 1100);
    },

    getTotal(){
      setInterval(() => {
      var total_list = [1075, 2043, 3423, 4411, 3423, 2324, 2427, 3424, 34242, 4322, 3434];
     var random =  Math.floor(Math.random() * total_list.length);
      this.total = total_list[random];
       }, 1100);
    },

    getRandomDatapoints(){
      setInterval(() => {
      let i =0; 
      this.randomData =[];
      for(i =0 ; i<12 ; i++)
      {
        let randnum = Math.floor(Math.random()*10000)
        this.randomData.push(randnum);
      }
  
      // console.log((this.randomData))
      }, 2000);

      
    },

    getRandomDatapointssmall(){
      setInterval(() => {
      let i =0; 
      this.smallrandomData =[];
      for(i =0 ; i<6 ; i++)
      {
        let randnum = Math.floor(Math.random()*100)
        this.smallrandomData.push(randnum);
      }
  
      // console.log((this.randomData))
      }, 2000);

      
    },

    getRandomDatapointssmall2(){
      setInterval(() => {
      let i =0; 
      this.smallrandomData2 =[];
      for(i =0 ; i<6 ; i++)
      {
        let randnum = Math.floor(Math.random()*100)
        this.smallrandomData2.push(randnum);
      }
  
      // console.log((this.randomData))
      }, 2000);

      
    },

    getRandomDatapointssmall3(){
      setInterval(() => {
      let i =0; 
      this.smallrandomData3 =[];
      for(i =0 ; i<6 ; i++)
      {
        let randnum = Math.floor(Math.random()*100)
        this.smallrandomData3.push(randnum);
      }
  
      // console.log((this.randomData))
      }, 2000);

      
    }, 
    showModal() {
      this.xModal = true;
    },
    closeModal() {
      this.xModal = false;
    }

  },
  mounted() {
    this.xModal = true
    this.i18n = this.$i18n;
    this.getRandomDatapoints();
    this.getRandomDatapointssmall();
    this.getRandomDatapointssmall2();
    this.getRandomDatapointssmall3();
    this.getUsage1();
    this.getTotal();
    this.getUsage2();
    this.getUsage3();
    this.getUsage4();
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
    this.initGreenChart1(0);
    this.initGreenChart2(0);
    this.initGreenChart3(0);


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
