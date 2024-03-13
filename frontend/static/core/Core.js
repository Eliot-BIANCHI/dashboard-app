import ComponentRegistry from './ComponentRegistry.js'

import iconsComponents from '../components/icons/index.js'

import AppNavbar from '../components/AppNavbar.js'

export default class Core {
    constructor() {
        ComponentRegistry.register(components)
    }
}

const components = [
    ...iconsComponents,
    { tagName: 'app-navbar', component: AppNavbar }
]