export const dashboardData = {
  projects: [
    { id: 'project-1', name: 'Website Redesign', color: '#635bff', dueDate: 'Sep 28', tasks: { completed: 18, total: 24 } },
    { id: 'project-2', name: 'Mobile App Launch', color: '#12b76a', dueDate: 'Oct 12', tasks: { completed: 12, total: 20 } },
    { id: 'project-3', name: 'Q4 Marketing Plan', color: '#f79009', dueDate: 'Oct 04', tasks: { completed: 7, total: 10 } },
  ],
  activities: [
    { id: 'activity-1', person: 'Meera Joshi', initials: 'MJ', action: 'completed', subject: 'Homepage wireframes', time: '12 min ago', tone: 'green' },
    { id: 'activity-2', person: 'Rohan Verma', initials: 'RV', action: 'commented on', subject: 'Mobile onboarding flow', time: '45 min ago', tone: 'purple' },
    { id: 'activity-3', person: 'Aarav Sharma', initials: 'AS', action: 'created', subject: 'Q4 campaign brief', time: '2 hours ago', tone: 'orange' },
    { id: 'activity-4', person: 'Sara Khan', initials: 'SK', action: 'moved a task to review in', subject: 'Website Redesign', time: 'Yesterday', tone: 'blue' },
  ],
  workload: [
    { id: 'member-1', name: 'Meera Joshi', initials: 'MJ', assigned: 8, capacity: 10, color: '#635bff' },
    { id: 'member-2', name: 'Rohan Verma', initials: 'RV', assigned: 6, capacity: 10, color: '#12b76a' },
    { id: 'member-3', name: 'Sara Khan', initials: 'SK', assigned: 11, capacity: 10, color: '#f79009' },
    { id: 'member-4', name: 'Kabir Rao', initials: 'KR', assigned: 4, capacity: 8, color: '#2e90fa' },
  ],
}
