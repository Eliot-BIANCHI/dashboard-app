export default class KanbanTask extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
            <default-form action="#" data-form="add-task">
                <form-textarea
                    textarea-name="content"
                    textarea-text="The Task content"
                    textarea-placeholder="Enter the task description"
                ></form-textarea>
                <input type="submit" value="Add task" />
            </default-form>
        `

        const input = shadow.querySelector('input[type="submit"]')
        input.addEventListener('click', () => {
            const textarea = shadow.querySelector('form-textarea')
            const taskContent = textarea.getTextareaValue()

            const addKanbanTaskEvent = new CustomEvent('dashboard:add-kanban-task', {
                detail: { taskContent, containerId: 1 }
            })
        
            document.dispatchEvent(addKanbanTaskEvent)
        })
    }
}
