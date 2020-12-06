<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames">{{ name }}</li>
      </ul>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { getProjectDetails } from "../api/projects.api.js";

export default {
  name: "list-project",
  data() {
    return {
      projectDetails: {},
    };
  },
  methods: {
    retrieveProjectDetails(projectId) {
      console.log("calling getProjects...")
      getProjectDetails(projectId)
        .then(response => {
          this.projectDetails = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  
};
</script>

<style scoped>
  
</style>