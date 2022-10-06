<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" class="relative">
        <div class="table">
          <!-- <loading :loaded="isLoading"/> -->
          <div v-if="!isLoading" class="loader">
            <vue-simple-spinner message="Please wait while we retrieve your bills"></vue-simple-spinner>
          </div>
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { BaseTable } from "@/components";
import API from "../api/API";

const tableColumns = ["Name", "Amount", "Status"];

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      table1: {
        title: "Bills",
        columns: [...tableColumns],
        data: []
      },
      isLoading: false,
      
    };
  },
  methods: {
    
  },
  async mounted() {
    const token = window.localStorage.getItem("token");
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
        }
      }
      this.table1.data = this.table1.data.reverse()
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
