<template>
  <table style="table-layout:fixed;" class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr v-if="community !== 'yes'">
        <slot name="columns">
         
           
            <th v-for="column in columns" :key="column"  class="text-center col"  >
            
            {{column}}
            
          </th>
          
          
          
            
          
        </slot>
      </tr>
      <tr v-else>
        <th class="text-center col-7 col-md-8">THREAD</th>
            <th class="text-center col-3 col-md-2">USERNAME</th>
            <th class="text-center col-2 col-md-2">REPLIES</th>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, num) in data" class="text-center" :key="num">
        <slot :row="item">
          <td v-for="(column, index) in item" :key="index">
            
              <span v-if="index == 'link'">
                <base-button
                  slot="footer"
                  type="primary"
                  v-if="!fulldata[num].paid"
                  @click="bills(fulldata[num])"
                  >Pay</base-button
                >
                <base-button slot="footer" type="primary" v-else disabled="true"
                  >Paid</base-button
                >
              </span>
              <span
                v-else-if="
                  index == 'name' || index == 'price' || index == 'date'
                "
                >{{ column }}</span
              >
              <span v-else-if="index == 'username'">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="emit(fulldata[num])"
                  style="width: 100%; padding: auto;"
                >
                  {{ column }}
                </button>
              </span>
              <span v-else-if="index == 'replies'">
                {{ column }}
              </span>
              <span v-else-if="index == 'thread'" >
              
                {{column}}
                
                <span v-if="fulldata[num].isUser"
                  > <i
                    class="tim-icons icon-trash-simple add ml-4"
                    style="cursor: pointer"
                    @click="remove(fulldata[num])"
                  ></i
                ></span>
                
              </span>
            
          </td>
          <!-- <td>
          {{item.name}}
        </td>
        <td>
          {{item.price}}
        </td>
        <td>
          <base-button slot="footer" type="primary" v-if="!item.paid" @click="goTo(item)">Pay</base-button>
          <base-button slot="footer" type="primary" v-else disabled='true'>Paid</base-button>
        </td>
        <td>
          {{item.date}}
        </td> -->
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
const token = window.localStorage.getItem("token");

export default {
  name: "base-table",
  data() {
    return {
      token: token
    };
  },
  props: {
    fulldata: null,
    community: null,
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
      default: "",
      description: "<thead> css classes"
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "<tbody> css classes"
    }
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    }
  },

  methods: {
    emit(item) {
      this.$emit("modal", item);
    },
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    bills(item) {
      this.$emit("goTo", item);
    },
    remove(item){
      this.$emit("delete", item)
    }
  }
};
</script>
<style></style>
