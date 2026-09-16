import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import ProjectLayout from './layouts/ProjectLayout/ProjectLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import PermissionRoute from './routes/PermissionRoute'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import LoginPage from './pages/LoginPage/LoginPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import PlaceholderPage from './pages/PlaceholderPage/PlaceholderPage'
import ProjectOverviewPage from './pages/ProjectOverviewPage/ProjectOverviewPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import TaskBoard from './features/tasks/TaskBoard/TaskBoard'

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}><Route path="/login" element={<LoginPage />} /></Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectId" element={<ProjectLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<ProjectOverviewPage />} />
            <Route path="tasks" element={<PlaceholderPage title="Project tasks" description="Tasks for this project will appear here." />} />
            <Route element={<PermissionRoute permission="project:manage-members" />}>
              <Route path="members" element={<PlaceholderPage title="Project members" description="Manage this project's team and access." />} />
            </Route>
          </Route>
          <Route element={<PermissionRoute permission="tasks:view" />}><Route path="tasks" element={<TaskBoard />} /></Route>
          <Route path="team" element={<PlaceholderPage title="Team" description="View your team and their workload." />} />
          <Route path="notifications" element={<PlaceholderPage title="Notifications" description="Your latest workspace notifications." />} />
          <Route path="settings" element={<PermissionRoute permission="settings:view" />}>
            <Route index element={<PlaceholderPage title="Settings" description="Manage workspace preferences and permissions." />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
