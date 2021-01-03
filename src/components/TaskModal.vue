<template>
  <b-modal 
    :id="`${compId}-${taskId}`"
    ref="modal"
    :title="title"
    :ok-title="buttonTitle"
    ok-only
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit" v-if="mode !== 'delete'">
      <b-form-group
        id="input-group-1"
        label="Nombre Tarea"
        label-for="task-name"
      >
        <!--<b-form-input v-if="mode === 'post'"-->
        <b-form-input
          id="task-name"
          v-model="task.name"
          type="text"
          required
          placeholder="Ingrese Nombre"
        >
        </b-form-input>
        <!--<b-form-input v-else-if="mode === 'patch'"
          id="task-name"
          v-model="task.name"
          type="text"
          :placeholder="taskObj.name"
        >
        </b-form-input>-->
      </b-form-group>

      <b-form-group id="input-group-2" label="Descripción" label-for="description">
        <!--<b-form-textarea v-if="mode === 'post'"-->
        <b-form-textarea
          id="description"
          rows="4"
          v-model="task.description"
          required
          placeholder="Inserte una descripción"
        >
        </b-form-textarea>
        <!--<b-form-textarea v-else-if="mode === 'patch'"
          id="description"
          rows="4"
          v-model="task.description"
          :placeholder="taskObj.description"
        >
        </b-form-textarea>-->
      </b-form-group>

      <b-form-group id="input-group-3" label="Encargado" label-for="assignee-dropdown">
        <!--<b-form-select v-if="mode === 'post'"-->
        <b-form-select
          id="assignee-dropdown"
          v-model="task.assignee"
          :options="assignees"
        >
        </b-form-select>
        <!--<b-form-select v-else-if="mode === 'patch'"
          id="assignee-dropdown"
          v-model="task.assignee"
          :options="assignees"
          :selected="taskObj.assignee.full_name"
        >
        </b-form-select>-->
      </b-form-group>
    </form>
    <h5 v-else> ¿Estás seguro de eliminar {{ taskObj.name }}? </h5>
  </b-modal>
</template>

<script>
import { createTask, updateTask, deleteTask } from "../api/api.service.js";

export default {
  name: "TaskModal",
  props: {
    title: {
      type: String,
      required: false,
      default: 'Crear Tarea'
    },
    compId: {
      type: String,
      required: true
    },
    buttonTitle: {
      type: String,
      required: false,
      default: 'Añadir Tarea'
    },
    taskId: {
      type: Number,
      required: true
    },
    assignees: {
      type: Array,
      required: false
    },
    taskObj: {
      type: Object,
      required: false
    },
    mode: {
      type: String,
      required: false,
      default: 'post'
    }
  },
  data() {
    return {
      task: {
        id: null,
        name: "",
        description: "",
        assignee: "",
      },
      selected: null,
      submitted: false,
      formValidity: null,
      projectId: this.$route.params.id,
    };
  },
  mounted() {
    /*let projectId = this.$route.params.id;
    let items = []*/
    console.log("assignees: ", this.assignees)
    if (this.mode === 'patch') {
      this.task = {...this.taskObj}
      this.selected = this.taskObj.assignee.full_name
      console.log("full_name: ", this.taskObj.assignee.full_name)
      console.log("this.selected: ", this.selected)
    }
    // this.assigneeList = this.assignees
  },
  methods: {
    validateForm() {
      const isValid = this.$refs.form.checkValidity()
      console.log("is valid?: ", isValid)
      this.formValidity = isValid
      return isValid
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.mode !== 'delete') {
        this.handleSubmit()
      } else {
        this.handleTaskDeletion(this.taskId)
      }
      
      this.$nextTick(() => {
        this.$bvModal.hide(`${this.compId}-${this.taskId}`)
        this.$emit('reloadData')
      })
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return
      }

      console.log("mode: ", this.mode)

      if (this.mode === 'post') {
        this.saveTask()
      } else if (this.mode === 'patch') {
        console.log("in else if...")
        this.updateTask(this.taskId)
      }
      
    },
    saveTask() {
      let data = {
        name: this.task.name,
        description: this.task.description,
        assignee: {
          uuid: this.task.assignee
        }
      };
      // let projectId = this.$route.params.id;
      console.log("data: ", data);
      console.log("projectId: ", this.projectId);
      console.log("calling createTask...");
      createTask(data, this.projectId)
        .then(response => {
          this.description.name = response.data.name;
          console.log("Task created!, data: ", response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateTask(taskId) {
     let data = {
        name: this.task.name || '',
        description: this.task.description || '',
        assignee: {
          uuid: this.task.assignee
        }
      };
      // let projectId = this.$route.params.id;
      console.log("calling updateTask...");
      console.log("data: ", data);
      updateTask(this.projectId, taskId, data)
        .then(response => {
          this.description.name = response.data.name;
          console.log("Task created!, data: ", response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        }); 
    },
    handleTaskDeletion(taskId) {
      deleteTask(this.projectId, taskId)
        .then(response => {
          console.log("task deleted! ", taskId)
          console.log("projectId: ", this.projectId)
          console.log("response: ", response)
        })
        .catch(e => {
          console.log(e)
        })
    },
    newTask() {
      this.submitted = false;
      this.task = {};
    }
  }
};
</script>

<style scoped>
  .submit-form {
    margin-top: 90px;
    /*width: 800px;*/
    /*margin: auto;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>