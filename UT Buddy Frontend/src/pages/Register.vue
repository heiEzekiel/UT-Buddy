<template>
  <div class="container ">
    <card style="width: 70%;" class="mx-auto login">
      <div class="card-body">
        <h2 class="card-title">Register</h2>
        <form action="">
          <div class="row justify-content-between">
            <div class="col-lg-6 col-12">
              <base-input
                label="First Name"
                placeholder="First Name"
                v-model="firstName"
              >
              </base-input>
              
            </div>
            <div class="col-lg-6 col-12">
              <base-input
                label="Last Name"
                placeholder="Last Name"
                v-model="lastName"
              >
              </base-input>
              
            </div>
          </div>
          <base-input label="Address" placeholder="Address" v-model="address">
          </base-input>
          
          <base-input
            label="Postal Code"
            placeholder="Postal Code"
            v-model="zip"
          >
          </base-input>
          
          <base-input
            label="Occupation"
            placeholder="Occupation"
            v-model="occupation"
          >
          </base-input>
          <br v-if="!occupation">
          <label class="control-label">
            Gender
          </label>
          <select class="form-select w-100 mb-3 select bg-transparent" v-model="gender">
            <option value="M" selected>Male</option>
            <option value="F">Female</option>
          </select>
          
          <base-input label="Email" placeholder="Email" v-model="email">
          </base-input>
          
          <base-input
            label="Password"
            placeholder="Password"
            v-model="password"
            type="password"
          >
          </base-input>
          
          <base-input
            label="Re-confirm Password"
            placeholder="Re-confirm Password"
            v-model="re_password"
            type="password"
          >
          </base-input>
          
        </form>
        <vue-recaptcha :sitekey="site" @verify="verify"></vue-recaptcha>
        <label
          class="card-title label form-label"
          v-if="!recaptcha"
          style="color: red;"
        >
          Not yet verified </label
        >
        <div @click="register">
        <vue-loading-button
          :loading="isLoading"
          
          class="btn btn-primary mt-2"
          
          >Register</vue-loading-button
        >
        </div>
        <div class="card-text">
          <p v-if="error" class=" label" style="color: red;">
            {{ error }}
          </p>
          <u
            ><router-link to="/login" class="text-white"
              >Already have an account? Login here</router-link
            ></u
          >
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import Card from "../components/Cards/Card.vue";
import API from "../api/API";
import VueRecaptcha from "vue-recaptcha";
export default {
  components: {
    VueRecaptcha,
    Card
  },
  data() {
    return {
      isLoading: false,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      re_password: null,
      address: null,
      zip: null,
      occupation: null,
      recaptcha: null,
      error: null,
      site: "6LeXbNEcAAAAADXZ4hJWouw34d7_KNQHrFddaGE7",
      gender: null
    };
  },
  methods: {
    async register() {
      this.isLoading = true;
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        re_password: this.re_password,
        address: this.address,
        zip: this.zip,
        occupation: this.occupation,
        gender: this.gender
      };
      if (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.re_password &&
        this.address &&
        this.occupation &&
        this.recaptcha && 
        this.gender
      ) {
        try {
          const res = await API.signup(data);
          
          const { token } = res.data;

          window.localStorage.setItem("token", token);
          this.$router.push("/home/dashboard");
        } catch (error) {
          this.isLoading = false
          this.error = error.response.data.message;
        }
      } else {
        this.isLoading = false
        this.error = "You have not filled in all of the required details yet";
      }
    },
    verify(response) {
      this.recaptcha = response;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 5cm;
}
.label {
  font-size: 15px;
}
.rc-anchor-normal{
  width: 100%;
}
.select{
  background-color: #aadf9f;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  border-color: #aadf9f;
  height: 39px;
  padding-left: 13px;
  font-size: 0.75rem;
}
</style>
