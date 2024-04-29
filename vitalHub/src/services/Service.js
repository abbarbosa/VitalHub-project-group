import axios from 'axios';

// declarar a porta da api

const portaApi = '4466';

//declarar o ip da maquina

<<<<<<< HEAD
const ip = '192.168.19.136'

=======
const ip = '172.16.39.98';
>>>>>>> b7fd4de8fa4fe851da5300da6cc7366ef92155d9

//definir a base da url de acesso da api

const apiUrlLocal = `http://${ip}:${portaApi}/api`;

// configuracao do axios

export const api = axios.create({
	baseURL: apiUrlLocal,
});
