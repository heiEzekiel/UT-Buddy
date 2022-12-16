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
              <h2 class='text-success'>This is the Bills Page</h2>

            <h4 class='text-dark'>Under this page, you will be able to view the breakdown of your bills and utility consumption.</h4>
            
            <br>
            <h4 class='text-primary'>Click anywhere to continue </h4>
                      
            <template v-slot:close-button>
            </template>
          </modal>
           </div>

  <div class="row">
    <div class="col-12">
      <card :title="year" class="relative">
        <div class="table">
          <!-- <loading :loaded="isLoading"/> -->
          <div v-if="!isLoading" class="loader">
            <vue-simple-spinner message="Please wait while we retrieve your bills"></vue-simple-spinner>
          </div>
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            thead-classes="text-primary"
            :fulldata="fulldata"
            @goTo="goTo"
          >
          </base-table>
        </div>
      </card>
    </div>
  </div>
</div>

</template>

<script>
import { BaseTable } from "@/components";
import API from "../api/API";
import { Modal } from "@/components";

const tableColumns = ["Name", "Amount", "Status", "Date Paid"];

export default {
  components: {
    BaseTable, 
    Modal
  },
  data() {
    return {
       xModal: false,
      table1: {
        title: "Bills",
        columns: [...tableColumns],
        data: []
      },
      isLoading: false,
      fulldata: []
    };
  },
  computed:{
    year(){
      const date = new Date();
      
      return "Bills (" + date.getFullYear() + ")"
    }
  },
  methods: {
    async goTo(item) {
      const token = window.localStorage.getItem("token");
      item.paid = true;
      var count = 0;
      var data = this.table1.data.slice().reverse();
      const date = new Date();
      var string_date = String(date).substring(4, 24);
      for (var arr of data) {
        if (arr.name == item.name) {
          arr.date = string_date;
          break;
        }
        count += 1;
      }

      
      
      try {
        
        const result = API.stripeupdate({ count, date: string_date }, token);
      } catch (error) {
        console.log(error);
      }

      window.open(item.link);
    },
    showModal() {
      this.xModal = true;
    },
    closeModal() {
      this.xModal = false;
    }
    
  },
  async mounted() {
     
    const token = window.localStorage.getItem("token");
    try {
      
      
        const res1 = await API.findProfile(token)
        const { bills } = res1.data[0]
        if (!bills){
          this.xModal = true
          const result = await API.updateFirst({bills: true}, token)
        } 
      
      
    } catch (error) {
      console.log(error)
    }
    try {
      const result = await API.stripe(token);
      this.isLoading = true;

      
      var date = new Date()
      var month = date.getMonth()
      for (var index in result.data.extracted){
        if (index >= month){
          break
        } else {
          var price = String(result.data.extracted[index].price);
          price = "$" + price.substring(0,price.length-2) + "." + price.substr(price.length-2, 2)
          result.data.extracted[index].price = price
          this.table1.data.push(result.data.extracted[index])
          this.fulldata.push(result.data.extracted[index])
        }
      }
      
      
      this.table1.data = this.table1.data.reverse()
      this.fulldata = this.fulldata.reverse()
      
    } catch (error) {
      console.log(error)
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  border-radius: 10px;
  text-align: center;
  margin: auto;
}
.relative{
  position: relative;
}
.loader{
  position: absolute;
  top: 150%;
  left: 37%;
}
</style>
