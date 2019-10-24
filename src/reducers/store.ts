import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import createRootReducer, { IState } from './'
import sagas from './../sagas/index'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

export const NewStore = (initialState?) => {
  const middleWare = composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
  )
  const store = createStore(
    createRootReducer(history),
    initialState,
    middleWare,
  ) as Store<IState>

  sagaMiddleware.run(sagas)

  return store
}

export type StoreType = ReturnType<typeof NewStore>
