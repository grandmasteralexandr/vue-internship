import {TaskInterface} from './TaskInterface'

export interface CalendarDayInterface {
  dayOfMonth: number | null;
  tasks: TaskInterface[];
}
