export default class ComponentRegistry {
    static register(components) {
        components.forEach(component => {
            self.customElements.define(component.tagName, component.component)
        })
    }
}