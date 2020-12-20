<template>
  <div class="col-md-12">
    <h3> Proyectos </h3>
    <br/>
    <div class="my-grid">
      <div class="jumbotron" v-if="!projects || !projects.length">  
        <h3 class="display-6">No hay proyectos existentes</h3>
        <p class="lead"></p>
        <hr class="my-4">
        <p></p>
        <a class="btn btn-primary btn-lg" href="/projects/new" role="button">Crear Proyecto</a>
      </div>
      <b-card-group v-else v-for="(project, index) in projects" :key="index">
          <b-card 
            class="proj-card"
            :title="project.name"
            style="max-width: 23rem; margin-bottom: 20px;"
          >
            <b-card-text class="proj-description">
              {{ project.description }}
            </b-card-text>
            <b-button class="details-btn" id="proj-details-btn" variant="primary">Ver detalles</b-button>
            <a v-bind:href="`/projects/${project.id}/tasks`" class="btn btn-primary btn tasks-btn" role="button">Ver Tareas</a>
          </b-card>
        </b-card-group>
      </div>
  </div>
</template>

<script>
import { getProjects } from "../api/api.service.js";

export default {
  name: "list-project",
  data() {
    return {
      projects: []
    };
  },
  methods: {
    retrieveProjects() {
      console.log("calling getProjects...")
      getProjects()
        .then(response => {
          this.projects = response.data.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
      console.log("mounted!")
      console.log("calling retrieveProjects...")
      this.retrieveProjects();
    }
};
</script>

<style scoped>
  .tasks-btn {
    float: right;
  }

  .proj-description {
    margin-bottom: 40px;
  }

  .my-grid {
    display: grid;
    /*justify-items: center;*/
    /* 280px is the minimum a column can get, you might need to adjust it based on your needs. */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 1.5rem;
  }

  .my-grid > * {
    width: 100%;
    max-width: 20rem;
  }

</style>