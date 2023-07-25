import axios from 'axios'

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '507eef3d4d99489da29b6ada4e088317',
        language: 'es-Es'
    }
})

export default movieDB;
