import { Router } from 'https://deno.land/x/oak@v14.0.0/mod.ts'

import { getBoardTasks, addTaskToContainer, deleteTask } from './controllers.ts'

const router = new Router()

router.get('/api/tasks-manager/:id', getBoardTasks)

router.post('/api/tasks-manager', addTaskToContainer)

router.delete('/api/tasks-manager/:taskId', deleteTask)

export default router