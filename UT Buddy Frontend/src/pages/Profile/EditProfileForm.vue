<template>
  <card>
    
    <h3 slot="header" class="title">Edit Profile</h3>
    <div class="row">
      <div class="col-md-6 pr-md-1 ">
        <base-input
          label="Email address"
          type="email"
          placeholder="mike@email.com"
          v-model="email"
          status=true
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input
          label="First Name"
          v-model="firstName"
          placeholder="First Name"
        >
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input
          label="Last Name"
          v-model="lastName"
          placeholder="Last Name"
        >
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <base-input
          label="Address"
          v-model="address"
          placeholder="Home Address"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="Postal Code" placeholder="ZIP Code" v-model="zip">
        </base-input>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-md-9 pr-md-1">
        <label class="control-label">
          About
        </label>
        <textarea
          class="form-control w-100 textbox"
          cols="2"
          rows="3"
          placeholder="Describe yourself"
          v-model="description"
        >
        </textarea>
      </div>
    </div>
    <div @click.prevent="saveinfo" class="mt-4" >
        <vue-loading-button
          :loading="isLoading1"
          style="font-size: 18px;"
          class="btn btn-primary "
          
          >{{Save}}</vue-loading-button
        >
        </div>
    <hr>

    <label class="control-label">
      Tips
    </label>
    <div class="row" v-for="(tip, index) in tips" :key="index">
      <div class="col-8">
        <ul>
          <li>
            <textarea
              rows="3"
              cols="80"
              class="form-control"
              placeholder="Key in any relevant tips"
              v-model="tip.words"
            >
            </textarea>
          </li>
        </ul>
      </div>
      <div class="col-4">
        <i
          class="tim-icons icon-trash-simple add m-auto"
          @click="remove(index)"
        ></i>
      </div>
    </div>
    <button @click.prevent="addTip" class="btn btn-black btn-sm">
      <i class="tim-icons icon-simple-add add m-auto"></i>
    </button>
    <div @click.prevent="save" class="mt-4" >
        <vue-loading-button
          :loading="isLoading2"
          style="font-size: 18px;"
          class="btn btn-primary "
          
          >{{SaveTips}}</vue-loading-button
        >
        </div>
  </card>
</template>
<script>
import API from "../../api/API";
export default {
  props: {
    tips: [],
    firstName: null,
    lastName: null,
    address: null,
    zip: null,
    email: null,
    description: null
  },
  data() {
    return {
      Save: "Save Information",
      SaveTips: "Save Tips",
      isLoading1: false,
      isLoading2: false
      
    };
  },
  computed:{
    descrip(){
      return this.description
    }
  },

  methods: {
    addTip() {
      this.tips.push({ words: "" });
    },
    async save() {
      this.isLoading2 = true;
      const token = window.localStorage.getItem("token");
      
      
      try {
        
        
        const res = await API.addTip({ tips: this.tips }, token);
        
        this.SaveTips = "Saved!"
        this.$emit("modal", "Successfully Saved Tips!")
        this.isLoading2 = false;
        
        window.location.reload()
      } catch (err) {
        this.$emit("modal", "Error has occurred. Please try again")
        
        console.log(err);
      }
    },
    async saveinfo() {
      this.isLoading1 = true;
      const token = window.localStorage.getItem("token");
      var name = this.firstName + " " + this.lastName;
      var address = this.address;
      var zip = this.zip;
      var description = this.description;
      
      try {
        const res1 = await API.updateProfile(
          { name, address, zip, description },
          token
        );
        
        
        
        this.Save = "Saved!"
        this.$emit("modal", "Successfully Saved Information!")
        this.isLoading1 = false;
        
        window.location.reload()
      } catch (err) {
        this.$emit("modal", "Error has occurred. Please try again")
        
        console.log(err);
      }
    },
    remove(val) {
      this.tips.splice(val, 1);
    }
  }
};
</script>
<style>
.add {
  color: white;
  cursor: pointer;
}

.textbox {
  border: 1px solid #aadf9f !important;
  border-radius: 6px !important;
  padding-left: 17px !important;
}

label {
  font-size: 15px !important;
}
</style>
