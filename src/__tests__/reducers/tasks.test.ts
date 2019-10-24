import {
  FinishCancelTask,
  FinishCreateTask,
  FinishDoneTask,
  FinishInitialLoad,
  SelectOptionFilter,
  WriteFilter,
} from '../../actions'
import { Types } from '../../domain/models'
import { testReducer } from '../util'
import tasks from './../jsons/tasks.json'

describe('Reducers test', () => {
  it('Finish the load of the tasks information', () => {
    testReducer(
      FinishInitialLoad(tasks),
      s => undefined,
      s => {
        s.task.tasks = tasks
        s.task.filterTasks = tasks
      },
    )
  })

  it('Write a description and filter the tasks', () => {
    const text = 'First task'

    testReducer(
      WriteFilter(text),
      s => {
        s.task.tasks = tasks
      },
      s => {
        s.task.tasks = tasks
        s.task.writedText = text
        s.task.filterTasks = [tasks[0]]
      },
    )
  })

  it('Select a tyoe and filter the tasks', () => {
    testReducer(
      SelectOptionFilter(Types.TODO),
      s => {
        s.task.tasks = tasks
      },
      s => {
        s.task.tasks = tasks
        s.task.filterTasks = [tasks[4]]
        s.task.selectedOption = Types.TODO
      },
    )
  })

  const updateTaskTest = (action, testTask) =>
    testReducer(
      FinishCancelTask(testTask),
      s => {
        s.task.tasks = tasks
        s.task.filterTasks = tasks
      },
      s => {
        const resultTasks = [...tasks]
        resultTasks[4] = testTask
        s.task.tasks = resultTasks
        s.task.filterTasks = resultTasks
      },
    )

  it('Check a task as done', () => {
    const testTask = { ...tasks[4] }
    testTask.type = Types.DONE

    updateTaskTest(FinishDoneTask(testTask), testTask)
  })

  it('Check a task as deleted', () => {
    const testTask = { ...tasks[4] }
    testTask.type = Types.DELETE

    updateTaskTest(FinishCancelTask(testTask), testTask)
  })

  it('Finish the creation of the new task', () => {
    const newTask = {
      index: 5,
      type: 'ToDo',
      description: 'New Task',
    }

    testReducer(
      FinishCreateTask(newTask),
      s => {
        s.task.tasks = tasks
        s.task.filterTasks = tasks
      },
      s => {
        s.task.tasks = [...tasks, newTask]
        s.task.filterTasks = [...tasks, newTask]
      },
    )
  })
})
