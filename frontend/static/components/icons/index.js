import Home from './navigation/Home.js'
import Scheduler from './navigation/Scheduler.js'
import TasksManager from './navigation/TasksManager.js'
import ChevronRight from './chevrons/ChevronRight.js'
import Settings from './navigation/Settings.js'

import Email from './forms/Email.js'
import LockedKeyhole from './forms/LockedKeyhole.js'
import UnlockedKeyhole from './forms/UnlockedKeyhole.js'

const iconsComponents = [
    {
        tagName: 'icon-home',
        component: Home
    },
    {
        tagName: 'icon-scheduler',
        component: Scheduler
    },
    {
        tagName: 'icon-tasks-manager',
        component: TasksManager
    },
    {
        tagName: 'icon-chevron-right',
        component: ChevronRight
    },
    {
        tagName: 'icon-settings',
        component: Settings
    },
    {
        tagName: 'icon-email',
        component: Email
    },
    {
        tagName: 'icon-unlocked-keyhole',
        component: UnlockedKeyhole
    },
    {
        tagName: 'icon-locked-keyhole',
        component: LockedKeyhole
    },
]

export default iconsComponents