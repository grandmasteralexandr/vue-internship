import axios from 'axios'
// @ts-ignore
import router from '@/router'

const baseUrl: string = 'https://vue-internship.getsandbox.com';

let api = axios.create({
  baseURL: baseUrl
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // @ts-ignore
  router.push({name: 'InternalServerError500'}).catch(err => {console.log(err.message)})
});

export default api
