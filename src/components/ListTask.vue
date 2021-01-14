<template>
  <div class="col-md-12">
    <h3> Tareas: {{ projectName }} </h3>
    <br/>
    <div class="button-area">
      <b-button v-if="projectStatus" v-b-modal="`add-task-modal-${0}`" variant="primary">
        <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Añadir tarea
      </b-button>
      <TaskModal
        compId="add-task-modal"
        :taskId=0
        v-if="assigneeList" :assignees=assigneeList
        @reloadData="handleReload($event, 'push', 'TD')"
      />
    </div>
    <br/>
    <div class="my-grid">
      <div class="jumbotron" v-if="!tasksExists">
        <h3 class="display-6">No hay tareas existentes</h3>
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
                v-for="task in todoTasks" :key="task.id"
                style="max-width: 23rem; margin-bottom: 20px;"
              >
              <!--<b-card-text class="task-description">
                {{ task.description }}
              </b-card-text>-->
              <br>
              <b-card-text class="task-assignee">
                <b-icon icon="person-circle">
                </b-icon>
                Encargado: {{ task.assignee.full_name }}
              </b-card-text>
              <b-card-text>
                <b-icon icon="calendar-date">
                  
                </b-icon>
                Fecha límite: {{ task.due_date }}
              </b-card-text>
              <br>
              <div class="options-cont">
                <b-button v-b-modal="`edit-task-modal-${task.id}`" class="edit-btn" size="sm" variant="primary">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Editar
                </b-button>
                <TaskModal
                  compId="edit-task-modal"
                  :taskId="task.id"
                  v-if="assigneeList"
                  @reloadData="handleReload($event, 'update', 'TD')"
                  :assignees=assigneeList
                  mode="patch"
                  :taskObj=task
                  title="Editar Tarea"
                  buttonTitle="Guardar Cambios"
                  :selectedAssignee=task.assignee.uuid
                />
                <b-button v-b-modal="`delete-task-modal-${task.id}`" class="delete-btn" size="sm" variant="danger">
                  <b-icon icon="trash" aria-hidden="true"></b-icon> Eliminar
                </b-button>
                <TaskModal
                  compId="delete-task-modal"
                  :taskId="task.id"
                  mode="delete"
                  @reloadData="handleReload($event, 'delete', 'TD')"
                  :taskObj=task
                  title="Eliminar Tarea"
                  buttonTitle="Eliminar"
                />
                <b-dropdown size="sm" class="md-2 prio-dpdwn">  
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
                v-for="task in inProgressTasks" :key="task.id"
                style="max-width: 23rem; margin-bottom: 20px;"
              >
              <!--<b-card-text class="task-description">
                {{ task.description }}
              </b-card-text>-->
              <br>
              <b-card-text class="task-assignee">
                <b-icon icon="person-circle">
                </b-icon>
                Encargado: {{ task.assignee.full_name }}
              </b-card-text>
              <b-card-text>
                <b-icon icon="calendar-date">
                  
                </b-icon>
                Fecha límite: {{ task.due_date }}
              </b-card-text>
              <br>
              <div class="options-cont">
                <b-button v-b-modal="`edit-task-modal-${task.id}`" size="sm" class="edit-btn" variant="primary">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Editar
                </b-button>
                <TaskModal
                  compId="edit-task-modal"
                  :taskId="task.id"
                  @reloadData="handleReload($event, 'update', 'IP')"
                  v-if="assigneeList" :assignees=assigneeList
                  mode="patch"
                  :taskObj=task
                  title="Editar Tarea"
                  buttonTitle="Guardar Cambios"
                  :selectedAssignee=task.assignee.uuid
                />
                <b-button v-b-modal="`delete-task-modal-${task.id}`" class="delete-btn" size="sm" variant="danger">
                  <b-icon icon="trash" aria-hidden="true"></b-icon> Eliminar
                </b-button>
                <TaskModal
                  compId="delete-task-modal"
                  :taskId="task.id"
                  @reloadData="handleReload($event, 'delete', 'IP')"
                  mode="delete"
                  :taskObj=task
                  title="Eliminar Tarea"
                  buttonTitle="Eliminar"
                />
                <b-dropdown size="sm" class="md-2 prio-dpdwn">  
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
                v-for="task in doneTasks" :key="task.id"
                style="max-width: 23rem; margin-bottom: 20px;"
              >
              <!--<b-card-text class="task-description">
                {{ task.description }}
              </b-card-text>-->
              <br>
              <b-card-text class="task-assignee">
                <b-icon icon="person-circle">
                </b-icon>
                Encargado: {{ task.assignee.full_name }}
              </b-card-text>
              <b-card-text>
                <b-icon icon="calendar-date">
                  
                </b-icon>
                Fecha límite: {{ task.due_date }}
              </b-card-text>
              <br>
              <div class="options-cont">
                <b-button v-b-modal="`edit-task-modal-${task.id}`" size="sm" class="edit-btn" variant="primary">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Editar
                </b-button>
                <TaskModal 
                  compId="edit-task-modal"
                  :taskId="task.id"
                  @reloadData="handleReload($event, 'update', 'DN')"
                  v-if="assigneeList" :assignees=assigneeList
                  mode="patch"
                  :taskObj=task
                  title="Editar Tarea"
                  buttonTitle="Guardar Cambios"
                  :selectedAssignee=task.assignee.uuid
                />
                <b-button v-b-modal="`delete-task-modal-${task.id}`" class="delete-btn" size="sm" variant="danger">
                  <b-icon icon="trash" aria-hidden="true"></b-icon> Eliminar
                </b-button>
                <TaskModal
                  compId="delete-task-modal"
                  :taskId="task.id"
                  @reloadData="handleReload($event, 'delete', 'DN')"
                  mode="delete"
                  :taskObj=task
                  title="Eliminar Tarea"
                  buttonTitle="Eliminar"
                />
                <b-dropdown size="sm" class="md-2 prio-dpdwn">  
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
import { getTasks, changeTaskStatus, changeTaskPriority, getMembersList } from "../api/api.service.js";
import draggable from "vuedraggable";
import TaskModal from "./TaskModal"

export default {
  name: "list-task",
  components: {
    draggable,
    TaskModal
  },
  /*props: {
    projectName: {
      type: String,
      required: true
    }
  },*/
  data() {
    return {
      todoTasks: [],
      inProgressTasks: [],
      doneTasks: [],
      tasksExists: false,
      projectId: this.$route.params.id,
      projectName: '',
      projectStatus: '',
      assigneeList: []
    };
  },
  methods: {
    handleReload(task, mode, group) {
      console.log("on handleReload...")
      // this.retrieveTasks()
      if (mode === 'push') {
        this.todoTasks.push(task)
      } else if (mode === 'update') {
        if (group === 'TD') {
          const index = this.todoTasks.indexOf(task)
          console.log("index: ", index)
          console.log("splicing...")
          console.log("task: ", task)
          console.log("todoTasks: ", this.todoTasks)
          this.todoTasks.splice(index, 1, task)
        } else if (group === 'IP') {
          const index = this.inProgressTasks.indexOf(task)
          this.inProgressTasks.splice(index, 1, task)
        } else if (group === 'DN') {
          const index = this.doneTasks.indexOf(task)
          this.doneTasks.splice(index, 1, task)
        }
      } else if (mode === 'delete') {
        if (group === 'TD') {
          const index = this.todoTasks.indexOf(task)
          this.todoTasks.splice(index, 1)
        } else if (group === 'IP') {
          const index = this.inProgressTasks.indexOf(task)
          this.inProgressTasks.splice(index, 1)
        } else if (group === 'DN') {
          const index = this.doneTasks.indexOf(task)
          this.doneTasks.splice(index, 1)
        }
      }
    },
    retrieveTasks() {
      getTasks(this.projectId)
        .then(response => {
          this.todoTasks = response.data.data.todo_tasks
          this.inProgressTasks = response.data.data.in_progress_tasks
          this.doneTasks = response.data.data.done_tasks
          this.$nextTick(() => this.setTasksExists(
            this.todoTasks,
            this.inProgressTasks,
            this.doneTasks
          ));
          this.projectName = response.data.data.project_name;
          this.projectStatus = response.data.data.project_status;
          console.log(response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getAssignees() {
      let items = []
      getMembersList(this.projectId)
        .then(response => {
          console.log("assginee data: ", response.data.data)
          for (const data of response.data.data) {
            const item = {
              'value': data.uuid,
              'text': data.full_name,
            }
            items.push(item)
          }
          this.assigneeList = items
          console.log("assigneeList: ", this.assigneeList)
        })
        .catch(e => {
          console.log(e)
        })
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

      return translations[priority];
    }
  },
  created() {
    console.log("created!")
    console.log("calling getAssignees...")
    this.getAssignees()
  },
  mounted() {
      console.log("mounted!")
      console.log("calling retrieveTasks...")
      this.retrieveTasks()
      // this.getAssignees()
  },
};
</script>

<style scoped>
  .my-grid {
    display: flex;
    height: 100vh;
    flex-flow: column;
  }

  .tasks-btn {
    float: right;
  }

  .task-description {
    margin-bottom: 40px;
  }

  .card-group-cls {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .options-cont {
    display: flex;
  }

  .edit-btn {
    margin-right: auto;
    padding-right: 5px;
    padding-left: 5px;
  }

  .delete-btn {
    margin-right: auto;
    padding-right: 5px;
    padding-left: 5px;
  }

  /*.prio-dpdwn {
    padding-right: 5px;
    padding-left: 5px;
  }*/

</style>