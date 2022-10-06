<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
    <tr>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </tr>
    </thead>
    <tbody :class="tbodyClasses">
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in item"
            :key="index"
            v-if="column">
          <div v-if="index!=='paid'">
            <span v-if="index=='link'">
              <base-button slot="footer" type="primary" v-if="!item.paid" fill @click="goTo(item)">Pay</base-button>
              <base-button slot="footer" type="primary" v-if="item.paid" fill disabled='true'>Paid</base-button>
            </span>
            <span v-else>{{column}}</span>
          </div>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
import API from '../api/API'
  export default {
    name: 'base-table',
    props: {
      columns: {
        type: Array,
        default: () => [],
        description: "Table columns"
      },
      data: {
        type: Array,
        default: () => [],
        description: "Table data"
      },
      type: {
        type: String, // striped | hover
        default: "",
        description: "Whether table is striped or hover type"
      },
      theadClasses: {
        type: String,
        default: '',
        description: "<thead> css classes"
      },
      tbodyClasses: {
        type: String,
        default: '',
        description: "<tbody> css classes"
      }
    },
    computed: {
      tableClass() {
        return this.type && `table-${this.type}`;
      }
    },
    methods: {
      hasValue(item, column) {
        return item[column.toLowerCase()] !== "undefined";
      },
      itemValue(item, column) {
        return item[column.toLowerCase()];
      },
      async goTo(item){
        const token =
        window.localStorage.getItem("token")
        item.paid = true
        var count = 0
        var data = this.data.slice().reverse()
        for (var arr of data){
          
          if (arr.name == item.name){
            break
          }
          count += 1
          
        }
        console.log(count)
        try {
          const result = API.stripeupdate({count}, token)
        } catch (error) {
          console.log(error)
        }
        
        window.open(item.link)

      }
    }
  };
</script>
<style>
</style>
