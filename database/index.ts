import { Client, QueryObjectResult } from "https://deno.land/x/postgres@v0.19.3/mod.ts"

const config = {
    applicationName: "dashboard_app",
    connection: {
        attempts: 1,
    },
    database: "dashboard_db",
    hostname: "localhost",
    password: "ocu6tY5_*",
    port: 5432,
    user: "eliot",
    tls: {
        enforce: false
    }
}

const client = new Client(config)

export async function getLastInsertedId(tableName: string) {
    const { rows }: QueryObjectResult = await client.queryObject(/*sql*/`SELECT MAX(id) FROM ${tableName};`)
    return rows[0].max
}

export default client