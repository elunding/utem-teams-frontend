<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <router-link to="/" class="navbar-brand">Team Work</router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Proyectos" right>
          <b-dropdown-item href="/projects">Ver Proyectos</b-dropdown-item>
          <b-dropdown-item href="/projects/new">Crear Proyecto</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <!--<em>User</em>-->
            <em> {{ userName }} </em>
          </template>
          <b-dropdown-item v-on:click.self="logout" class="nav-link">Cerrar Sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
    import UserAuthService from '../api/authentication.service';
    import { getUserDetails } from '../api/api.service.js';

    export default {
        name: 'NavBar',
        data() {
            return {
              'userName': ''
            };
        },
        methods: {
            logout() {
                UserAuthService.logout();
                this.$router.push('/login');
            }
        },
        created() {
          getUserDetails()
            .then(resp => {
              this.userName = resp.data.full_name;
            })
            .catch(e => {
              console.log("An error has occurred: ", e);
            });
        }
    }
</script>
