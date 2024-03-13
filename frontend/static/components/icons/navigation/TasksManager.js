export default class TasksManagerIcon extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
            <svg width="40px" height="40px" stroke="#FFF" viewBox="0 0 24 24" fill="none">
                <path d="M11 19.5H21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11 12.5H21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11 5.5H21" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 5.5L4 6.5L7 3.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 12.5L4 13.5L7 10.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 19.5L4 20.5L7 17.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `
    }
}