import axios from 'axios'

const justwatchApi = axios.create({
    baseURL: 'https://apis.justwatch.com',
})

export default justwatchApi;