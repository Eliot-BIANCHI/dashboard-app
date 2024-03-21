import { Status, type RouterContext, Context } from 'https://deno.land/x/oak@v14.0.0/mod.ts'

import TasksManager from './TasksManager.ts'

export async function getBoardTasks(ctx: RouterContext<'/api/tasks-manager/:id'>) {
    try {
        const id = parseInt(ctx.params.id)
        const tasks = await TasksManager.getBoardTasks(id)
        ctx.response.status = Status.OK
        ctx.response.body = tasks
    } catch(err) {
        console.log('Error :', err.message)
        ctx.response.status = Status.InternalServerError
    }
}

export async function addTaskToContainer(ctx: Context) {
    try {
		const bodyReq = ctx.request.body
		const value = await bodyReq.json()
        const newKanbanTask = await TasksManager.addTaskToContainer(value)
        
        if (newKanbanTask === null) {
            ctx.response.status = Status.BadRequest
            return
        }
        
        ctx.response.status = Status.OK
        ctx.response.body = newKanbanTask
    } catch(err) {
        console.log('Error :', err.message)
        ctx.response.status = Status.InternalServerError
    }
}

export async function deleteTask(ctx: RouterContext<'/api/tasks-manager/:taskId'>) {
    try {
        const taskId = parseInt(ctx.params.taskId)
        await TasksManager.deleteTask(taskId)
        
        ctx.response.status = Status.NoContent
    } catch(err) {
        console.log('Error :', err.message)
        ctx.response.status = Status.InternalServerError
    }
}