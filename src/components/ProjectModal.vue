<template>
 <b-modal 
    :id="`${compId}-${projectId}`"
    ref="modal"
    :title="title"
    :ok-title="buttonTitle"
    ok-only
    @ok="handleOk"
  >
   
    <form ref="form" @submit.stop.prevent="handleSubmit" v-if="mode !== 'delete'">
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
    </form>
    <h5 v-else> ¿Estás seguro de eliminar {{ projObj.name }}? </h5>
  </b-modal>
</template>

<script>
import { createProject } from "../api/api.service.js";
import Multiselect from 'vue-multiselect';

export default {
  name: "ProjectModal",
  props: {
    title: {
      type: String,
      required: false,
      default: 'Crear Proyecto'
    },
    compId: {
      type: String,
      required: true
    },
    buttonTitle: {
      type: String,
      required: false,
      default: 'Crear Proyecto'
    },
    projectId: {
      type: Number,
      required: true
    },
    userList: {
      type: Array,
      required: false
    },
    projObj: {
      type: Object,
      required: false
    },
    mode: {
      type: String,
      required: false,
      default: 'post'
    },
    preselectedMembers: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      project: {
        id: null,
        name: "",
        description: "",
        members: []
      },
      value: [...this.preselectedMembers],
      formValidity: null,
      submitted: false
    };
  },
  components: { Multiselect },
  mounted() {
    if (this.mode === 'patch') {
      this.project = {...this.projObj}
      // this.value = this.project.project_members
      console.log("projObj: ", this.projObj)
      console.log("value: ", this.value)
      /*this.selected = this.taskObj.assignee.full_name
      console.log("full_name: ", this.taskObj.assignee.full_name)
      console.log("this.selected: ", this.selected)*/
    }
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
        this.saveProject()
      } else if (this.mode === 'patch') {
        console.log("in else if...")
        this.updateProject(this.projectId)
      }
      
    },
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
    updateProject() {
      
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