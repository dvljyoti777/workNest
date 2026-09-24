import { moveTaskInList } from '../../lib/taskOrdering'

export const taskActionTypes = {
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  MOVE_TASK: 'MOVE_TASK',
}

export const initialTaskState = { tasks: [] }

export function taskReducer(state, action) {
  switch (action.type) {
    case taskActionTypes.SET_TASKS:
      return { ...state, tasks: [...action.payload] }
    case taskActionTypes.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] }
    case taskActionTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => task.id === action.payload.id ? { ...task, ...action.payload.updates, id: task.id } : task),
      }
    case taskActionTypes.DELETE_TASK:
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload.id) }
    case taskActionTypes.MOVE_TASK:
      return {
        ...state,
        tasks: moveTaskInList(state.tasks, action.payload.id, action.payload.status, action.payload.targetIndex),
      }
    default:
      return state
  }
}
