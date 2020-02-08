import axios from 'axios'

const baseUrl: string = 'https://vue-internship.getsandbox.com';

export default axios.create({
  baseURL: baseUrl
});
