import { connectRouter, RouterState } from 'connected-react-router'
import { AnyAction, combineReducers, Reducer } from 'redux'
import { IState as ITaskState, task } from './tasks.reducer'

export interface IState {
  task: ITaskState
  router: RouterState
}

const createRootReducer = (history: History): Reducer<IState, AnyAction> =>
  combineReducers({
    task,
    router: connectRouter(history),
  })

export default createRootReducer
