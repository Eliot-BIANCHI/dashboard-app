export default class TasksManagerView {
    constructor(params) {
        document.title = 'Tasks manager'
        console.log(params)
    }

    async getHTML() {
        return '<h1>Tasks Manager View</h1>'
    }
}