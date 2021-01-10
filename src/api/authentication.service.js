import axios from 'axios'

const API_AUTH_ENDPOINT = 'token/';

class UserAuthService {
    async login(email, password) {
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("making request to: ", process.env.VUE_APP_BASE_URL + API_AUTH_ENDPOINT);
        const response = await axios.post(process.env.VUE_APP_BASE_URL + API_AUTH_ENDPOINT, {
            email: email,
            password: password
        }).then(

        );
        console.log("response: ", response);
        if (response.status === 200 && response.data.access !== undefined) {
            localStorage.setItem('token', response.data.access);
        }
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export default new UserAuthService();
