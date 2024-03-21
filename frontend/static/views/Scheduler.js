export default class SchedulerView {
    constructor(params) {
        document.title = 'Scheduler'
        this.params = params
    }

    async getHTML() {
        return '<h1>Scheduler View</h1>'
    }
}