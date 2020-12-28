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

      <div class="row lt-3" v-else>
        <div class="col-sm-4">
          <div class="p-3 alert alert-secondary card-group-cls">
            <h4>Pendientes</h4>
            <br>
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
              <b-card-text class="task-assignee">
                Encargado: {{ task.assignee.full_name }}
              </b-card-text>
              <div class="options-cont">
                <b-button class="edit-btn" variant="primary">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Editar
                </b-button>
                <b-dropdown class="md-2 prio-dpdwn">  
                  <template #button-content>
                    <b-icon icon="exclamation-triangle" aria-hidden="true"></b-icon> 
                     {{ translatePriority(task.priority_name) }}
                  </template>
                  <b-dropdown-item @click="changePriority(1, task.id)">Baja</b-dropdown-item>
                  <b-dropdown-item @click="changePriority(2, task.id)">Media</b-dropdown-item>
                  <b-dropdown-item @click="changePriority(3, task.id)">Alta</b-dropdown-item>
                </b-dropdown>
              </div>
              </b-card>
            </draggable>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="p-3 alert alert-primary card-group-cls">
            <h4>En curso</h4>
            <br>
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
              <b-card-text class="task-assignee">
                Encargado: {{ task.assignee.full_name }}
              </b-card-text>
              <div class="options-cont">
                <b-button class="edit-btn" variant="primary">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Editar
                </b-button>
                <b-dropdown class="md-2 prio-dpdwn">  
                  <template #button-content>
                    <b-icon icon="exclamation-triangle" aria-hidden="true"></b-icon> 
                     {{ translatePriority(task.priority_name) }}
                  </template>
                  <b-dropdown-item @click="changePriority(1, task.id)">Baja</b-dropdown-item>
                  <b-dropdown-item @click="changePriority(2, task.id)">Media</b-dropdown-item>
                  <b-dropdown-item @click="changePriority(3, task.id)">Alta</b-dropdown-item>
                </b-dropdown>
              </div>
              </b-card>
            </draggable>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="p-3 alert alert-success card-group-cls">
            <h4>Finalizadas</h4>
            <br>
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
              <b-card-text class="task-assignee">
                Encargado: {{ task.assignee.full_name }}
              </b-card-text>
              <div class="options-cont">
                <b-button class="edit-btn" variant="primary">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Editar
                </b-button>
                <b-dropdown class="md-2 prio-dpdwn">  
                  <template #button-content>
                    <b-icon icon="exclamation-triangle" aria-hidden="true"></b-icon> 
                     {{ translatePriority(task.priority_name) }}
                  </template>
                  <b-dropdown-item @click="changePriority(1, task.id)">Baja</b-dropdown-item>
                  <b-dropdown-item @click="changePriority(2, task.id)">Media</b-dropdown-item>
                  <b-dropdown-item @click="changePriority(3, task.id)">Alta</b-dropdown-item>
                </b-dropdown>
              </div>
              </b-card>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTasks, changeTaskStatus, changeTaskPriority } from "../api/api.service.js";
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
    },
    changePriority(priority, taskId) {
      console.log("taskId: ", taskId);
      const taskPriorityData = {
        "priority": priority
      };
      console.log("newPriority: ", priority);
      changeTaskPriority(this.projectId, taskId, taskPriorityData)
        .then(response => {
          console.log("task priority changed!");
          console.log("response: ", response);
        })
        .catch(e => {
          console.log(e)
        });
    },
    translatePriority(priority) {
      const translations = {
        'LOW': 'Baja',
        'MEDIUM': 'Media',
        'HIGH': 'Alta',
      };
      console.log("priority: ", priority);
      console.log("translation: ", translations[priority]);
      return translations[priority];
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
    min-height: 75vh;
  }

  .options-cont {
    display: flex;
  }

  .edit-btn {
    margin-right: auto;
  }

</style>