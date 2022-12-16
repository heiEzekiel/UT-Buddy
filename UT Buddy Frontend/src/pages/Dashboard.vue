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
              <h2 class='text-success'>This is the Main Dashboard</h2>

              <h4 class='text-dark'>Under this page, you will be able to view the breakdown of your bills and utility consumption.</h4>
            
            <br>
            <h4 class='text-primary'>Click anywhere to continue </h4>
                      
            <template v-slot:close-button>
            </template>
          </modal>
           </div>
    <div class="row">
      <div class="col-xl-3">
        <card class="card-body kpi-card">
          <div>
            <div class="row">
              <div class="col-3">
                <div class="icon-big text-center">
                  <i
                    class="tim-icons icon-money-coins text-success"
                    style="font-size: 35px"
                  ></i>
                </div>
              </div>
              <div class="col-9">
                <div class="numbers bill-cards" >
                  <p>Outstanding Bill ({{ billMonth }})</p>
                  <h3 style="margin-bottom: 0px">{{ billAmount }}</h3>
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div class="stats text-white">
                <span> Updated as of {{ currTime }} </span>
              </div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3">
        <card class="card-body kpi-card pb-3">
          <div>
            <div class="row">
              <div class="col-3">
                <div class="icon-big text-center">
                  <i
                    class="fas fa-bolt text-success"
                    style="font-size: 35px"
                  ></i>
                </div>
              </div>
              <div class="col-9">
                <div class="numbers number-cards" >
                  <p>Electricity Consumption (kwh)</p>
                  <h3 style="margin-bottom: 0px">{{ kpi1 }}</h3>
                </div>
              </div>
            </div>
            <div>
              <hr class="mb-0" />
              <div class="stats">
                <button
                  id="elecBtn"
                  type="button"
                  class="btn btn-warning  btn-outline-success btn-sm "
                  :disabled="elecDis"
                  @click="elecKPI"
                >
                  <i class="tim-icons icon-refresh-01"></i> Update now
                </button>
              </div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3">
        <card class="card-body kpi-card pb-3">
          <div>
            <div class="row">
              <div class="col-3">
                <div class="icon-big text-center">
                  <i
                    class="fas fa-tint text-success"
                    style="font-size: 35px"
                  ></i>
                </div>
              </div>
              <div class="col-9">
                <div class="numbers number-cards" >
                  <p>Water Consumption (Cu M)</p>
                  <h3 style="margin-bottom: 0px">{{ kpi2 }}</h3>
                </div>
              </div>
            </div>
            <div>
              <hr class="mb-0" />
              <div class="stats">
                <button
                  type="button"
                  id="waterBtn"
                  class="btn  btn-warning btn-outline-success btn-sm"
                  :disabled="waterDis"
                  @click="waterKPI"
                >
                  <i class="tim-icons icon-refresh-01"></i> Update now
                </button>
              </div>
            </div>
          </div>
        </card>
      </div>
      <div class="col-xl-3">
        <card class="card-body kpi-card pb-3">
          <div>
            <div class="row">
              <div class="col-3">
                <div class="icon-big text-center">
                  <i
                    class="fas fa-burn text-success"
                    style="font-size: 40px"
                  ></i>
                </div>
              </div>
              <div class="col-9">
                <div class="numbers number-cards" >
                  <p>Gas Consumption (kwh)</p>
                  <h3 style="margin-bottom: 0px">{{ kpi3 }}</h3>
                </div>
              </div>
            </div>
            <div>
              <hr class="mb-0" />
              <div class="stats">
                <button
                  type="button"
                  id="gasBtn"
                  class="btn btn-warning btn-outline-success btn-sm"
                  :disabled="gasDis"
                  @click="gasKPI"
                >
                  <i class="tim-icons icon-refresh-01"></i> Update now
                </button>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row chart">
              <div v-if="isLoading" class="loader">
                <vue-simple-spinner
                  message="Please wait while we retrieve your information"
                ></vue-simple-spinner>
              </div>
              <div class="col-sm-6 text-left">
                <h2 class="card-title">
                  {{ $t("dashboard.monthlyConsumption") }}
                </h2>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle float-right"
                  data-toggle="buttons"
                >
                  <label
                    v-for="(option, index) in bigBarChartCategories"
                    :key="option"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{ active: bigBarChart.activeIndex === index }"
                    :id="index"
                  >
                    <input
                      type="radio"
                      @click="initBigChart(index)"
                      name="options"
                      autocomplete="off"
                      :checked="bigBarChart.activeIndex === index"
                    />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              ref="bigChart"
              chart-id="big-bar-chart"
              :chart-data="bigBarChart.chartData"
              :gradient-colors="bigBarChart.gradientColors"
              :gradient-stops="bigBarChart.gradientStops"
              :extra-options="bigBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-4" id="elecBreak">
        <card type="chart" class="bdchart">
          <template slot="header">
            <h3 class="card-title">
              <i class="fas fa-bolt text-success" style="font-size: 20px"></i>
              {{ $t("dashboard.electricityBreakdown") }}
            </h3>
          </template>
          <div class="chart-area">
            <doughnut-chart
              style="height: 100%"
              chart-id="doughnut-chart"
              :chart-data="electricityDoughnut.chartData"
              :extra-options="electricityDoughnut.extraOptions"
            >
            </doughnut-chart>
          </div>
        </card>
      </div>
      <div class="col-xl-4" id="waterBreak">
        <card type="chart" class="bdchart">
          <template slot="header">
            <h3 class="card-title">
              <i class="fas fa-tint text-success" style="font-size: 20px"></i>
              {{ $t("dashboard.waterBreakdown") }}
            </h3>
          </template>
          <div class="chart-area">
            <doughnut-chart
              style="height: 100%"
              chart-id="doughnut-chart"
              :chart-data="waterDoughnut.chartData"
              :extra-options="waterDoughnut.extraOptions"
            >
            </doughnut-chart>
          </div>
        </card>
      </div>
      <div class="col-xl-4" id="gasBreak">
        <card type="chart" class="bdchart">
          <template slot="header">
            <h3 class="card-title">
              <i class="fas fa-burn text-success" style="font-size: 20px"></i>
              {{ $t("dashboard.gasBreakdown") }}
            </h3>
          </template>
          <div class="chart-area">
            <doughnut-chart
              style="height: 100%"
              chart-id="doughnut-chart"
              :chart-data="gasDoughnut.chartData"
              :extra-options="gasDoughnut.extraOptions"
            >
            </doughnut-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import API from "../api/API";
import { Modal } from "@/components";

export default {
  components: {
    BarChart,
    TaskList,
    UserTable,
    DoughnutChart,
    Modal
  },
  data() {
    return {
      xModal: false,
      elecDis: true,
      waterDis: true,
      gasDis: true,
      isLoading: false,
      currYear: 0,
      currTime: "",
      bills: "",
      prevMonthNum: "",
      billMonth: "",
      billAmount: "",
      kpi1: "",
      kpi2: "",
      kpi3: "",
      electricityDoughnut: {
        extraOptions: chartConfigs.doughnutChartOptions,
        chartData: {
          labels: ["Aircon", "Fridge", "TV", "Fan & Lights", "Others"],
          datasets: [
            {
              label: "Electricity",
              data: [40, 30, 15, 10, 5],
              backgroundColor: [
                "rgb(116, 198, 157)",
                "rgb(183, 228, 199)",
                "rgb(45, 106, 79)",
                "rgb(27, 67, 50)",
                "rgb(36, 71, 60)",
              ],
              fontColor: "fff",
              borderColor: 'transparent'
            },
          ],
        },
      },
      waterDoughnut: {
        extraOptions: chartConfigs.doughnutChartOptions,
        chartData: {
          labels: ["Common", "Master", "Washing Machine", "Kitchen"],
          datasets: [
            {
              label: "Water",
              data: [45, 30, 15, 10],
              backgroundColor: [
                "rgb(42, 111, 151)",
                "rgb(1, 79, 134)",
                "rgb(137, 194, 217)",
                "rgb(169, 214, 229)",
              ],
              fontColor: "fff",
              borderColor: 'transparent'
            },
          ],
        },
      },
      gasDoughnut: {
        extraOptions: chartConfigs.doughnutChartOptions,
        chartData: {
          labels: ["Stove 1", "Stove 2", "Stove 3"],
          datasets: [
            {
              label: "Gas",
              data: [40, 30, 30],
              backgroundColor: [
                "rgb(170, 161, 200)",
                "rgb(213, 198, 224)",
                "rgb(150, 122, 161)",
              ],
              fontColor: "fff",
              borderColor: 'transparent'
            },
          ],
        },
      },
      bigBarChart: {
        allData: [],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [],
        },
        extraOptions: chartConfigs.bigBarChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
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
    bigBarChartCategories() {
      return this.$t("dashboard.chartCategories");
    },
    async stripe() {
      const token = window.localStorage.getItem("token");
      console.log(token);
      try {
        const res1 = await API.stripe(token);
        console.log(res1);
      } catch (err) {
        console.log(err);
      }
    },
  },
  methods: {
    setBigChartData(bills) {
      var numData = [[], [], []];
      for (var i = this.prevMonthNum + 1; i < 12; i++){
        var amount = parseInt(String(bills[i].price).slice(0, -2));
        for (var j = 0; j < numData.length; j++) {
          if (j == numData.length - 1) {
            numData[j].push(amount);
          } else {
            var temp = parseFloat(
              Math.floor(Math.random() * ((amount / 100) * 70)).toFixed(2)
            );
            numData[j].push(temp);
            amount = amount - temp;
          }
        }
      }
      for (var i = 0; i < this.prevMonthNum + 1; i++) {
        var amount = parseInt(String(bills[i].price).slice(0, -2));
        for (var j = 0; j < numData.length; j++) {
          if (j == numData.length - 1) {
            numData[j].push(amount);
          } else {
            var temp = parseFloat(
              Math.floor(Math.random() * ((amount / 100) * 70)).toFixed(2)
            );
            numData[j].push(temp);
            amount = amount - temp;
          }
        }
      }
      
      this.bigBarChart.allData = numData;
    },
    initBigChart(index) {
      var monthsData = [
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
      ];
      var monthLabels = [];
      for (var i = this.prevMonthNum + 1 ; i < 12; i++) {
        var month = monthsData[i] + " " + String(this.currYear-1);
        monthLabels.push(month);
      }
      for (var i = 0; i < this.prevMonthNum + 1; i++) {
        var month = monthsData[i] + " " + String(this.currYear);
        monthLabels.push(month);
      }
      
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.secondary,
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
            data: this.bigBarChart.allData[index],
          },
        ],
        labels: monthLabels,
      };
      //this.$refs.bigChart.updateGradients(chartData);
      this.bigBarChart.chartData = chartData;
      this.bigBarChart.activeIndex = index;
    },
    getBillMonth() {
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var d = new Date();
      this.prevMonthNum = parseInt(d.getMonth() - 1);
      this.billMonth = monthNames[d.getMonth() - 1];
      this.currTime = String(d).slice(0, String(d).indexOf("GMT"));
      this.currYear = d.getFullYear();
    },
    calBill(bills) {
      if (bills[this.prevMonthNum].paid == false) {
        this.billAmount =
          "$" +
          String(bills[this.prevMonthNum].price).slice(0, -2) +
          "." +
          String(bills[this.prevMonthNum].price).slice(-2);
      } else {
        this.billAmount = "$" + 0;
        this.billMonth = "Paid";
      }
    },
    elecKPI() {
      this.elecDis = true;
      setTimeout(() => (this.elecDis = null), 3000);
      var elec_list = [423, 467, 541, 392, 453];
      var random = Math.floor(Math.random() * elec_list.length);
      this.kpi1 = elec_list[random] ;
    },
    waterKPI() {
      this.waterDis = true;
      setTimeout(() => (this.waterDis = null), 3000);
      var water_list = [4230, 4670, 5410, 3920, 4530];
      var random = Math.floor(Math.random() * water_list.length);
      this.kpi2 = water_list[random] ;
    },
    gasKPI() {
      this.gasDis = true;
      setTimeout(() => (this.gasDis = null), 3000);
      var gas_list = [645, 342, 432, 589, 473];
      var random = Math.floor(Math.random() * gas_list.length);
      this.kpi3 =
        gas_list[random].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
    },

    showModal() {
      this.xModal = true;
    },
    closeModal() {
      this.xModal = false;
    }
    

  },
  async mounted() {
    
    this.isLoading = true;
    this.getBillMonth();
    const token = window.localStorage.getItem("token");
    try {
      
      
        const res1 = await API.findProfile(token)
        const { dashboard } = res1.data[0]
        
        if (!dashboard){
          this.xModal = true
          const result = await API.updateFirst({dashboard: true}, token)
        } 
      
      
    } catch (error) {
      console.log(error)
    }
    try {
      const result = await API.stripe(token);
      this.calBill(result.data.extracted);
      this.setBigChartData(result.data.extracted);
      this.initBigChart(0);
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
    this.i18n = this.$i18n;
    this.i18n.locale = "en";
    this.elecKPI();
    this.waterKPI();
    this.gasKPI();
  },
};
</script>
<style>
.chart {
  position: relative;
}
.loader {
  position: absolute;
  top: 250%;
}



@media screen and (min-width: 1200px) {
  .number-cards{
    height: 100px;
  }
  .bill-cards{
    height: 80px;
  }
}

@media screen and (max-width: 1800px) {
  .kpi-card {
    height: 15em;
  }
}
@media screen and (max-width: 1250px) {
  .kpi-card {
    height: 17em;
  }
}
@media screen and (max-width: 1200px) {
  .kpi-card {
    height: 12em;
  }
}
@media screen and (max-width: 1250px) {
  .bdchart {
    height: 25em;
  }
}
</style>