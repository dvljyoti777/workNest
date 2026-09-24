export function moveTaskInList(tasks, id, status, targetIndex) {
  const movingTask = tasks.find((task) => task.id === id)
  if (!movingTask) return tasks
  const remaining = tasks.filter((task) => task.id !== id)
  const updatedTask = { ...movingTask, status }
  const targetTasks = remaining.filter((task) => task.status === status)
  const safeIndex = targetIndex == null ? targetTasks.length : Math.max(0, Math.min(targetIndex, targetTasks.length))
  const insertBefore = targetTasks[safeIndex]
  if (insertBefore) {
    const insertionIndex = remaining.findIndex((task) => task.id === insertBefore.id)
    return [...remaining.slice(0, insertionIndex), updatedTask, ...remaining.slice(insertionIndex)]
  }
  const lastTargetIndex = remaining.findLastIndex((task) => task.status === status)
  const insertionIndex = lastTargetIndex < 0 ? remaining.length : lastTargetIndex + 1
  return [...remaining.slice(0, insertionIndex), updatedTask, ...remaining.slice(insertionIndex)]
}
