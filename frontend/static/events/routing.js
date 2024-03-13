/**
 * 
 * @param {string} linkName - The name of the thing that is routing
 */
export function dispatchNavigate(shadow, linkName) {
    const links = shadow.querySelectorAll(`[data-link=${linkName}]`)
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            const navigateEvent = new CustomEvent('dashboard:navigate', {
                detail: {
                    url: link.href,
                    linkName
                }
            })
        
            document.dispatchEvent(navigateEvent)
        })
    })
}