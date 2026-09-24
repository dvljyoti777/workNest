import { describe, expect, it } from 'vitest'
import { mapProject, mapTask } from './apiMappers'

describe('API payload mappers', () => {
  it('normalizes a snake_case project response', () => {
    expect(mapProject({ data: { id: 7, name: 'API migration', due_date: '2026-10-01', completed_tasks: 2, total_tasks: 5 } })).toMatchObject({ id: '7', dueDate: '2026-10-01', tasks: { completed: 2, total: 5 } })
  })

  it('rejects a malformed task response', () => {
    expect(() => mapTask({ id: 1 })).toThrow(/requires id and title/i)
  })
})
