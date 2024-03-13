export default class HomeView {
    constructor(params) {
        document.title = 'Home'
        console.log(params)
    }

    async getHTML() {
        return '<h1>Home View</h1>'
    }
}