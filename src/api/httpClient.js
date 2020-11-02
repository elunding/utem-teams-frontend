import axios from 'axios';

const httpClient = axios.create({
    baseUrl: process.env.VUE_APP_BASE_URL,
    timeout: 1000,
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

export default httpClient;
