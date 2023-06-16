import { read } from "@db-crud-todo";

interface ITodoRepositoryGetParams {
  page?: number;
  limit?: number;
}

interface ITodoRepositoryGetOutput {
  todos: ITodo[];
  total: number;
  pages: number;
}

function get({
  page,
  limit,
}: ITodoRepositoryGetParams = {}): ITodoRepositoryGetOutput {
  const currentPage = page || 1;
  const currentLimit = limit || 10;
  const ALL_TODOS = read();

  // Receita de bolo paginação
  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit;
  const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
  const totalPages = Math.ceil(ALL_TODOS.length / currentLimit);

  return {
    total: ALL_TODOS.length,
    todos: paginatedTodos,
    pages: totalPages,
  };
}

export const todoRepository = {
  get,
};

// Model ou Schema
interface ITodo {
  id: string;
  content: string;
  date: string;
  done: boolean;
}
