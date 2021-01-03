<template>
  <div class="col-md-12">
    <h3> Proyectos </h3>
    <br/>
    <div class="button-area">
      <b-button v-b-modal="`add-project-modal-${0}`" variant="primary">
        <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Crear Proyecto
      </b-button>
      <ProjectModal compId="add-project-modal" :projectId=0 v-if="userList" :userList=userList v-on:reloadData="handleReload" />
    </div>
    <br/>
    <div class="my-grid">
      <div class="jumbotron" v-if="!projects || !projects.length">  
        <h3 class="display-6">No hay proyectos existentes</h3>
      </div>
      <b-card-group v-else v-for="(project, index) in projects" :key="index">
          <b-card 
            class="proj-card"
            :title="project.name"
            style="max-width: 23rem; margin-bottom: 20px;"
          >
            <b-card-text class="proj-description">
              {{ project.description }}
            </b-card-text>
            <!--<b-button class="details-btn" id="proj-details-btn" variant="primary">Ver detalles</b-button>-->
            <b-button v-b-modal="`edit-project-modal-${project.id}`" size="sm" class="edit-btn" variant="primary">
              <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Editar
            </b-button>
            <ProjectModal compId="edit-project-modal" :projectId="project.id" v-if="userList" :userList=userList mode="patch" :projObj=project title="Detalles Proyecto" buttonTitle="Guardar Cambios" :preselectedMembers=project.project_members  v-on:reloadData="handleReload"/>
            <b-button v-b-modal="`delete-project-modal-${project.id}`" class="delete-btn" size="sm" variant="danger">
              <b-icon icon="trash" aria-hidden="true"></b-icon> Eliminar
            </b-button>
            <ProjectModal compId="delete-project-modal" :projectId="project.id" mode="delete" :projObj=project title="Eliminar Proyecto" buttonTitle="Eliminar" v-on:reloadData="handleReload"/>
            <a v-bind:href="`/projects/${project.id}/tasks`" class="btn btn-primary btn tasks-btn btn-sm" role="button">Ver Tareas</a>
          </b-card>
        </b-card-group>
      </div>
  </div>
</template>

<script>
import { getProjects, getUserList } from "../api/api.service.js";
import ProjectModal from "./ProjectModal"

export default {
  name: "list-project",
  components: {
    ProjectModal
  },
  data() {
    return {
      projects: [],
      userList: []
    }
  },
  methods: {
    handleReload() {
      this.retrieveProjects()
    },
    retrieveProjects() {
      getProjects()
        .then(response => {
          this.projects = response.data.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveUserList() {
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
    }
  },
  mounted() {
      console.log("mounted!")
      console.log("calling retrieveProjects...")
      this.retrieveProjects()
      console.log("calling retrieveUserList...")
      this.retrieveUserList()
    }
};
</script>

<style scoped>
  .tasks-btn {
    float: right;
  }

  .proj-description {
    margin-bottom: 40px;
  }

  /*.my-grid {
    display: grid;*/
    /*justify-items: center;*/
    /* 280px is the minimum a column can get, you might need to adjust it based on your needs. */
    /*grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 1.5rem;
  }*/

  /*.my-grid > * {
    width: 100%;
    max-width: 20rem;
  }*/

</style>