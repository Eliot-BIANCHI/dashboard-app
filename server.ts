import { Application, Context, send } from 'https://deno.land/x/oak@v14.0.0/mod.ts'

import client from './database/index.ts'

import tasksManager from './api/tasks-manager/routes.ts'

const app = new Application()

app.use(tasksManager.routes())
app.use(tasksManager.allowedMethods())

app.use(async (ctx, next) => {
    if (ctx.request.url.pathname.startsWith('/static')) {
        await next()
    } else {
        const html = await Deno.readTextFile(`${Deno.cwd()}/frontend/index.html`)
        ctx.response.headers.set('Content-Type', 'text/html')
        ctx.response.body = html
    }
})

app.use(async (ctx, next) => {
    if (await checkFileExist(ctx)) {
        await send(ctx, ctx.request.url.pathname, {
            root: `${Deno.cwd()}/frontend`
        })
    } else {
        next()
    }
})

async function checkFileExist(ctx: Context) {
    const path = `${Deno.cwd()}/frontend${ctx.request.url.pathname}`
    try {
        const fileInfo = await Deno.lstat(path)
        return fileInfo.isFile
    } catch {
        return false
    }
}

const SERVER_PORT = Deno.env.get('SERVER_PORT')
const port = SERVER_PORT === undefined ? 3000 : parseInt(SERVER_PORT)

await client.connect()
await app.listen({ port })