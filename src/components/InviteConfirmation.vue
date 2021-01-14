<template>
<div>
  <b-jumbotron v-if="!success">
    <template #lead>
      <!--<b-icon icon="exclamation-circle-fill" variant="info">
      </b-icon>-->
      <strong>{{ invitation.sender }}</strong> te ha invitado a: <br><br>
      <!--<p class="h4 mb-2"><b-icon icon="exclamation-circle-fill" variant="info"></b-icon> <strong>{{ invitation.sender }}</strong> te ha invitado a: <br><br></p> -->
       
      <h3>{{ invitation.project.name }}</h3>
    </template>

    <hr class="my-4">

    <!--<p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p>-->

    <b-button variant="success" @click="confirmProjectInvitation(true)">Confirmar</b-button>

    <b-button class="reject-btn" variant="danger" @click="confirmProjectInvitation(false)">Rechazar</b-button>
  </b-jumbotron>
  <b-jumbotron v-else>
      <template #lead>
      Has confirmado tu participación satisfactoriamente en el proyecto: 
      <strong></strong> <br><br>
      <!--<p class="h4 mb-2"><b-icon icon="exclamation-circle-fill" variant="info"></b-icon> <strong>{{ invitation.sender }}</strong> te ha invitado a: <br><br></p> -->
      <h3>{{ invitation.project.name }}</h3>
    </template>
  </b-jumbotron>
</div>
</template>

<script>
    import { getInvitationDetails, confirmInvitation } from '../api/api.service.js'
    
    export default {
        name: 'InviteConfirmation',
        data() {
            return {
                success: false,
                invitation: {
                    sender: "",
                    invitee: "",
                    status: "",
                    created_at: "",
                    project: {}
                }
            }
        },
        methods: {
            fetchInvitationDetails() {
                const invitationId = this.$route.query.invitation
                getInvitationDetails(invitationId)
                .then(response => {
                    this.invitation.sender = response.data.sender.full_name,
                    this.invitation.invitee = response.data.invitee.full_name,
                    this.invitation.status = response.data.status,
                    this.invitation.created_at = response.data.created_at,
                    this.invitation.project = response.data.project
                    console.log("response: ")
                    console.log(response)
                    console.log(response.data.sender.full_name)
                }).catch(e => {
                    console.log(e);
                });
            },
            confirmProjectInvitation(confirmationStatus) {
                const invitationId = this.$route.query.invitation
                const data = {
                    confirm: confirmationStatus,
                }
                confirmInvitation(invitationId, data)
                .then(response => {
                    console.log("resp: ", response)
                    console.log("success!")
                    this.success = true
                    setTimeout( () => this.$router.push('/'), 7000);

                }).catch(e => {
                    console.log(e);
                });
            }
        },
        created() {
            if (localStorage.token === undefined) {
                this.$router.push('/login');
            }
            console.log("created!")
            console.log("calling fetchInvitationDetails...")
            this.fetchInvitationDetails()
        }
    };
</script>

<style scoped>

    .reject-btn {
        margin-left: 10px;
    }

</style>