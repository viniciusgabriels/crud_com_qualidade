interface ITodoRepositoryGetParams {
  page: number;
  limit: number;
}
interface ITodoRepositoryGetOutput {
  todos: ITodo[];
  total: number;
  pages: number;
}
function get({
  page,
  limit,
}: ITodoRepositoryGetParams): Promise<ITodoRepositoryGetOutput> {
  return fetch("/api/todos").then(async (todosFromServer) => {
    const todosString = await todosFromServer.text();
    const todosFromServerJson = JSON.parse(todosString).todos;

    const ALL_TODOS = todosFromServerJson;
    // Receita de bolo paginação
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_TODOS.length / limit);

    return {
      todos: paginatedTodos,
      total: totalPages,
      pages: 1,
    };
  });
}

export const todoRepository = {
  get,
};

// Model ou Schema
interface ITodo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}
