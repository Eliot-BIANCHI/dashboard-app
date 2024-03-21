export default class KanbanTask extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.content = this.getAttribute('content')
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
            <link rel="stylesheet" href="/static/styles/tasks-manager/KanbanTask.css">
            <input value="${this.content}" />
            <button data-delete-task>X</button>
        `

        const btnDeleteTask = shadow.querySelector('button[data-delete-task]')

        btnDeleteTask.addEventListener('click', () => {
            const taskId = this.getAttribute('key')
            const parentContainer = this.parentElement
            const containerId = parentContainer.getAttribute('key')

            const deleteKanbanTaskEvent = new CustomEvent('dashboard:delete-kanban-task', {
                detail: { taskId, containerId }
            })
        
            document.dispatchEvent(deleteKanbanTaskEvent)
        })
    }
}
