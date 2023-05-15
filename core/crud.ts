import fs from "fs"; // ES6
import { v4 as uuid } from 'uuid';
// const fs = require("fs"); - Como js importa
const DB_FILE_PATH = "./core/db";

interface Todo {
    id: string;
    date: string;
    content: string;
    done: boolean;
}

function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(),
        content: content,
        done: false,
    }

    const todos: Todo[] = [
        ...read(),
        todo,
    ];

    // Precisa salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos,
    }, null, 2));
    return todo;
}

function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    if (!db.todos) {
        return [];
    }
    return db.todos;
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
    let updatedTodo;
    const todos = read();
    todos.forEach((currentTodo) => {
        const isToUpdate = currentTodo.id === id;
        if (isToUpdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo);
        }
    });

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos,
    }, null, 2));

    if (!updatedTodo) {
        throw new Error("Couldn't update");
    }

    return updatedTodo;
}

function updateContentById(id: string, content: string): Todo { // atalho
    return update(id, {
        content,
    })
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULATION]
CLEAR_DB();
create("Primeira TODO");
create("Segunda TODO");
const terceiraTodo = create("Terceira TODO");
// update(terceiraTodo.id, {
//     content: "Terceira TODO com novo content"
// });
updateContentById(terceiraTodo.id, "Atualizada!");
console.log(read());