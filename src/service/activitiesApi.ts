import api from './api'

const getActivities = () => api.get('/activities');

export {
  getActivities
}
