import { Action } from 'redux'
import { createAction } from 'redux-starter-kit'
import { ITask } from '../domain/models'

export const Initializing: ActionCreator<{}> = createAction('Initializing...')

export const FinishInitialLoad: ActionCreator<ITask[]> = createAction(
  'FInish the load of the initial information',
)

export const WriteFilter: ActionCreator<string> = createAction(
  'The user write a description to filter',
)

export const SelectOptionFilter: ActionCreator<string> = createAction(
  'The user select a type to filter',
)

export const DoneTask: ActionCreator<ITask> = createAction(
  'The user make click in the done option',
)

export const CancelTask: ActionCreator<ITask> = createAction(
  'The user make click in the delete option',
)

export const CreateTask: ActionCreator<string> = createAction(
  'The user create a new task',
)

export const FinishDoneTask: ActionCreator<ITask> = createAction(
  'The task has been changed to done',
)

export const FinishCancelTask: ActionCreator<ITask> = createAction(
  'The task has been changed to deleted',
)

export const FinishCreateTask: ActionCreator<ITask> = createAction(
  'The task has been created',
)

export type ActionCreator<P> = string &
  ((payload: P | Error) => Action<string> & { payload: P })
