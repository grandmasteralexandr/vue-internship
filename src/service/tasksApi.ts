import api from './api'
import {TaskInterface} from '@/types/TaskInterface';

const entryName: string = '/task/';

const getTasks = () => api.get('/tasks');

const addTask = (data: TaskInterface) =>  api.post(entryName + 'create', data);

const editTask = (data: TaskInterface) =>  api.put(entryName + data.id + '/edit', data);

const deleteTask = (id: number) =>  api.delete(entryName + id + '/delete');

export {
  getTasks,
  addTask,
  editTask,
  deleteTask
}
