<template>
  <b-modal 
    id="add-task-modal"
    ref="modal"
    title="Añadir Tarea"
    ok-title="Crear Tarea"
    ok-only
    @show="resetModal"
    @hidden="resetModal"
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
          :options="assigneeList"
        >
        </b-form-select>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import { createTask, getMembersList } from "../api/api.service.js";

export default {
  name: "AddTask",
  data() {
    return {
      task: {
        id: null,
        name: "",
        description: "",
        assignee: "",
      },
      assigneeList: [],
      selected: null,
      submitted: false,
      formValidity: null
    };
  },
  mounted() {
    let projectId = this.$route.params.id;
    let items = []
    getMembersList(projectId)
      .then(response => {
        console.log("assginee data: ", response.data.data)
        for (const data of response.data.data) {
          const item = {
            'value': data.uuid,
            'text': data.full_name,
          };
          items.push(item);
        }
        this.assigneeList = items;
        console.log("Items: ", items);
        console.log("assigneeList: ", this.assigneeList);
      })
      .catch(e => {
        console.log(e)
      })
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