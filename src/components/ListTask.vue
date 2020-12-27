<template>
  <div class="col-md-12">
    <h3> Tareas </h3>
    <br/>
    <div class="my-grid">
      <div class="jumbotron" v-if="!tasksExists">  
        <h3 class="display-6">No hay tareas existentes</h3>
        <p class="lead"></p>
        <hr class="my-4">
        <p></p>
        <router-link to="tasks/new" tag="a" class="btn btn-primary btn-lg">Crear Tarea</router-link>
      </div>

      <div class="row mt-3" v-else>
        <!--<div class="col-sm-3">
          <div class="p-2 alert alert-secondary">
            <h4>Por hacer</h4>
            <b-card-group  v-for="(task, index) in todoTasks" :key="index">
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
        </div>-->

        <div class="col-sm-3">
          <div class="p-3 alert alert-secondary card-group-cls">
            <h4>Pendientes</h4>
            <draggable class="card-group" v-for="(task, index) in todoTasks" :key="index">
              <b-card 
                class="task-card"
                :title="task.name"
                style="max-width: 23rem; margin-bottom: 20px;"
              >
              <b-card-text class="task-description">
                {{ task.description }}
              </b-card-text>
              </b-card>
            </draggable>
          </div>
        </div>

        <div class="col-sm-3">
          <div class="p-3 alert alert-primary card-group-cls">
            <h4>En curso</h4>
            <draggable class="card-group" v-for="(task, index) in inProgressTasks" :key="index">
              <b-card 
                class="task-card"
                :title="task.name"
                style="max-width: 23rem; margin-bottom: 20px;"
              >
              <b-card-text class="task-description">
                {{ task.description }}
              </b-card-text>
              </b-card>
            </draggable>
          </div>
        </div>

        <!--<div class="col-sm-3">
          <div class="p-2 alert alert-success">
            <h4>Finalizadas</h4>
            <b-card-group v-for="(task, index) in todoTasks" :key="index">
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
        </div>-->

        <div class="col-sm-3">
          <div class="p-3 alert alert-success card-group-cls">
            <h4>Finalizadas</h4>
            <draggable class="card-group" v-for="(task, index) in doneTasks" :key="index">
              <b-card 
                class="task-card"
                :title="task.name"
                style="max-width: 23rem; margin-bottom: 20px;"
              >
              <b-card-text class="task-description">
                {{ task.description }}
              </b-card-text>
              </b-card>
            </draggable>
          </div>
        </div>


      </div>

      
      
    </div>
  </div>
</template>

<script>
import { getTasks } from "../api/api.service.js";
import draggable from "vuedraggable";

export default {
  name: "list-task",
  components: {
    draggable
  },
  data() {
    return {
      todoTasks: [],
      inProgressTasks: [],
      doneTasks: [],
      tasksExists: false
    };
  },
  methods: {
    retrieveTasks() {
      let projectId = this.$route.params.id;
      getTasks(projectId)
        .then(response => {
          this.todoTasks = response.data.data.todo_tasks;
          this.inProgressTasks = response.data.data.in_progress_tasks;
          this.doneTasks = response.data.data.done_tasks;
          this.$nextTick(() => this.setTasksExists(
            this.todoTasks,
            this.inProgressTasks,
            this.doneTasks
          ));
          console.log(response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    setTasksExists(todos, inProgress, done) {
      if ((todos && todos.length) || (inProgress && inProgress.length) || (done && done.length)) {  
        console.log("condition satisfied...");
        this.tasksExists = true;
      }
    }
  },
  mounted() {
      console.log("mounted!")
      console.log("calling retrieveTasks...");
      this.retrieveTasks();
  },
};
</script>

<style scoped>
  .tasks-btn {
    float: right;
  }

  .task-description {
    margin-bottom: 40px;
  }

  .card-group-cls {
    min-height: 300px
  }

  /*.my-grid {
    display: grid;*/
    /*justify-items: center;*/
    /* 280px is the minimum a column can get, you might need to adjust it based on your needs. */
    /*grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 1.5rem;
  }

  .my-grid > * {
    width: 100%;
    max-width: 20rem;
  }*/

</style>