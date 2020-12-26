<template>
 <div class="submit-form">
   
    <b-form v-if="!submitted">
      <b-form-group
        id="input-group-1"
        label="Nombre proyecto"
        label-for="project-name"
      >
        <b-form-input
          id="project-name"
          v-model="project.name"
          type="text"
          required
          placeholder="Ingrese Nombre"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Descripción" label-for="description">
        <b-form-textarea
          id="description"
          rows="4"
          v-model="project.description"
          required
          placeholder="Inserte una descripción"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-3" label="Integrantes (opcional)" label-for="members-dropdown">
        <multiselect
          v-model="project.members"
          :options="userList"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Selecciona miembros"
          label="full_name"
          track-by="full_name"
        >
        </multiselect>
      </b-form-group>

      <b-button @click="saveProject" variant="primary">Crear Proyecto</b-button>
    </b-form>
  </div>


</template>

<script>
import { getUserList, createProject } from "../api/api.service.js";
import Multiselect from 'vue-multiselect';

export default {
  name: "add-project",
  data() {
    return {
      project: {
        id: null,
        name: "",
        description: "",
        members: []
      },
      userList: [],
      value: [],
      submitted: false
    };
  },
  components: { Multiselect },
  mounted() {
    let items = []
    getUserList()
      .then(response => {
        console.log("users data: ", response.data.data)
        for (const data of response.data.data) {
          const item = {
            'uuid': data.uuid,
            'full_name': data.full_name,
          };
          items.push(item);
        }
        this.userList = items;
        console.log("Items: ", items);
        console.log("userList: ", this.userList);
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    saveProject() {
      let data = {
        name: this.project.name,
        description: this.project.description,
        project_members: this.project.members.map(({ uuid }) => ({ uuid: uuid }))
      };
      console.log("data: ", data);
      console.log("members: ", data.project_members)
      console.log("calling createProject...")
      createProject(data)
        .then(response => {
          this.description.id = response.data.id;
          console.log("Project created!, data: ", response.data);
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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