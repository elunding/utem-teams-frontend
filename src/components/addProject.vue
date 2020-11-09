<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Nombre Proyecto</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="project.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripcion</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="project.description"
          name="description"
        />
      </div>

      <button @click="saveProject" class="btn btn-success">Guardar</button>
    </div>

    <div v-else>
      <h4>Proyecto creado!</h4>
      <button class="btn btn-success" @click="newProject">Añadir</button>
    </div>
  </div>
</template>

<script>
import {createProject} from "../api/projects.api.js";

export default {
  name: "add-project",
  data() {
    return {
      project: {
        id: null,
        name: "",
        description: ""
      },
      submitted: false
    };
  },
  methods: {
    saveProject() {
      let data = {
        name: this.project.name,
        description: this.project.description
      };
      console.log("data: ", data);
      console.log("calling createProject...")
      createProject(data)
        .then(response => {
          this.description.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newProject() {
      this.submitted = false;
      this.project = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>