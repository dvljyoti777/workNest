# WorkNest

WorkNest is a React workspace dashboard prototype for project progress, recent activity, and team workload.

**Documentation updated:** 2026-09-16  
**Current status:** Routed frontend demo with role-based fake authentication, project pages, and an in-memory task board. Backend and persistent project/task storage are not implemented.

The phases below group the implementation currently present in this workspace. Git history is unavailable, so these are not verified historical delivery dates. Original creation dates are unknown; current files were reviewed on 2026-09-16.

## Local setup

Run these commands from `C:\Users\admin1\Desktop\jyoti-react\workNest`:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. Use a Node.js version supported by the installed dependencies.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production output in `dist/` |
| `npm run preview` | Serve an existing production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the Vitest reducer test suite once |

## Technology and file structure

Declared package versions: React/React DOM `^19.2.8`, React Router DOM `^7.18.4`, Vite `^8.2.2`, Vitest `^5.0.1`, React Vite plugin `^6.1.0`, and ESLint `^10.9.0`. Exact dependency resolution is in `package-lock.json`. Components use JavaScript/JSX and CSS Modules, with shared global CSS variables.

```text
workNest/
  public/                   # favicon.svg, icons.svg
  src/
    assets/                 # hero.png and starter React/Vite artwork
    components/
      dashboard/            # StatCard, ProjectProgress, ActivityList, WorkloadSummary
      layout/               # AppShell, Sidebar, Topbar
      navigation/NavItem/   # Shared navigation item
      ui/Avatar/            # Initials or image avatar
    auth/                   # Role-to-permission map
    context/                # Authentication context and provider
    data/dashboardData.js   # Mock projects, activities, workload
    features/dashboard/     # Dashboard composition, styles, demo states
    features/tasks/         # Kanban board, drawer, reducer, reducer tests
    hooks/                  # Authentication context hook
    layouts/                # Auth, workspace, and nested project layouts
    pages/                  # Routed login/dashboard/project/fallback pages
    routes/                 # Authentication and permission route guards
    services/               # Local demo authentication service
    App.jsx                 # Application route tree
    main.jsx                # React, router, and auth-provider entry point
    index.css               # Global styling and theme variables
  index.html                # Document title, favicon, root element
  vite.config.js
  eslint.config.js
  package.json
  package-lock.json
  README.md
```

Each component folder contains JSX and a matching CSS Module. Existing artwork in `src/assets/` is not a screenshot of the running dashboard.

## Phase-wise implementation record

### Phase 01 - Project foundation

**Status:** Present in current code.

- React entry point and application root configured with Vite.
- Development, production build, preview, and lint scripts available.
- ESLint configured for JavaScript, React Hooks, and React Refresh.
- Global typography, primary/text/border/surface color variables, focus outlines, and 320px minimum page width defined.
- HTML title set to `worknest`, with a local SVG favicon.

**Files:** `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`, `public/`.

### Phase 02 - Workspace shell and reusable UI

**Status:** Present in current code.

- `AppShell` combines sidebar, topbar, greeting, New project control, and dashboard.
- `Sidebar` displays WorkNest branding, workspace/account navigation, and sample user profile.
- `NavItem` renders shared navigation items; Dashboard is marked active in the navigation data.
- `Topbar` includes a labeled search field, notification indicator, and user controls.
- `Avatar` supports images or name-derived initials with size variants.

**Files:** `src/components/layout/`, `src/components/navigation/NavItem/`, `src/components/ui/Avatar/`.

**Limitations:** Search, notifications, profile menus, and New project do not have complete application workflows. Some routes still display placeholder content.

### Phase 03 - Dashboard data and cards

**Status:** Present in current code with mock data.

- `dashboardData.js` provides three projects, four activities, and four team members.
- `StatCard` displays active projects, task totals, completion rate, and workload alerts.
- `ProjectProgress` calculates completed/total percentages and displays due-date labels.
- `ActivityList` displays people, activity descriptions, and mock relative timestamps.
- `WorkloadSummary` compares assigned tasks with capacity, caps bar width at 100%, and highlights overload.
- A learning panel suggests extending statistics, sorting, filtering, and empty-state copy. These exercises are suggestions, not implemented features.

**Files:** `src/data/dashboardData.js`, `src/features/dashboard/`, `src/components/dashboard/`.

| Metric | Expected value from current mock data |
| --- | --- |
| Active projects | 3 |
| Total tasks | 54 |
| Completed tasks | 37 |
| Overall completion | 69% after rounding |
| Workload alerts | 1; Sara Khan has 11 assigned tasks against capacity 10 |
| Website Redesign | 18/24 tasks; 75% |
| Mobile App Launch | 12/20 tasks; 60% |
| Q4 Marketing Plan | 7/10 tasks; 70% |

### Phase 04 - Demo states and responsive behavior

**Status:** Present in code; browser validation pending.

- Buttons switch between `populated`, `loading`, and `empty` using React state.
- Loading displays seven animated skeleton blocks and an accessible loading status.
- Empty displays a no-data message and Create a project button; creation is not wired up.
- Statistics become two columns at widths up to 1050px; dashboard content grids stack at widths up to 900px.
- At widths up to 767px, the sidebar becomes a drawer with open/close controls and a backdrop.
- Drawer closing is implemented for the close button, backdrop, navigation selection, and Escape key.
- At widths up to 600px, statistics/loading blocks stack and the state switcher fills available width.
- Labels, section headings, selected-state attributes, and keyboard focus styles support accessibility; a full accessibility audit has not been performed.
- Global reduced-motion styles shorten transitions, but the skeleton shimmer has no explicit reduced-motion animation override.

**Files:** `src/App.jsx`, `src/index.css`, `src/features/dashboard/`, and layout JSX/CSS Modules.

### Phase 05 - Documentation baseline

**Recorded:** 2026-09-16. **Status:** README updated.

- Replaced the starter README with project setup, architecture, and phase details.
- Recorded current mock metrics, functional limitations, and pending work.
- Added screenshot requirements, capture instructions, verification results, and a future phase template.
- Application source and dependencies were not changed for this documentation update.

### Phase 06 - Routing, authentication, and permissions

**Detected from Git working tree:** 2026-09-16. **Status:** Implemented locally; changes are not committed.

- Added `BrowserRouter` and a nested React Router route tree for login, dashboard, projects, project sections, tasks, team, notifications, settings, and the 404 page.
- Added a local demo login for `admin`, `manager`, `member`, and `viewer` roles. The selected session is stored in `localStorage` under `worknest_session`; no password or real server authentication is used.
- Added `AuthProvider`, `AuthContext`, and `useAuth` to expose the current user, login/logout actions, authentication state, and permission checks.
- Added protected and permission-aware route guards. Unauthenticated users go to `/login`; disallowed protected routes return to `/dashboard`.
- Added a role-permission matrix. Admin receives all listed permissions; manager cannot access settings; member cannot manage project members or access settings; viewer sees dashboard and projects only.
- Sidebar links are now real route links, active state comes from `NavLink`, inaccessible items are hidden, and Exit clears the demo session.
- Topbar, sidebar, and dashboard greeting now use the logged-in demo user's name and role.
- Added auth, dashboard, and nested project layouts. Mobile drawer/Escape handling moved into `DashboardLayout`.
- Added login, dashboard, projects, project overview, placeholder, and not-found pages. Project member tabs are permission-aware.

**Created files (25):** `src/auth/permissions.js`; `src/context/AuthContext.js`; `src/context/AuthProvider.jsx`; `src/hooks/useAuth.js`; three files in `src/routes/` and `src/services/`; six layout JSX/CSS files in `src/layouts/`; and twelve page JSX/CSS files in `src/pages/`.

**Modified tracked files:** `src/App.jsx`, `src/main.jsx`, `src/components/layout/Sidebar/Sidebar.jsx`, `src/components/layout/Topbar/Topbar.jsx`, and `src/components/navigation/NavItem/NavItem.jsx`.

### Phase 07 - Kanban task management

**Detected from Git working tree:** 2026-09-16. **Status:** Implemented locally; changes are not committed.

- Added a four-column Kanban board: Backlog, To do, In progress, and Done.
- Seeded five in-memory demo tasks with title, description, status, priority, assignee, and due date.
- Added task creation from the page or a specific column, editing in a side drawer, deletion, and left/right status movement.
- Added required form validation for title, assignee, and due date. New task IDs use `crypto.randomUUID()`.
- Added a reducer with immutable add, update, delete, and move actions.
- Added five Vitest cases covering all reducer actions and unknown-action behavior.
- Task changes last only for the current mounted browser session; refresh/navigation may reset them because storage/API persistence is not connected.

**Created files (6):** `src/features/tasks/taskReducer.js`, `src/features/tasks/taskReducer.test.js`, and the JSX/CSS Module pairs under `src/features/tasks/TaskBoard/` and `src/features/tasks/TaskDrawer/`.

### Phase 08 - Dependency and Git working-tree update

**Detected:** 2026-09-16. **Status:** Local working tree contains uncommitted changes.

- Added `react-router-dom` and `vitest`, plus the `npm test` script in `package.json`; `package-lock.json` changed with the resolved dependency tree.
- Git comparison against `HEAD` (`ab0c57f`, `first commit`) reports 31 untracked source/style/test files and 7 modified tracked files before this README update.
- This README is now also modified by the documentation update. No application files were staged or committed as part of documenting them.

| Git state before this README edit | Files |
| --- | --- |
| Modified tracked files | `package.json`, `package-lock.json`, `src/App.jsx`, `src/main.jsx`, `Sidebar.jsx`, `Topbar.jsx`, `NavItem.jsx` |
| Untracked files | 31 files under `src/auth/`, `src/context/`, `src/features/tasks/`, `src/hooks/`, `src/layouts/`, `src/pages/`, `src/routes/`, and `src/services/` |
| Current branch/base | `main` at `ab0c57f` (`origin/main`) |

The counts above are a dated snapshot. Run `git status --short --untracked-files=all` for the latest working-tree state.

## Screenshot details and register

**Actual capture status:** Screenshots have not been captured or attached. Filenames below are planned locations, not existing image links. Capture targets do not imply completed visual testing.

Save future captures under `docs/screenshots/`. Retain earlier phase images when later changes alter the UI.

| ID / phase | Planned filename | Viewport | Capture steps and visible details | Status |
| --- | --- | --- | --- | --- |
| S01 / 02-03 | `phase-03-dashboard-desktop.png` | 1440 x 1000 | Select Populated; full page showing sidebar, topbar, four statistics, projects, activity, workload, and exercises | Pending |
| S02 / 04 | `phase-04-dashboard-loading.png` | 1440 x 1000 | Select Loading; show skeleton blocks within the workspace shell | Pending |
| S03 / 04 | `phase-04-dashboard-empty.png` | 1440 x 1000 | Select Empty; show no-data message and Create a project control | Pending |
| S04 / 04 | `phase-04-dashboard-tablet.png` | 820 x 1180 | Select Populated; show two-column statistics and stacked content sections | Pending |
| S05 / 04 | `phase-04-dashboard-mobile.png` | 390 x 844 | Select Populated with navigation closed; full page showing single-column cards | Pending |
| S06 / 04 | `phase-04-mobile-navigation.png` | 390 x 844 | Open menu; show navigation drawer, close button, user profile, and backdrop | Pending |
| S07 / 03 | `phase-03-workload-alert.png` | 1440 x 1000 | Capture Team workload showing Sara Khan at 11/10 tasks with Over capacity label | Pending |
| S08 / 06 | `phase-06-login-roles.png` | 1440 x 900 | Open `/login`; show the WorkNest brand panel and four demo role choices | Pending |
| S09 / 06 | `phase-06-viewer-navigation.png` | 1440 x 1000 | Sign in as Viewer; show that only permitted Dashboard and Projects navigation entries are visible | Pending |
| S10 / 06 | `phase-06-project-layout.png` | 1440 x 1000 | Sign in as Manager; open a project and capture Overview, Tasks, and Members tabs | Pending |
| S11 / 07 | `phase-07-kanban-board.png` | 1440 x 1000 | Sign in as Manager; open My Tasks and capture all four columns and five seeded tasks | Pending |
| S12 / 07 | `phase-07-task-drawer.png` | 1440 x 1000 | Open Add task or Edit; capture the drawer fields, actions, board, and backdrop | Pending |

### Capture and attach

1. Run `npm run dev` and open the URL printed by Vite.
2. Set the target viewport in browser developer tools and select the required demo state.
3. Capture the rendered app. Use full-page captures for dashboard layouts and a section capture for the workload detail.
4. Create `docs/screenshots/` if needed and save the PNG with its registered filename.
5. Change the register status to Captured. Record date, browser/version, viewport, state, and observations.
6. Add a relative Markdown image link only after its image file exists.

Future screenshot attachment example:

```markdown
### S01 - Phase 03 desktop dashboard

![WorkNest populated desktop dashboard](docs/screenshots/phase-03-dashboard-desktop.png)

- Captured: YYYY-MM-DD
- Browser/version: ...
- Viewport: 1440 x 1000; full-page capture
- State: Populated
- Details: 3 projects, 54 tasks, 69% completion, and 1 workload alert.
- Observations: ...
```

## Validation record

| Date | Check | Result |
| --- | --- | --- |
| 2026-09-16 | Source review | Descriptions and mock metrics checked against current files |
| 2026-09-16 | `npm run lint` | Passed |
| 2026-09-16 | `npm test` after phases 06-08 | Passed: 1 test file, 5 reducer tests |
| 2026-09-16 | `npm run build` after phases 06-08 | Passed: 73 modules transformed; production bundle generated |
| 2026-09-16 | Browser interactions and screenshots | Not performed; captures pending |

Vitest now covers the task reducer. Automated browser/component tests are not configured, so command results do not confirm routing interactions or visual appearance.

## Pending work / future phases

These items are not completed features:

- Replace placeholder content for project tasks/members, Team, Notifications, and Settings.
- Persist project/task changes or connect them to a backend API.
- Replace role selection and fake local tokens with real authentication and server-authorized permissions.
- Functional search, notifications, profile controls, and activity menus.
- Live fetching with real loading/error/empty behavior.
- Dynamic dates/user information, browser checks, and accessibility review.
- Capture and attach the registered screenshots.

## Update process for every future phase

README updates are manual; automatic documentation or screenshot generation is not configured. After each phase, append an entry, update affected feature/status sections, record checks actually performed, and attach relevant screenshots. Keep earlier phase entries and distinguish completed work from planned work.

Copy this template for the next phase:

```markdown
### Phase NN - Title

- Date: YYYY-MM-DD
- Status: Planned / In progress / Completed / Blocked
- Purpose: Problem addressed.
- Created files: Paths and responsibilities.
- Changed files: Paths and what changed.
- Behavior: Previous behavior -> new behavior.
- Data/dependencies: Mock/API/schema/package changes, or None.
- Validation: Commands/manual checks performed and actual results.
- Screenshots: Existing relative links, date, browser, viewport, state, visible details; otherwise Pending.
- Known limitations: Incomplete behavior or blockers.
- Next phase: Remaining work.
```
