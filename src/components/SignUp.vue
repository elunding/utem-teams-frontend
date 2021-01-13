<template>
    <div class="row justify-content-center mt-5">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="vue-template">
                        <form action @submit.prevent="signup">
                            <h3>Bienvenido!</h3>
                            <br>
                            <h5>Ingresa tus datos para crear tu cuenta</h5>
                            <br>
                            <div class="form-group">
                                <label>Email</label>
                                <input v-model="email" type="email" class="form-control form-control-lg" />
                            </div>

                            <div class="form-group">
                                <label>Contraseña</label>
                                <input v-model="password" type="password" class="form-control form-control-lg" />
                            </div>

                            <div class="form-group">
                                <label>Confirmar contraseña</label>
                                <input v-model="confirmPassword" type="password" class="form-control form-control-lg" />
                            </div>

                            <button type="submit" class="btn btn-dark btn-lg btn-block" value="Signup">Crear cuenta</button>

                            <p v-if="error" class="error"> Ya existe una cuenta de usuario con ese email </p>
                            <p v-if="passwordError" class="error"> Contraseñas no coinciden </p>
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
        name: 'SignUp',
        data() {
            return {
                email: "",
                password: "",
                confirmPassword: "",
                error: false,
                passwordError: false,
            }
        },
        methods: {
            async signup() {
                this.validatePasswords()

                if (!this.passwordError) {
                    try {
                        console.log("calling UserAuthService with " + this.email + " and " + this.password);
                        await UserAuthService.signup(this.email, this.password);
                        this.$router.push('/wait-confirm');
                    } catch (error) {
                        console.log('error: ', error);
                        this.error = true;
                    }
                }
            },
            validatePasswords() {
                console.log("in validatePasswords...")
                if (this.password !== this.confirmPassword) {
                    this.passwordError = true;
                } else {
                    this.passwordError = false;
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