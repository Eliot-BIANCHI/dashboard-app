import ComponentRegistry from './ComponentRegistry.js'

import iconsComponents from '../components/icons/index.js'

import AppNavbar from '../components/AppNavbar.js'

import DefaultForm, { FormField, FormTextarea } from '../components/forms/DefaultForm.js'

import KanbanBoard from '../components/tasks-manager/KanbanBoard.js'
import KanbanContainer from '../components/tasks-manager/KanbanContainer.js'
import KanbanTask from '../components/tasks-manager/KanbanTask.js'
import AddKanbanTask from '../components/tasks-manager/AddKanbanTask.js'

export default class Core {
    constructor() {
        ComponentRegistry.register(components)
    }
}

const components = [
    ...iconsComponents,
    { tagName: 'app-navbar', component: AppNavbar },

    { tagName: 'default-form', component: DefaultForm },
    { tagName: 'form-field', component: FormField },
    { tagName: 'form-textarea', component: FormTextarea },
    
    { tagName: 'kanban-board', component: KanbanBoard },
    { tagName: 'kanban-container', component: KanbanContainer },
    { tagName: 'kanban-task', component: KanbanTask },
    { tagName: 'add-kanban-task', component: AddKanbanTask },
]