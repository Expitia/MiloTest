import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import {
  CancelTask,
  CreateTask,
  DoneTask,
  SelectOptionFilter,
  WriteFilter,
} from '../actions'
import App, { IProps } from '../components'
import { IState } from '../reducers'

/**
 * Provide the store as props for the component
 * @param state application state
 */
function mapStateToProps(state: IState): IProps {
  return {
    tasks: state.task.filterTasks,
  }
}

/**
 * Provide functions as props for the component
 * @param dispatch action disparcher
 */
function mapDispatchToProps(dispatch): Partial<IProps> {
  return bindActionCreators(
    {
      onDone: DoneTask,
      onCancel: CancelTask,
      onCreate: CreateTask,
      onFilterText: WriteFilter,
      onFilterOption: SelectOptionFilter,
    },
    dispatch,
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
)
