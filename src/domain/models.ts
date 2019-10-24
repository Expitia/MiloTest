export interface ITask {
  index: number
  type: string
  description: string
}

export enum Types {
  TODO = 'ToDo',
  DONE = 'Done',
  DELETE = 'Delete',
}
