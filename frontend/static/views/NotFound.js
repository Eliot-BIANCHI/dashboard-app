export default class NotFoundView {
    constructor(params) {
        document.title = 'Not found'
        console.log(params)
    }

    async getHTML() {
        return '<h1>Not found View</h1>'
    }
}