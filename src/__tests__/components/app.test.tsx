import { mount, shallow } from 'enzyme'
import React from 'react'
import { Router } from 'react-router'
import App, { ListOptions, RowTask } from '../../components/'
import tasks from './../jsons/tasks.json'
import { history } from './../util'

describe('Components tests', () => {
  it('should render App page component', () => {
    const component = mount(
      <Router history={history}>
        <App tasks={tasks} />
      </Router>,
    )
    expect(component).toMatchSnapshot()
  })

  it('should render ListOptions component', () => {
    const component = shallow(<ListOptions type={tasks[0].type} />)
    expect(component).toMatchSnapshot()
  })

  it('should render RowTask component', () => {
    const component = shallow(<RowTask task={tasks[0]} />)
    expect(component).toMatchSnapshot()
  })
})
