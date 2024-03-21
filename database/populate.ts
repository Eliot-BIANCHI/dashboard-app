import client from './index.ts'

await client.queryArray(/*sql*/`DROP TABLE IF EXISTS kanban_task;`)

await client.queryArray(/*sql*/`DROP TABLE IF EXISTS kanban_container;`)

await client.queryArray(/*sql*/`DROP TABLE IF EXISTS kanban_board;`)


await client.queryArray(/*sql*/`
    CREATE TABLE IF NOT EXISTS kanban_board (
        id SERIAL PRIMARY KEY,
        title VARCHAR(31)
    );
`)

await client.queryArray(/*sql*/`
    CREATE TABLE IF NOT EXISTS kanban_container (
        id SERIAL PRIMARY KEY,
        title VARCHAR(31),
        board_id INTEGER REFERENCES kanban_board (id)
    );
`)

await client.queryArray(/*sql*/`
    CREATE TABLE IF NOT EXISTS kanban_task (
        id SERIAL PRIMARY KEY,
        content VARCHAR(255),
        container_id INTEGER REFERENCES kanban_container (id)
    );
`)

await client.queryArray(/*sql*/`
    INSERT INTO kanban_board (title)
    VALUES
        ('Group project'),
        ('My board');
`)

await client.queryArray(/*sql*/`
    INSERT INTO kanban_container (title, board_id)
    VALUES
        ('Started', 1),
        ('On going', 1);
`)

await client.queryArray(/*sql*/`
    INSERT INTO kanban_task (content, container_id)
    VALUES
        ('Do some sport', 1),
        ('Do Homework', 1),
        ('Take kids from school', 2),
        ('Learn piano', 2);
`)