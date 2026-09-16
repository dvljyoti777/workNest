export const taskActionTypes = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  MOVE_TASK: 'MOVE_TASK',
}

export const initialTaskState = {
  tasks: [
    { id: 'task-1', title: 'Plan dashboard metrics', description: 'Confirm the KPIs shown on the manager dashboard.', status: 'backlog', priority: 'medium', assignee: 'Aarav Sharma', dueDate: '2026-09-24' },
    { id: 'task-2', title: 'Write empty-state copy', description: 'Prepare friendly copy for projects without tasks.', status: 'todo', priority: 'low', assignee: 'Meera Joshi', dueDate: '2026-09-21' },
    { id: 'task-3', title: 'Build navigation prototype', description: 'Validate desktop and mobile navigation behavior.', status: 'todo', priority: 'high', assignee: 'Rohan Verma', dueDate: '2026-09-19' },
    { id: 'task-4', title: 'Review project permissions', description: 'Check each role against the permissions matrix.', status: 'in_progress', priority: 'high', assignee: 'Aarav Sharma', dueDate: '2026-09-18' },
    { id: 'task-5', title: 'Create avatar component', description: 'Support image and initials-based avatars.', status: 'done', priority: 'medium', assignee: 'Sara Khan', dueDate: '2026-09-16' },
  ],
}

export function taskReducer(state, action) {
  switch (action.type) {
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
        tasks: state.tasks.map((task) => task.id === action.payload.id ? { ...task, status: action.payload.status } : task),
      }
    default:
      return state
  }
}
