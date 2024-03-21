export function handleNonEmptyInput(shadowRoot) {
    const input = shadowRoot.querySelector('input')
    input.addEventListener('change', e => {
        const value = e.target.value
        if (value.length === 0) {
            input.classList.remove('non-empty')
        } else {
            input.classList.add('non-empty')
        }
    })
}