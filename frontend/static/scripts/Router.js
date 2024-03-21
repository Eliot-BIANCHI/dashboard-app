import Home from '../views/Home.js'
import Scheduler from '../views/Scheduler.js'
import TasksManager from '../views/TasksManager.js'

import NotFound from '../views/NotFound.js'

const pathToRegex = path => new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`)

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    return Object.fromEntries(keys.map((key, index) => {
        return [key, values[index]]
    }))
}

export default class Router {
    async routing() {

        const routes = [
            { path: '/', view: Home },
            { path: '/scheduler', view: Scheduler },
            { path: '/tasks-manager/:id', view: TasksManager },
            { path: '/not-found', view: NotFound }
        ]

        const matches = routes.map(route => {
            return {
                route,
                result: location.pathname.match(pathToRegex(route.path))
            }
        })

        const match = matches.some(match => match.result !== null)
            ? matches.find(match => match.result !== null)
            : {
                route: routes.at(-1),
                result: [location.pathname]
            }

        const routeParams = getParams(match)

        const view = new match.route.view(routeParams)

        document.querySelector('#app').innerHTML = await view.getHTML()
    }
}