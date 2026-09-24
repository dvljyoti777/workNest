import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import ProjectLayout from './layouts/ProjectLayout/ProjectLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import PermissionRoute from './routes/PermissionRoute'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import LoginPage from './pages/LoginPage/LoginPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ProjectOverviewPage from './pages/ProjectOverviewPage/ProjectOverviewPage'
import ProjectTasksPage from './pages/ProjectTasksPage/ProjectTasksPage'
import ProjectMembersPage from './pages/ProjectMembersPage/ProjectMembersPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import NewProjectPage from './pages/NewProjectPage/NewProjectPage'
import TaskBoard from './features/tasks/TaskBoard/TaskBoard'
import TeamPage from './pages/TeamPage/TeamPage'
import NotificationsPage from './pages/NotificationsPage/NotificationsPage'
import RouteFallback from './components/ui/RouteFallback/RouteFallback'

const ReportsPage = lazy(() => import('./pages/ReportsPage/ReportsPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage/SettingsPage'))

const lazyRoute = (page) => <Suspense fallback={<RouteFallback />}>{page}</Suspense>

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}><Route path="/login" element={<LoginPage />} /></Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route element={<PermissionRoute permission="projects:create" />}>
            <Route path="projects/new" element={<NewProjectPage />} />
          </Route>
          <Route path="projects/:projectId" element={<ProjectLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<ProjectOverviewPage />} />
            <Route path="tasks" element={<ProjectTasksPage />} />
            <Route element={<PermissionRoute permission="project:manage-members" />}>
              <Route path="members" element={<ProjectMembersPage />} />
            </Route>
          </Route>
          <Route element={<PermissionRoute permission="tasks:view" />}><Route path="tasks" element={<TaskBoard />} /></Route>
          <Route element={<PermissionRoute permission="team:view" />}><Route path="team" element={<TeamPage />} /></Route>
          <Route element={<PermissionRoute permission="notifications:view" />}><Route path="notifications" element={<NotificationsPage />} /></Route>
          <Route element={<PermissionRoute permission="reports:view" />}>
            <Route path="reports" element={lazyRoute(<ReportsPage />)} />
          </Route>
          <Route path="settings" element={<PermissionRoute permission="settings:view" />}>
            <Route index element={lazyRoute(<SettingsPage />)} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
