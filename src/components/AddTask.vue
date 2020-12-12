<template>
 <div class="submit-form">
   
    <b-form v-if="!submitted">
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
          :options="assignee"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Crear Tarea</b-button>
    </b-form>
  </div>


</template>

<script>
import { createTask } from "../api/projects.api.js";

export default {
  name: "add-task",
  data() {
    return {
      task: {
        id: null,
        name: "",
        description: "",
        assignee: ""
      },
      submitted: false
    };
  },
  methods: {
    saveProject() {
      let data = {
        name: this.task.name,
        description: this.task.description,
        members: this.task.members
      };
      console.log("data: ", data);
      console.log("calling createTask...")
      createTask(data)
        .then(response => {
          this.description.name = response.data.name;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newProject() {
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