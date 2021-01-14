import decode from 'jwt-decode'
import axios from 'axios'

const API_AUTH_ENDPOINT = 'token/';
const API_VERIFY_ENDPOINT = 'users/verify-email';
const API_SIGN_UP_ENDPOINT = 'users/signup/';

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

    async signup(email, password) {
        console.log("email: ", email);
        console.log("password: ", password);
        console.log("making request to: ", process.env.VUE_APP_BASE_URL + API_SIGN_UP_ENDPOINT);
        const response = await axios.post(process.env.VUE_APP_BASE_URL + API_SIGN_UP_ENDPOINT, {
            email: email,
            password: password
        }).then(

        );
        console.log("response: ", response);
        if (response.status === 200 && response.data.access !== undefined) {
            console.log("success registering user!")
        }
    }

    async verifyAccount(accessToken) {
        console.log("making request to validate new account...")
        console.log("making request to: ", process.env.VUE_APP_BASE_URL + API_VERIFY_ENDPOINT);
        const response = await axios.get(process.env.VUE_APP_BASE_URL + API_VERIFY_ENDPOINT, { params: { token: accessToken } })

        console.log("response: ", response)
        if (response.status === 200) {
            console.log("verification successfull!")
        }
    }

    logout() {
        axios.defaults.headers.common['Authorization'] = ''
        localStorage.removeItem('token');
    }

    isLoggedIn() {
        const authToken = this.getAuthToken()

        console.log("token: ", authToken)

        console.log("bool(authToken: ", !!authToken)
        
        if (authToken) {
            return !this.isTokenExpired(authToken)
        }

        return false
    }

    getAuthToken() {
        return localStorage.getItem('token')
    }

    getTokenExpirationDate(encodedToken) {
        const decodedToken = decode(encodedToken)

        if (!decodedToken.exp) {
            return null
        }

        let date = new Date(0)
        date.setUTCSeconds(decodedToken.exp)

        return date
    }

    isTokenExpired(authToken) {
        // const token = this.getAuthToken()
        const expirationDate = this.getTokenExpirationDate(authToken)
        
        console.log("token: ", authToken)
        console.log("expiration date: ", expirationDate)

        return expirationDate < new Date()
    }

}

export default new UserAuthService();
