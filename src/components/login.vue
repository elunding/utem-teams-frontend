<template>
    <div class="row justify-content-center mt-5">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="vue-template">
                        <form action @submit.prevent="login">
                            <h3>Bienvenido</h3>

                            <div class="form-group">
                                <label>Email</label>
                                <input v-model="email" type="email" class="form-control form-control-lg" />
                            </div>

                            <div class="form-group">
                                <label>Contraseña</label>
                                <input v-model="password" type="password" class="form-control form-control-lg" />
                            </div>

                            <button type="submit" class="btn btn-dark btn-lg btn-block" value="Login">Iniciar Sesión</button>

                            <p class="forgot-password text-right mt-2 mb-4">
                                <router-link to="/forgot-password">Olvidaste tu contraseña?</router-link>
                            </p>
                            <p v-if="error" class="error"> Contraseña o email erróneos </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserAuthService from '../api/authentication.service'

    export default {
        name: 'Login',
        data() {
            return {
                email: "",
                password: "",
                error: false
            }
        },
        methods: {
            async login() {
                try {
                    console.log("calling UserAuthService with " + this.email + " and " + this.password);
                    await UserAuthService.login(this.email, this.password);
                    this.$router.push('/');
                } catch (error) {
                    console.log('error: ', error);
                    this.error = true;
                }
            }
        }
    };
</script>

<style scoped>
    .error {
        color: #ff3f00;
    }


</style>