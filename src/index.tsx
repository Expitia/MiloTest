import 'antd/dist/antd.css'
import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Initializing } from './actions/'
import App from './containers/'
import { history, NewStore, StoreType } from './reducers/store'
import './styles/index.scss'

const store: StoreType = NewStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/:type">
          <App />
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)

store.dispatch(Initializing({}))
