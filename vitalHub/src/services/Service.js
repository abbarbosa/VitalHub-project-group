import axios from 'axios'

// declarar a porta da api

const portaApi = '4466'

//declarar o ip da maquina

const ip = '172.16.39.98'

//definir a base da url de acesso da api

const apiUrlLocal = `http://${ip}:${portaApi}/api`

// configuracao do axios

export const api = axios.create({
    baseURL: apiUrlLocal
});

