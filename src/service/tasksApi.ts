import api from './api'

const entryName: string = '/task/';

const getTasks = () => api.get('/tasks');

const addTask = (data: Object) =>  api.post(entryName + 'create', data);

const editTask = (id: number, data: Object) =>  api.put(entryName + id + '/edit', data);

const deleteTask = (id: number, data: Object) =>  api.delete(entryName + id + '/delete', data);

export {
  getTasks,
  addTask,
  editTask,
  deleteTask
}
