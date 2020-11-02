<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Utem Team Work</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/projects" class="nav-link">Mis Proyectos</router-link>
        </li>
      </div>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a v-on:click.self="logout" class="nav-link">Cerrar Sesión</a>
        </li>
      </ul>
    </nav>
</template>

<script>
    import UserAuthService from '../api/authentication.service'

    export default {
        name: 'NavBar',
        data() {
            return {};
        },
        methods: {
            logout() {
                UserAuthService.logout();
                this.$router.push('/login');
            }
        }
    }
</script>
