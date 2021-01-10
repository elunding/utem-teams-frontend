import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
    }
});

const getAuthToken = () => localStorage.getItem('token');

const authTokenInterceptor = (config) => {
    config.headers['Authorization'] = 'Bearer ' + getAuthToken();

    return config;
}

httpClient.interceptors.request.use(authTokenInterceptor);

/*httpClient.interceptors.response.use(undefined, function(e) {
    return new Promise(function (resolve, reject) {
        if (e.status === 401 && e.config && !e.config.__isRetryRequest) {
            this.$router.push('/login');
        }
        throw e;
    });
});*/

export default httpClient;
