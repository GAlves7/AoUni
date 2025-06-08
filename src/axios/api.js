import axios from 'axios'

const local = 'http://192.168.1.6:8080/'
const emulador = 'http://10.0.2.2:8080/'

const api = axios.create({
    baseURL: emulador
})

export default api