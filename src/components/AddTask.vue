<template>
  <b-modal 
    :id="`${compId}-${taskId}`"
    ref="modal"
    :title="title"
    :ok-title="buttonTitle"
    ok-only
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit" v-if="!submitted">
      <b-form-group
        id="input-group-1"
        label="Nombre Tarea"
        label-for="task-name"
      >
        <b-form-input
          id="task-name"
          v-model="task.name"
          type="text"
          required
          placeholder="Ingrese Nombre"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Descripción" label-for="description">
        <b-form-textarea
          id="description"
          rows="4"
          v-model="task.description"
          required
          placeholder="Inserte una descripción"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-3" label="Encargado" label-for="assignee-dropdown">
        <b-form-select
          id="assignee-dropdown"
          v-model="task.assignee"
          :options="assignees"
        >
        </b-form-select>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import { createTask } from "../api/api.service.js";

export default {
  name: "AddTask",
  props: {
    title: {
      type: String,
      required: true
    },
    compId: {
      type: String,
      required: true
    },
    buttonTitle: {
      type: String,
      required: true
    },
    taskId: {
      type: Number,
      required: true
    },
    assignees: {
      type: Array,
      required: true
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
      formValidity: null
    };
  },
  mounted() {
    /*let projectId = this.$route.params.id;
    let items = []*/
    console.log("assignees: ", this.assignees)
    // this.assigneeList = this.assignees
  },
  methods: {
    validateForm() {
      const isValid = this.$refs.form.checkValidity()
      this.formValidity = isValid
      return isValid
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return
      }

      this.saveTask()
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    saveTask() {
      let data = {
        name: this.task.name,
        description: this.task.description,
        assignee: {
          uuid: this.task.assignee
        }
      };
      let projectId = this.$route.params.id;
      console.log("data: ", data);
      console.log("projectId: ", projectId);
      console.log("calling createTask...");
      createTask(data, projectId)
        .then(response => {
          this.description.name = response.data.name;
          console.log("Task created!, data: ", response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
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