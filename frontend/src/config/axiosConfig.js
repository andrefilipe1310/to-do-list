import axios from 'axios'

const api = axios.create({
    baseURL: process.env.URL || 'http://localhost:8080',
   // timeout: 1000,
   // headers: {'X-Custom-Header': 'foobar'}
  });


export default api