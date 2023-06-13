/* eslint-disable no-console */
import fs from "fs"; // ES6
import { v4 as uuid } from "uuid";
// const fs = require("fs"); - Como js importa
const DB_FILE_PATH = "./core/db";

type UUID = string;

interface ITodo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): ITodo {
  const todo: ITodo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: ITodo[] = [...read(), todo];

  // Precisa salvar o content no sistema
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  );
  return todo;
}

export function read(): Array<ITodo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }
  return db.todos;
}

function update(id: UUID, partialTodo: Partial<ITodo>): ITodo {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  );

  if (!updatedTodo) {
    throw new Error("Couldn't update");
  }

  return updatedTodo;
}

function updateContentById(id: UUID, content: string): ITodo {
  // atalho
  return update(id, {
    content,
  });
}

function deleteById(id: UUID) {
  const todos = read();

  const todosWithoutOne = todos.filter((todo) => {
    if (todo.id === id) {
      return false;
    }
    return true;
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos: todosWithoutOne,
      },
      null,
      2
    )
  );
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULATION]
// CLEAR_DB();
// create("Primeira TODO");
// const secondTodo = create("Segunda TODO");
// const thirdTodo = create("Terceira TODO");
// deleteById(secondTodo.id);
// // update(terceiraTodo.id, {
// //     content: "Terceira TODO com novo content"
// // });
// updateContentById(thirdTodo.id, "Atualizada!");
// const todos = read();
// console.log(todos);
// console.log(todos.length);
