export default class KanbanContainer extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.title = this.getAttribute('title')

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
            <link rel="stylesheet" href="/static/styles/tasks-manager/KanbanContainer.css">
            <h3 class="container-title">${this.title}</h3>
            <div class="container-tasks">
                <slot name="tasks"></slot>
            </div>
        `
    }
}