<template>
  <div class="col-md-12">
    <h3> Proyectos </h3>
    <br/>
    <div class="button-area">
      <b-button v-b-modal="`add-project-modal-${0}`" variant="primary">
        <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Crear Proyecto
      </b-button>
      <ProjectModal
        compId="add-project-modal"
        :projectId=0
        v-if="userList" :userList=userList
        @reloadData="handleReload($event, 'push')"
      />
      <b-dropdown :text="dropdownText" class="proj-fil-dpdown">
        <b-dropdown-item @click="dropdownText = 'Todos'">Todos</b-dropdown-item>
        <b-dropdown-item @click="dropdownText = 'Activos'">Activos</b-dropdown-item>
        <b-dropdown-item @click="dropdownText = 'Terminados'">Finalizados</b-dropdown-item>
      </b-dropdown>
    </div>
    <br/>
    <div class="my-grid">
      <div class="jumbotron" v-if="!projects || !projects.length">  
        <h3 class="display-6">No hay proyectos existentes</h3>
      </div>
      <!--<b-card-group v-else v-for="(project, index) in projects" :key="index" v-bind="slicedProjects">-->
      <b-card-group v-else v-for="(project, index) in slicedProjects" :key="index">
          <b-card 
            class="proj-card"
            :title="project.name"
            style="max-width: 23rem; margin-bottom: 20px;"
          >
            <b-card-text class="proj-description">
              {{ project.description }}
            </b-card-text>
            <div class="options-cont">
              <!--<b-button class="details-btn" id="proj-details-btn" variant="primary">Ver detalles</b-button>-->
              <b-button v-b-modal="`edit-project-modal-${project.id}`" size="sm" class="edit-btn" variant="primary">
                <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Editar
              </b-button>
              <!--<ProjectModal compId="edit-project-modal" :projectId="project.id" v-if="userList" :userList=userList mode="patch" :projObj=project title="Detalles Proyecto" buttonTitle="Guardar Cambios" :preselectedMembers=project.project_members  v-on:reloadData="handleReload"/>-->
              <ProjectModal
                compId="edit-project-modal"
                :projectId="project.id"
                v-if="userList" :userList=userList
                mode="patch"
                :projObj=project
                title="Detalles Proyecto"
                buttonTitle="Guardar Cambios"
                @reloadData="handleReload($event, 'update')"
              />
              <b-button v-if="project.is_owned_by_user && project.tasks.length" v-b-modal="`delete-project-modal-${project.id}`" class="delete-btn" size="sm" variant="warning">
                <b-icon icon="check2-circle" aria-hidden="true"></b-icon> Finalizar
              </b-button>
              <ProjectModal
                compId="delete-project-modal"
                :projectId="project.id"
                mode="delete"
                :projObj=project
                title="Finalizar Proyecto"
                buttonTitle="Finalizar"
                @reloadData="handleReload($event, 'delete')"
              />
              <!--<a v-bind:href="`/projects/${project.id}/tasks`" :projectName="project.name" class="btn btn-secondary btn tasks-btn btn-sm" role="button">
                <b-icon icon="list-task" aria-hidden="true"></b-icon> Ver Tareas
              </a>-->
              <b-link
                :to="{ path: `/projects/${project.id}/tasks`, params: {projectName: project.name} }"
                class="btn btn-secondary btn tasks-btn btn-sm" role="button"
              >
                <b-icon icon="list-task" aria-hidden="true"></b-icon> Ver Tareas
              </b-link>
            </div> 
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-3">
        <b-pagination
          v-model="currentPage"
          :per-page="perPage"
          pills
          :total-rows="projectsAmount"
          align="center"
        >
        </b-pagination>
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
  props: {
    dropdownText: {
      type: String,
      default: 'Todos'
    },
  },
  data() {
    return {
      perPage: 4,
      currentPage: 1,
      projects: [],
      userList: [],
      projectsAmount: 0,
    }
  },
  computed: {
    /*rows() {
      return this.projects.length
    },*/
    slicedProjects() {
      let items = [];
      if (this.dropdownText === 'Todos') {
        items = this.projects || []
      } else if (this.dropdownText === 'Activos') {
        items = this.projects.filter(proj => proj['is_active'] === true) || []
        // items = this.projects || []
      } else if (this.dropdownText === 'Finalizados')
        items = this.projects.filter(proj => proj['is_active'] === false) || []
        // items = this.projects || []
      return items.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    },
  },
  methods: {
    handleReload(project, mode) {
      console.log("on handleReload...")
      // this.retrieveTasks()
      if (mode === 'push') {
        this.projects.push(project)
      } else if (mode === 'update') {
        const index = this.projects.indexOf(project)
        console.log("index: ", index)
        console.log("splicing...")
        console.log("project: ", project)
        console.log("projects: ", this.projects)
        this.projects.splice(index, 1, project)
      } else if (mode === 'delete') {
        const index = this.projects.indexOf(project)
        this.projects.splice(index, 1)
      }
    },
    getProjectsAmount() {
      this.projectsAmount = this.projects.length
    },
    retrieveProjects() {
      getProjects()
        .then(response => {
          this.projects = response.data.data;
          this.projectsAmount = this.projects.length;
          console.log(response.data);
          console.log("projects length: ", this.projects.length)
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
      // this.getProjectsAmount()
      console.log("calling retrieveUserList...")
      this.retrieveUserList()
      console.log("PROJECTS AMOUNT: ", this.projectsAmount)
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

  .options-cont {
    display: flex;
  }

  .my-grid {
    display: grid;
    /*justify-items: center;*/
    /* 280px is the minimum a column can get, you might need to adjust it based on your needs. */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 1.5rem;
  }

  .proj-fil-dpdown {
    float: right;
  }

  /*.my-grid > * {
    width: 100%;
    max-width: 20rem;
  }*/

</style>