import { Reducer } from 'redux'
import { createReducer } from 'redux-starter-kit'
import {
  FinishCancelTask,
  FinishCreateTask,
  FinishDoneTask,
  FinishInitialLoad,
  SelectOptionFilter,
  WriteFilter,
} from '../actions'
import { ITask } from '../domain/models'

export interface IState {
  tasks: ITask[]
  writedText: string
  filterTasks: ITask[]
  selectedOption: string
}

export const defaultState: IState = {
  tasks: [],
  writedText: '',
  filterTasks: [],
  selectedOption: '',
}

/**
 * Filter the tasks for description
 * 
 * @param {IState} state           application state
 * @param {String} action.payload  text to filter
 */
const applyTextFilter = (state: IState, { payload }) => {
  state.writedText = payload
  state.filterTasks = state.tasks.filter(item =>
    item.description.toLocaleLowerCase().includes(payload.toLocaleLowerCase()),
  )
}

/**
 * Filter the tasks for type
 * 
 * @param {IState} state           application state
 * @param {String} action.payload  type to filter
 */
const applyOptionFilter = (state: IState, { payload }) => {
  state.selectedOption = payload
  state.filterTasks = state.tasks.filter(item =>
    item.type.toLocaleLowerCase().includes(payload.toLocaleLowerCase()),
  )
}

/**
 * Apply the last description and type filter
 * 
 * @param {IState} state  application state
 */
const applyFilters = (state: IState) => {
  const option = state.selectedOption
  const text = state.writedText
  state.filterTasks = state.tasks
  text && applyTextFilter(state, { payload: text })
  option && applyOptionFilter(state, { payload: option })
}

/**
 * Update the task information
 * 
 * @param {IState} state  application state
 * @param {ITask}  action.payload  task to update
 */
const updateTask = (state: IState, { payload }) => {
  state.tasks[payload.index] = payload
  applyFilters(state)
}

/**
 * Set the information of all the tasks
 * 
 * @param {IState}   state           application state
 * @param {ITask[]}  action.payload  task to save in the state
 */
const setTasks = (state: IState, { payload }) => {
  state.tasks = payload
  // If exist a option preselected we made the filter
  applyFilters(state)
}

/**
 * Add a new task to the state
 * 
 * @param {IState}  state           application state
 * @param {ITask}   action.payload  new task to add
 */
const addTask = (state: IState, { payload }) => {
  state.tasks.push(payload)
  applyFilters(state)
}

export const task: Reducer<IState> = createReducer(defaultState, {
  [FinishCreateTask]: addTask,
  [FinishDoneTask]: updateTask,
  [FinishInitialLoad]: setTasks,
  [FinishCancelTask]: updateTask,
  [WriteFilter]: applyTextFilter,
  [SelectOptionFilter]: applyOptionFilter,
})
