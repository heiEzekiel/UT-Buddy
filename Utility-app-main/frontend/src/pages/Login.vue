<template>
  <div class="container ">
    <card style="width: 70%;" class="mx-auto login">
      <div class="card-body">
        <h2 class="card-title">Login</h2>
        <form action="">
          <base-input label="Email" placeholder="Email" v-model="email">
          </base-input>
          <base-input
            label="Password"
            placeholder="Password"
            v-model="password"
            type="password"
          >
          </base-input>
        </form>
        <vue-recaptcha :sitekey="site" @verify="verify"></vue-recaptcha>
        <label
          class="card-title label text-danger form-label"
          v-if="!recaptcha"
        >
          Not yet verified </label
        ><br />
        <div @click="login">
        <vue-loading-button
          :loading="isLoading"
          
          class="btn btn-primary "
          
          >Login</vue-loading-button
        >
        </div>
        <div class="card-text">
          <p v-if="error" class="text-danger label">
            Please check that you have done the verification. If yes, you have
            entered an incorrect email/password. Please try again.
          </p>
          <u
            ><router-link to="/register"
              >Haven't made an account? Register here</router-link
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
import BaseInput from "../components/Inputs/BaseInput.vue";
export default {
  components: {
    Card
  },
  data() {
    return {
      email: null,
      password: null,
      error: false,
      site: "6LeXbNEcAAAAADXZ4hJWouw34d7_KNQHrFddaGE7",
      recaptcha: null,
      isLoading: false
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      const data = {
        email: this.email,
        password: this.password
      };

      if (this.email && this.password && this.recaptcha) {
        try {
          const res = await API.signin(data);
          const { token } = res.data;
          
          window.localStorage.setItem("token", token);
          this.$router.push("/home/dashboard");
        } catch (error) {
          this.error = true;
        }
      } else {
        this.error = true;
      }
    },
    verify(response) {
      this.isLoading = false;
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
#rc-anchor-container{
  width: 500px !important;
}
</style>
