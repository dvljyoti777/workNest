import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { hasPermission } from '../auth/permissions'
import { AuthContext } from '../context/AuthContext'
import PermissionRoute from './PermissionRoute'

function renderPermissionRoute(role, permission) {
  const value = { isAuthenticated: true, user: { role }, can: (requestedPermission) => hasPermission(role, requestedPermission) }
  return render(<AuthContext.Provider value={value}><MemoryRouter initialEntries={['/restricted']}><Routes><Route element={<PermissionRoute permission={permission} />}><Route path="/restricted" element={<h1>Restricted page</h1>} /></Route><Route path="/dashboard" element={<h1>Dashboard</h1>} /></Routes></MemoryRouter></AuthContext.Provider>)
}

describe('role permissions', () => {
  it.each([
    ['admin', 'settings:view'],
    ['admin', 'reports:view'],
    ['manager', 'reports:view'],
    ['admin', 'team:manage'],
    ['manager', 'team:manage'],
    ['member', 'team:view'],
  ])('allows %s to open %s', (role, permission) => {
    renderPermissionRoute(role, permission)
    expect(screen.getByRole('heading', { name: 'Restricted page' })).toBeInTheDocument()
  })

  it.each([
    ['manager', 'settings:view'],
    ['member', 'reports:view'],
    ['viewer', 'tasks:view'],
    ['member', 'team:manage'],
    ['viewer', 'team:view'],
  ])('redirects %s without %s to the dashboard', (role, permission) => {
    renderPermissionRoute(role, permission)
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Restricted page' })).not.toBeInTheDocument()
  })
})
