export const projectMocks = [
  { id: 'project-1', name: 'Website Redesign', description: 'Refresh the public website experience.', color: '#0b63e6', dueDate: '2026-09-28', status: 'active', members: ['AS', 'MJ', 'RK'], tasks: { completed: 18, total: 24 } },
  { id: 'project-2', name: 'Mobile App Launch', description: 'Prepare the mobile product for launch.', color: '#7c3aed', dueDate: '2026-10-12', status: 'active', members: ['RV', 'SK', 'MJ'], tasks: { completed: 12, total: 20 } },
  { id: 'project-3', name: 'Q4 Marketing Plan', description: 'Plan campaigns and quarterly milestones.', color: '#16a36a', dueDate: '2026-10-04', status: 'planning', members: ['SK', 'KR'], tasks: { completed: 7, total: 10 } },
]

export const activityMocks = [
  { id: 'activity-1', person: 'Meera Joshi', initials: 'MJ', action: 'completed', subject: 'Homepage wireframes', time: '12 min ago', tone: 'green' },
  { id: 'activity-2', person: 'Rohan Verma', initials: 'RV', action: 'commented on', subject: 'Mobile onboarding flow', time: '45 min ago', tone: 'purple' },
  { id: 'activity-3', person: 'Aarav Sharma', initials: 'AS', action: 'created', subject: 'Q4 campaign brief', time: '2 hours ago', tone: 'orange' },
  { id: 'activity-4', person: 'Sara Khan', initials: 'SK', action: 'moved a task to review in', subject: 'Website Redesign', time: 'Yesterday', tone: 'blue' },
]

export const workloadMocks = [
  { id: 'member-1', name: 'Meera Joshi', initials: 'MJ', assigned: 8, capacity: 10, color: '#635bff' },
  { id: 'member-2', name: 'Rohan Verma', initials: 'RV', assigned: 6, capacity: 10, color: '#12b76a' },
  { id: 'member-3', name: 'Sara Khan', initials: 'SK', assigned: 11, capacity: 10, color: '#f79009' },
  { id: 'member-4', name: 'Kabir Rao', initials: 'KR', assigned: 4, capacity: 8, color: '#2e90fa' },
]
