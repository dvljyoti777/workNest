import { useOutletContext } from 'react-router-dom'
import TaskBoard from '../../features/tasks/TaskBoard/TaskBoard'

function ProjectTasksPage() {
  const { project } = useOutletContext()
  return <TaskBoard projectId={project.id} projectName={project.name} />
}

export default ProjectTasksPage
