function asObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError(`Invalid ${label} payload.`)
  return value
}
const unwrap = (payload) => payload?.data ?? payload
const asArray = (payload, label) => {
  const value = unwrap(payload)
  if (!Array.isArray(value)) throw new TypeError(`Invalid ${label} collection payload.`)
  return value
}

/** @param {unknown} payload */
export function mapProject(payload) {
  const item = asObject(unwrap(payload), 'project')
  if (item.id == null || !item.name) throw new TypeError('Project payload requires id and name.')
  const taskSummary = item.tasks ?? item.task_summary ?? {}
  return { id: String(item.id), name: String(item.name), description: String(item.description ?? ''), color: item.color ?? '#0b63e6', dueDate: item.dueDate ?? item.due_date ?? '', status: item.status ?? 'planning', members: Array.isArray(item.members) ? item.members : [], tasks: { completed: Number(taskSummary.completed ?? item.completed_tasks ?? 0), total: Number(taskSummary.total ?? item.total_tasks ?? 0) } }
}
export const mapProjects = (payload) => asArray(payload, 'project').map(mapProject)
export function mapDashboard(payload) {
  const item = asObject(unwrap(payload), 'dashboard')
  return { projects: mapProjects(item.projects ?? []), activities: Array.isArray(item.activities) ? item.activities : [], workload: Array.isArray(item.workload) ? item.workload : [] }
}

/** @param {unknown} payload */
export function mapTask(payload) {
  const item = asObject(unwrap(payload), 'task')
  if (item.id == null || !item.title) throw new TypeError('Task payload requires id and title.')
  return { id: String(item.id), projectId: String(item.projectId ?? item.project_id ?? ''), title: String(item.title), description: String(item.description ?? ''), status: item.status ?? 'backlog', priority: item.priority ?? 'medium', assignee: String(item.assignee?.name ?? item.assignee ?? ''), dueDate: item.dueDate ?? item.due_date ?? '' }
}
export const mapTasks = (payload) => asArray(payload, 'task').map(mapTask)

export function mapMember(payload) {
  const item = asObject(unwrap(payload), 'member')
  if (item.id == null || !item.name || !item.email) throw new TypeError('Member payload requires id, name and email.')
  return { id: String(item.id), name: String(item.name), email: String(item.email), role: item.role ?? 'member', team: item.team?.name ?? item.team ?? '', status: item.status ?? 'active' }
}
export const mapMembers = (payload) => asArray(payload, 'member').map(mapMember)

export const toProjectPayload = (project) => ({ name: project.name.trim(), description: project.description.trim(), dueDate: project.dueDate })
export const toTaskPayload = (task) => ({ projectId: task.projectId, title: task.title.trim(), description: task.description?.trim() ?? '', status: task.status, priority: task.priority, assignee: task.assignee, dueDate: task.dueDate })
export const toMemberPayload = (member) => ({ name: member.name.trim(), email: member.email.trim(), role: member.role, team: member.team, message: member.message?.trim() ?? '' })
