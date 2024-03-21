export function createKanbanTask({ id, content }) {
    const kanbanTask = document.createElement('kanban-task')

    kanbanTask.setAttribute('slot', 'tasks')
    kanbanTask.setAttribute('key', id)
    kanbanTask.setAttribute('content', content)
    kanbanTask.setAttribute('draggable', true)

    kanbanTask.addEventListener('dragstart', () => {
        kanbanTask.classList.add('dragging')
    })

    kanbanTask.addEventListener('dragend', () => {
        kanbanTask.classList.remove('dragging')
    })

    return kanbanTask
}