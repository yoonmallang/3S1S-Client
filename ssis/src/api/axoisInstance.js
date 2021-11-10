import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-3-34-73-102.ap-northeast-2.compute.amazonaws.com',
    timeout: 3000,
    headers: {"Content-type": "application/json"}
});

instance.interceptors.request.use(
    function(config) {
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    function(res) {
        return res;
    },
    function(err) {
        return Promise.reject(err);
    }
);

export default instance;