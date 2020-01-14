export enum Status {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done"
}

export interface TaskInterface {
  name: string;
  description: string;
  status: Status;
  planedCompletionDate: string;
}
