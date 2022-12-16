<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/home/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/home/bills" name="bills" icon="tim-icons icon-coins"/>
        <sidebar-link to="/home/community" name="community" icon="tim-icons icon-bank"/>
        <sidebar-link to="/home/live-tracking" name="Live Tracking" icon="tim-icons icon-sound-wave"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar :gender="gender" :firstName="firstName" :url="url"></top-navbar>
      <dashboard-content @click.native="toggleSidebar">
      </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import API from '../../api/API'
export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  },
  data(){
    return {
      gender: null,
      firstName: null,
      url: null
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
  async mounted(){
    
    
    try {
      const token = window.localStorage.getItem("token");
      const res = await API.token(token);
    } catch(err){
      window.localStorage.clear()
      this.$router.push("/login")
    }
    try {
      const token = window.localStorage.getItem("token");
      const res1 = await API.findProfile(token)
      const { gender, name, picture } = res1.data[0]
      this.gender = gender
      this.firstName = name.split(" ")[0];
      this.url = picture
      
      
      
      
    } catch (error) {
      console.log(error)
    }
    
  },
};
</script>
