<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Utem Team Work</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/projects" class="nav-link">Mis Proyectos</router-link>
        </li>
      </div>
    </nav>
</template>

<script>
    export default {
        name: 'NavBar',
        data() {
            return {};
        }
    }

</script>