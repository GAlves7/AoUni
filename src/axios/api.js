// Importa a biblioteca Axios, utilizada para fazer requisições HTTP
import axios from 'axios'

// URL do backend para uso em dispositivo físico na mesma rede local
const local = 'http://192.168.1.6:8080/'

// URL do backend para uso com emulador Android (10.0.2.2 aponta para o localhost do computador)
const emulador = 'http://10.0.2.2:8080/'

// Cria uma instância do Axios com a URL base configurada para o emulador
const api = axios.create({
    baseURL: local
})

// Exporta a instância da API para uso em outras partes do projeto
export default api