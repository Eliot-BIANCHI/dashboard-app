export default class HomeView {
    constructor(params) {
        document.title = 'Home'
        this.params = params
    }

    async getHTML() {
        return '<h1>Home View</h1>'
    }
}