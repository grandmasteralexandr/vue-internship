import {createModule, mutation} from 'vuex-class-component';
import {Status, TaskInterface} from '@/types/TaskInterface'

const VuexModule = createModule({
  namespaced: "task",
  strict: true,
});

export class TaskStore extends VuexModule {
  private tasks: TaskInterface[] = [
    {
      id: 0,
      name: 'Learn Vue Cli',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut cumque, cupiditate dignissimos dolor eum laborum maiores numquam odit perferendis provident ratione repudiandae tempora tenetur voluptatum! Accusantium dolores illum rem.',
      status: Status.ToDo,
      dueDate: 1579996800000,
      createdDate: 1579996800000
    },

    {
      id: 1,
      name: 'Some task',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut cumque, cupiditate dignissimos dolor eum laborum maiores numquam odit perferendis provident ratione repudiandae tempora tenetur voluptatum! Accusantium dolores illum rem.',
      status: Status.InProgress,
      dueDate: 1590969600000,
      createdDate: 1580601600000
    },
  ];

  @mutation addTask(task: TaskInterface): void {
    let copiedArray: TaskInterface[] = this.tasks.slice();
    copiedArray.push(task);
    this.tasks = copiedArray;
  }

  @mutation editTask(task: TaskInterface): void {
    let copiedArray: TaskInterface[] = this.tasks.slice();
    let index: number = -1;

    // find task index in array
    for (let i = 0; i < copiedArray.length; i++) {
      if (task.id == copiedArray[i].id) {
        index = i;
        break;
      }
    }

    copiedArray.splice(index, 1, task);
    this.tasks = copiedArray;
  }

  @mutation deleteTask(task: TaskInterface): void {
    let copiedArray: TaskInterface[] = this.tasks.slice();
    const index: number = copiedArray.indexOf(task, 0);
    copiedArray.splice(index, 1);
    this.tasks = copiedArray;
  }
}
