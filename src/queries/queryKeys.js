export const projectKeys = {
  all: ['projects'],
  lists: () => [...projectKeys.all, 'list'],
  list: (mode) => [...projectKeys.lists(), { mode }],
  dashboards: () => [...projectKeys.all, 'dashboard'],
  dashboard: (mode) => [...projectKeys.dashboards(), { mode }],
}

export const taskKeys = {
  all: ['tasks'],
  lists: () => [...taskKeys.all, 'list'],
  list: (mode) => [...taskKeys.lists(), { mode }],
}
