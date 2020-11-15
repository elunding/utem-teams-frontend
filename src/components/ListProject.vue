<template>
  <div class="col-md-12">
    <h3> Proyectos </h3>
    <br/>
    <div class="my-grid">
      <b-card-group v-for="(project, index) in projects" :key="index">
          <b-card 
            class="proj-card"
            :title="project.name"
            style="max-width: 23rem; margin-bottom: 20px;"
          >
            <b-card-text class="proj-description">
              {{ project.description }}
            </b-card-text>
            <b-button class="details-btn" id="proj-details-btn" variant="primary">Ver detalles</b-button>
            <b-button class="tasks-btn" id="proj-tasks-btn"  variant="primary">Ver Tareas</b-button>
          </b-card>
        </b-card-group>
      </div>
  </div>
</template>

<script>
import { getProjects } from "../api/projects.api.js";

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
          this.projects = response.data;
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