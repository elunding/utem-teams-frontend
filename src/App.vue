<template>
  <div id="app">
    <!--<nav-bar v-if="this.$router.currentRoute.name !== 'login'"></nav-bar>-->
    <nav-bar v-if="!['login', 'sign-up', 'wait-confirm', 'verify'].includes(this.$router.currentRoute.name)"></nav-bar>

    <div class="container mt-3">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: "app",
  components: {
    'nav-bar': NavBar,
  }
};
</script>
