<template>
  <div>
    
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import API from './api/API'
  export default {
    methods: {
      disableRTL() {
        if (!this.$rtl.isRTL) {
          this.$rtl.disableRTL();
        }
      },
      toggleNavOpen() {
        let root = document.getElementsByTagName('html')[0];
        root.classList.toggle('nav-open');
      }
    },
    async mounted() {
      
      this.$watch('$route', this.disableRTL, { immediate: true });
      this.$watch('$sidebar.showSidebar', this.toggleNavOpen)
      
      
    }
  };
</script>

<style lang="scss"></style>
