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
        <div class="col-sm-3">
          <div class="p-3 alert alert-secondary card-group-cls">
            <h4>Pendientes</h4>
            <draggable id="TD" class="drag-area" :list="todoTasks" group="tasks" :move="changeStatus">
              <b-card 
                class="task-card"
                :title="task.name"
                v-for="(task, index) in todoTasks" :key="index"
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
            <draggable id="IP" class="drag-area" :list="inProgressTasks" group="tasks" :move="changeStatus">
              <b-card 
                class="task-card"
                :title="task.name"
                v-for="(task, index) in inProgressTasks" :key="index"
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
          <div class="p-3 alert alert-success card-group-cls">
            <h4>Finalizadas</h4>
            <draggable id="DN" class="drag-area" :list="doneTasks" group="tasks" :move="changeStatus">
              <b-card 
                class="task-card"
                :title="task.name"
                v-for="(task, index) in doneTasks" :key="index"
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
import { getTasks, changeTaskStatus } from "../api/api.service.js";
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
      tasksExists: false,
      projectId: this.$route.params.id
    };
  },
  methods: {
    retrieveTasks() {
      getTasks(this.projectId)
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
    },
    changeStatus(ev) {
      const taskId = ev.draggedContext.element.id;
      console.log("taskId: ", taskId);
      const newStatus = ev.to.id;
      const taskData = {
        "status": newStatus
      };
      console.log("newStatus: ", newStatus);
      changeTaskStatus(this.projectId, taskId, taskData)
        .then(response => {
          console.log("task status changed!");
          console.log("response: ", response);
        })
        .catch(e => {
          console.log(e)
        });
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

</style>