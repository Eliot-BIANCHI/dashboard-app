import Http from '../http/Http.js'

export default class TasksManagerView {
    constructor(params) {
        document.title = 'Tasks manager'
        this.id = params.id
    }

    async getHTML() {
        const tasks = await Http.get(`/api/tasks-manager/${this.id}`, { parseAs: 'text' })

        return `
            <kanban-board tasks='${tasks}'></kanban-board>
        `
    }
}