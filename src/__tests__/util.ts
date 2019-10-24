import { createBrowserHistory } from 'history'
import { AnyAction } from 'redux'
import { createNextState } from 'redux-starter-kit'
import reducerWithComputedValues, { IState } from '../reducers'
import { defaultState as defaultTasks } from '../reducers/tasks.reducer'

export const history = createBrowserHistory()

export const defaultState = {
  router: {
    action: 'POP',
    location: {
      hash: '',
      pathname: '/',
      search: '',
      state: undefined,
    },
  },
  task: defaultTasks,
}

/**
 * Utility created for test reducers
 *
 * @param {AnyAction}  action       Action to modify the state
 * @param {Function}   prevStateFn  State before to dispatch the action
 * @param {Function}   nextStateFn  State after to dispatch the action
 */
export const testReducer = (
  action: AnyAction,
  prevStateFn: (s: IState) => void,
  nextStateFn: (s: IState) => void,
) => {
  const prevState = createNextState(defaultState, prevStateFn)
  const nextState = createNextState(defaultState, nextStateFn)
  const resultState = reducerWithComputedValues(history)(prevState, action)

  expect(resultState).toEqual(nextState)
}
