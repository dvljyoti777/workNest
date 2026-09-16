import { describe, expect, it } from 'vitest'
import { initialTaskState, taskActionTypes, taskReducer } from './taskReducer'

describe('taskReducer', () => {
  it('ADD_TASK appends a task without mutating the previous state', () => {
    const task = { id: 'task-new', title: 'New task', status: 'backlog' }
    const result = taskReducer(initialTaskState, { type: taskActionTypes.ADD_TASK, payload: task })
    expect(result.tasks).toHaveLength(initialTaskState.tasks.length + 1)
    expect(result.tasks.at(-1)).toEqual(task)
    expect(result.tasks).not.toBe(initialTaskState.tasks)
  })

  it('UPDATE_TASK replaces only the matching task', () => {
    const result = taskReducer(initialTaskState, { type: taskActionTypes.UPDATE_TASK, payload: { id: 'task-2', updates: { title: 'Updated copy' } } })
    expect(result.tasks[1].title).toBe('Updated copy')
    expect(result.tasks[1]).not.toBe(initialTaskState.tasks[1])
    expect(result.tasks[0]).toBe(initialTaskState.tasks[0])
  })

  it('DELETE_TASK returns a new array without the selected task', () => {
    const result = taskReducer(initialTaskState, { type: taskActionTypes.DELETE_TASK, payload: { id: 'task-3' } })
    expect(result.tasks.some((task) => task.id === 'task-3')).toBe(false)
    expect(initialTaskState.tasks.some((task) => task.id === 'task-3')).toBe(true)
  })

  it('MOVE_TASK changes only status on the matching task', () => {
    const result = taskReducer(initialTaskState, { type: taskActionTypes.MOVE_TASK, payload: { id: 'task-1', status: 'done' } })
    expect(result.tasks[0]).toEqual({ ...initialTaskState.tasks[0], status: 'done' })
    expect(result.tasks[0]).not.toBe(initialTaskState.tasks[0])
    expect(result.tasks[1]).toBe(initialTaskState.tasks[1])
  })

  it('returns the same state for an unknown action', () => {
    expect(taskReducer(initialTaskState, { type: 'UNKNOWN' })).toBe(initialTaskState)
  })
})
