<template>
    <div class="row justify-content-center mt-5">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="vue-template">
                        <div class="success-case" v-if="success === true">
                            <h4> Cuenta verificada satisfactoriamente! </h4>

                            <b-button variant="primary" to="/login"> Iniciar Sesión
                                
                            </b-button>
                        </div>
                        
                        <div class="error-case" v-else>
                            <h4> Ha ocurrido un error al momento de verificar su cuenta </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserAuthService from '../api/authentication.service'
    
    export default {
        name: 'verify',
        data() {
            return {
                success: false,
            }
        },
        methods: {
            async verifyUser() {
                try {
                    const token = this.$route.query.token
                    console.log("token: ", token)
                    await UserAuthService.verifyAccount(token)
                    this.success = true;
                } catch (error) {
                    console.log("an error has occurred: ", error)
                    this.success = false;
                }
            }
        },
        mounted() {
            console.log("mounted!")
            console.log("calling verifyUser...")
            this.verifyUser()
        }
    };
</script>

<style scoped>

</style>