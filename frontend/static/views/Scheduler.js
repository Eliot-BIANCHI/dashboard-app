export default class SchedulerView {
    constructor(params) {
        document.title = 'Scheduler'
        console.log(params)
    }

    async getHTML() {
        return '<h1>Scheduler View</h1>'
    }
}