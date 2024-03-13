import Core from '../core/Core.js'
import Router from './Router.js'

class App {
    constructor() {
        this.core = new Core()
        this.router = new Router()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App()

    const navigateTo = url => {
        history.pushState(null, null, url)
        app.router.routing()
    }

    self.addEventListener('popstate', app.router.routing)

    document.addEventListener('dashboard:navigate', e => {
        if (e.detail.linkName === 'app') {
            navigateTo(e.detail.url)
        }
    })

    app.router.routing()
})
