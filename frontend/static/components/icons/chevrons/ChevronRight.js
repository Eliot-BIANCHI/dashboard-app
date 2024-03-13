export default class ChevronRight extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `
            <svg width="40px" height="40px" viewBox="0 0 24 24">
                <polyline fill="none" id="Right" points="8.5 5 15.5 12 8.5 19" stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        `
    }
}