import {createModule, mutation, action} from 'vuex-class-component';
import {TaskInterface} from '@/types/TaskInterface';
import {
  getTasks,
  addTask,
  editTask,
  deleteTask
} from "@/service/tasksApi";
import {AxiosResponse} from "axios";

const VuexModule = createModule({
  namespaced: "task",
  strict: true,
});

export class TaskStore extends VuexModule {
  private tasks: TaskInterface[] = [];

  // cal mutation in action don't work see issue https://github.com/michaelolof/vuex-class-component/issues/58
  @action async getTasksAction() {
    try {
      const response: AxiosResponse = await getTasks();
      return response.data;
    } catch (e) {
      console.log(e.message);
    }
  }

  @action async addTaskAction(task: TaskInterface) {
    try {
      await addTask(task);
      const response: AxiosResponse = await getTasks();
      return response.data;
    } catch (e) {
      console.log(e.message);
    }
  }

  @action async editTaskAction(task: TaskInterface) {
    try {
      await editTask(task);
      const response: AxiosResponse = await getTasks();
      return response.data;
    } catch (e) {
      console.log(e.message);
    }
  }

  @action async deleteTaskAction(task: TaskInterface) {
    try {
      await deleteTask(task.id);
      const response: AxiosResponse = await getTasks();
      return response.data;
    } catch (e) {
      console.log(e.message);
    }
  }

  @mutation getTasksMutation(tasks: TaskInterface[]) {
    this.tasks = tasks;
  }
}
