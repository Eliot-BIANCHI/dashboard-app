import { handleNonEmptyInput } from '../../tools/form.js'

export default class DefaultForm extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })

        shadow.innerHTML = `
            <link rel="stylesheet" href="/static/styles/forms/DefaultForm.css">
            <form action="#">
                <slot></slot>
            </form>
        `
    }
}

export class FormField extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.fieldName = this.getAttribute('field-name')
        this.fieldText = this.getAttribute('field-text')
        this.fieldPlaceholder = this.getAttribute('field-placeholder')
        this.fieldType = this.getAttribute('field-type') ?? 'text'
        this.fieldIcon = this.getAttribute('field-icon')
    }

    connectedCallback() {
        const shadow = this.shadowRoot
        shadow.innerHTML = `
            <link rel="stylesheet" href="/static/styles/forms/FormField.css">
            <div class="form-field">
                ${this.fieldIcon === null ? '' : this.getIcon(this.fieldIcon)}
                <input
                    id="${this.fieldName}"
                    name="${this.fieldName}"
                    placeholder="${this.fieldPlaceholder}"
                    type="${this.fieldType}"    
                />
                <label for="${this.fieldName}">${this.fieldText} :</label>
            </div>
        `
        handleNonEmptyInput(shadow)
    }

    /**
     * 
     * @param {string} iconName 
     */
    getIcon(iconName) {
        return `<icon-${iconName} class="field-icon"></icon-${iconName}>`
    }
}

export class FormTextarea extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.textareaName = this.getAttribute('textarea-name')
        this.textareaText = this.getAttribute('textarea-text')
        this.textareaPlaceholder = this.getAttribute('textarea-placeholder')
    }

    connectedCallback() {
        const shadow = this.shadowRoot
        shadow.innerHTML = `
            <link rel="stylesheet" href="/static/styles/forms/fields/FormTextarea.css">
            <div class="form-textarea">
                <label for="${this.textareaName}">${this.textareaText} :</label>
                <textarea 
                    id="${this.textareaName}"
                    name="${this.textareaName}"
                    placeholder="${this.textareaPlaceholder}"></textarea>
            </div>
        `
    }

    getTextareaValue() {
        const shadow = this.shadowRoot
        const textarea = shadow.querySelector('textarea')
        return textarea.value
    }
}