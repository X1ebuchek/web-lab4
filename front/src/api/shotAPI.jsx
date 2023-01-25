import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:27301/shotApi/'
});

const shotAPI = {
    async getEntries(token) {
        return await axiosInstance.get('shots', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },

    async sendShot(x, y, r, token) {
        return axiosInstance.post('shot', { x, y, r }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },

    async getCount(token) {
        return await axiosInstance.get('count', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
}

export default shotAPI;