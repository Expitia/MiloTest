import { eventChannel } from '@redux-saga/core'
import firebase from 'firebase'
import { all, put, select, take, takeEvery } from 'redux-saga/effects'
import { IState } from '../reducers'
import {
  CancelTask,
  CreateTask,
  DoneTask,
  FinishCancelTask,
  FinishCreateTask,
  FinishDoneTask,
  FinishInitialLoad,
  Initializing,
} from './../actions'
import { Types } from './../domain/models'

firebase.initializeApp({
  apiKey: 'AIzaSyBdmFBO1t1wc8LLLWl_J6DkghxDuj4GJ2w',
  authDomain: 'milotest-b2cf8.firebaseapp.com',
  databaseURL: 'https://milotest-b2cf8.firebaseio.com',
  projectId: 'milotest-b2cf8',
  storageBucket: 'milotest-b2cf8.appspot.com',
  messagingSenderId: '893450121936',
  appId: '1:893450121936:web:65ede429506d725644a4d5',
})

/**
 * Listen the action Initializing and load all the tasks information
 */
function* watchInitialize() {
  const request = firebase.database().ref('tasks')
  const channel = new (eventChannel as any)(emiter => {
    const listener = request.on('value', snapshot => {
      emiter({ data: snapshot.val() || [] })
    }) as any
    return () => {
      listener.off()
    }
  })
  const { data } = yield take(channel)
  yield put(FinishInitialLoad(data))
}

/**
 * Listen the action CancelTask and change the state to "Delete"
 *
 * @param {ITask}  action.payload  task information
 */
function* watchForCancelTask({ payload }) {
  const task = { ...payload, type: Types.DELETE }

  yield firebase
    .database()
    .ref('tasks')
    .child(payload.index)
    .set(task)
  yield put(FinishCancelTask(task))
}

/**
 * Listen the action DoneTask and change the state to "Done"
 *
 * @param {ITask}  action.payload  task information
 */
function* watchForDoneTask({ payload }) {
  const task = { ...payload, type: Types.DONE }
  yield firebase
    .database()
    .ref('tasks')
    .child(payload.index)
    .set(task)

  yield put(FinishDoneTask(task))
}

const getTasks = (state: IState) => state.task.tasks

/**
 * Listen the action CreateTask and create a new task type ToDo
 *
 * @param {String}  action.payload  decription for the new task
 */
function* watchForCreateTask({ payload }) {
  const tasks = yield select(getTasks)
  const nextIndex =
    tasks.length > 0 ? Math.max(...tasks.map(task => task.index)) + 1 : 0

  const newTask = {
    type: Types.TODO,
    index: nextIndex,
    description: payload,
  }

  yield firebase
    .database()
    .ref('tasks')
    .child(`${nextIndex}`)
    .set(newTask)

  yield put(FinishCreateTask(newTask))
}

export default function* watchCreateTask() {
  yield all([
    takeEvery(DoneTask, watchForDoneTask),
    takeEvery(CancelTask, watchForCancelTask),
    takeEvery(Initializing, watchInitialize),
    takeEvery(CreateTask, watchForCreateTask),
  ])
}
