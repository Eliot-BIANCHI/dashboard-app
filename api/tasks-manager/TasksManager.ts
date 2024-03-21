import client, { getLastInsertedId } from '../../database/index.ts'

type AddKanbanTask = {
    content: string,
    containerId: number
}

export default class TasksManager {

    static async getBoardTasks(boardId: number) {
        const result = await client.queryObject({
            camelCase: true,
            text : /*sql*/`
                SELECT kanban_task.id, content, kanban_container.id AS container_id, 
                    kanban_container.title as container_title
                FROM kanban_board
                INNER JOIN kanban_container
                ON kanban_board.id = kanban_container.board_id
                INNER JOIN kanban_task
                ON kanban_container.id = kanban_task.container_id
                WHERE board_id = $1;`,
            args: [boardId]
        })
        return result.rows
    }

    static async addTaskToContainer({ content, containerId }: AddKanbanTask) {
        const { rowCount } = await client.queryObject(/*sql*/`
            INSERT INTO kanban_task(content, container_id)
            VALUES ($1, $2)
        `, [content, containerId])

        if (rowCount === 0) return

        const id = await getLastInsertedId('kanban_task')
        
        return { id, content }
    }

    static async deleteTask(taskId: number) {
        await client.queryObject(/*sql*/`DELETE FROM kanban_task WHERE id = $1`, [taskId])
    }
}