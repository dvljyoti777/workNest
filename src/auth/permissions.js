export const rolePermissions = {
  admin: ['dashboard:view', 'projects:view', 'project:manage-members', 'tasks:view', 'team:view', 'notifications:view', 'settings:view'],
  manager: ['dashboard:view', 'projects:view', 'project:manage-members', 'tasks:view', 'team:view', 'notifications:view'],
  member: ['dashboard:view', 'projects:view', 'tasks:view', 'team:view', 'notifications:view'],
  viewer: ['dashboard:view', 'projects:view'],
}

export function hasPermission(role, permission) {
  return rolePermissions[role]?.includes(permission) ?? false
}
