<template>
  <div class="col-md-12">
    <h3> Tareas </h3>
    <br/>
    <div class="my-grid">
      <div class="jumbotron" v-if="!tasks || !tasks.length">  
        <h3 class="display-6">No hay tareas existentes</h3>
        <p class="lead"></p>
        <hr class="my-4">
        <p></p>
        <router-link to="tasks/new" tag="a" class="btn btn-primary btn-lg">Crear Tarea</router-link>
      </div>
      <b-card-group v-else v-for="(task, index) in tasks" :key="index">
          <b-card 
            class="task-card"
            :title="task.name"
            style="max-width: 23rem; margin-bottom: 20px;"
          >
            <b-card-text class="task-description">
              {{ task.description }}
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>
  </div>
</template>

<script>
import { getTasks } from "../api/projects.api.js";

export default {
  name: "list-task",
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    retrieveTasks() {
      console.log("calling getProjects...")
      getTasks()
        .then(response => {
          this.tasks = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
      console.log("mounted!")
      console.log("calling retrieveTasks...")
      this.retrieveTasks();
    }
};
</script>

<style scoped>
  .tasks-btn {
    float: right;
  }

  .task-description {
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