import axios from 'axios'

const callcenterApi = axios.create({
    baseURL: 'https://mdymitras.wimprove.com/',
})

export default callcenterApi;