import { describe, expect, it } from 'vitest'
import { taskActionTypes, taskReducer } from './taskReducer'

const firstTask = { id: 'task-1', title: 'First task', status: 'backlog' }
const secondTask = { id: 'task-2', title: 'Second task', status: 'todo' }
const initialTaskState = { tasks: [firstTask, secondTask] }

describe('taskReducer', () => {
  it('ADD_TASK appends a task without mutating the previous state', () => {
    const task = { id: 'task-new', title: 'New task', status: 'backlog' }
    const result = taskReducer(initialTaskState, { type: taskActionTypes.ADD_TASK, payload: task })
    expect(result.tasks).toHaveLength(initialTaskState.tasks.length + 1)
    expect(result.tasks.at(-1)).toEqual(task)
    expect(result.tasks).not.toBe(initialTaskState.tasks)
  })

  it('SET_TASKS replaces the collection with a new array', () => {
    const tasks = [{ id: 'loaded-task', title: 'Loaded task', status: 'todo' }]
    const result = taskReducer(initialTaskState, { type: taskActionTypes.SET_TASKS, payload: tasks })
    expect(result.tasks).toEqual(tasks)
    expect(result.tasks).not.toBe(tasks)
  })

  it('UPDATE_TASK replaces only the matching task', () => {
    const result = taskReducer(initialTaskState, { type: taskActionTypes.UPDATE_TASK, payload: { id: 'task-2', updates: { title: 'Updated copy' } } })
    expect(result.tasks[1].title).toBe('Updated copy')
    expect(result.tasks[1]).not.toBe(initialTaskState.tasks[1])
    expect(result.tasks[0]).toBe(initialTaskState.tasks[0])
  })

  it('DELETE_TASK returns a new array without the selected task', () => {
    const result = taskReducer(initialTaskState, { type: taskActionTypes.DELETE_TASK, payload: { id: 'task-2' } })
    expect(result.tasks.some((task) => task.id === 'task-2')).toBe(false)
    expect(initialTaskState.tasks.some((task) => task.id === 'task-2')).toBe(true)
  })

  it('MOVE_TASK changes only status on the matching task', () => {
    const result = taskReducer(initialTaskState, { type: taskActionTypes.MOVE_TASK, payload: { id: 'task-1', status: 'done' } })
    const movedTask = result.tasks.find((task) => task.id === 'task-1')
    expect(movedTask).toEqual({ ...initialTaskState.tasks[0], status: 'done' })
    expect(movedTask).not.toBe(initialTaskState.tasks[0])
    expect(result.tasks.find((task) => task.id === 'task-2')).toBe(initialTaskState.tasks[1])
  })

  it('MOVE_TASK inserts a card at the requested position without mutating the source', () => {
    const thirdTask = { id: 'task-3', title: 'Third task', status: 'todo' }
    const state = { tasks: [...initialTaskState.tasks, thirdTask] }
    const result = taskReducer(state, { type: taskActionTypes.MOVE_TASK, payload: { id: 'task-1', status: 'todo', targetIndex: 1 } })

    expect(result.tasks.filter((task) => task.status === 'todo').map((task) => task.id)).toEqual(['task-2', 'task-1', 'task-3'])
    expect(state.tasks.map((task) => task.status)).toEqual(['backlog', 'todo', 'todo'])
  })

  it('returns the same state for an unknown action', () => {
    expect(taskReducer(initialTaskState, { type: 'UNKNOWN' })).toBe(initialTaskState)
  })
})
