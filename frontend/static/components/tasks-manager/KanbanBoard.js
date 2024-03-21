import Http from '../../http/Http.js'

import { createKanbanTask } from '../../tools/tasks-manager.js'

export default class KanbanBoard extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const tasks = JSON.parse(this.getAttribute('tasks'))

        this.tasksByContainer = tasks.reduce((containers, task) => {
            const container = containers.find(container => container.id === task.containerId)
            if (container === undefined) {
                containers.push({
                    id: task.containerId,
                    title: task.containerTitle,
                    tasks: [{ id: task.id, content: task.content }]
                })
            } else {
                container.tasks.push({ id: task.id, content: task.content })
            }
            return containers
        }, [])

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
            <link rel="stylesheet" href="/static/styles/tasks-manager/KanbanBoard.css">
            <section class="kanban-board">
                <h1 class="kanban-title">Kanban</h1>
                <add-kanban-task></add-kanban-task>
                <div class="kanban-containers">
                ${this.tasksByContainer.map(container => {
                return `
                    <kanban-container
                        key="${container.id}"
                        title="${container.title}"
                    >
                    ${container.tasks.map(task => {
                    return `
                        <kanban-task slot="tasks"
                            key="${task.id}"
                            content="${task.content}"
                            draggable="true"
                        >
                        </kanban-task>`
                    }).join('')}
                    </kanban-container>`
                }).join('')}
                </div>
            </section>
        `

        const kanbanTasks = shadow.querySelectorAll('kanban-task')
        
        kanbanTasks.forEach(kanbanTask => {
            kanbanTask.addEventListener('dragstart', () => {
                kanbanTask.classList.add('dragging')
            })

            kanbanTask.addEventListener('dragend', () => {
                kanbanTask.classList.remove('dragging')
            })
        })

        const kanbanContainers = shadow.querySelectorAll('kanban-container')

        kanbanContainers.forEach(kanbanContainer => {
            kanbanContainer.addEventListener('dragover', e => {
                e.preventDefault()
                const draggable = shadow.querySelector('.dragging')
                const afterElement = getDragAfterElement(kanbanContainer, e.clientY)
                if (afterElement === null) {
                    kanbanContainer.appendChild(draggable)
                } else {
                    kanbanContainer.insertBefore(draggable, afterElement)
                }
            })
        })

        document.addEventListener('dashboard:add-kanban-task', async e => {
            const body = {
                content: e.detail.taskContent,
                containerId: e.detail.containerId
            }

            const newTask = await Http.add('/api/tasks-manager', body, { parseAs: 'json' })

            const containerId = this.tasksByContainer[0].id

            const kanbanContainer = shadow.querySelector(`kanban-container[key="${containerId}"]`)

            const kanbanTask = createKanbanTask(newTask)

            kanbanContainer.append(kanbanTask)

            this.tasksByContainer[0].tasks.push(newTask)
        })

        document.addEventListener('dashboard:delete-kanban-task', async e => {
            const idParam = parseInt(e.detail.taskId)
            const containerId = parseInt(e.detail.containerId)

            await Http.remove(`/api/tasks-manager/${idParam}`)

            const container = this.tasksByContainer.find(container => container.id === containerId)

            const index = container.tasks.findIndex(task => task.id === idParam)

            container.tasks.splice(index, 1)

            const kanbanContainer = shadow.querySelector(`kanban-container[key="${containerId}"]`)

            const kanbanTask = [...kanbanContainer.children].find(kanbanTask => {
                return parseInt(kanbanTask.getAttribute('key')) === idParam
            })
        
            kanbanTask.remove()
        })
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('kanban-task:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}
