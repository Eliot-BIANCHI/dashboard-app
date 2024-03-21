import { dispatchNavigate } from '../events/routing.js'

export default class AppNavbar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
            <link rel="stylesheet" href="/static/styles/AppNavbar.css">
            <nav class="app-navbar">
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="/" class="nav-link" data-link="app">
                            <icon-home class="link-icon"></icon-home>
                            <span class="link-text">Home</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a href="/scheduler" class="nav-link" data-link="app">
                            <icon-scheduler class="link-icon"></icon-scheduler>
                            <span class="link-text">Scheduler</span>
                        </a>
                    </li>
                    
                    <li class="nav-item">
                        <a href="/tasks-manager/1" class="nav-link" data-link="app">
                            <icon-tasks-manager class="link-icon"></icon-tasks-manager>
                            <span class="link-text">Tasks</span>
                        </a>
                    </li>
                </ul>
            </nav>
        `

        dispatchNavigate(shadow, 'app')
    }
}