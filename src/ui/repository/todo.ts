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
    const todosFromServerJson = parseTodosFromServer(
      JSON.parse(todosString)
    ).todos;

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

function parseTodosFromServer(responseBody: unknown): { todos: Array<ITodo> } {
  if (
    responseBody !== null &&
    typeof responseBody === "object" &&
    "todos" in responseBody &&
    Array.isArray(responseBody.todos)
  ) {
    return {
      todos: responseBody.todos.map((todo: unknown) => {
        if (todo === null && typeof todo !== "object") {
          throw new Error("Invalid todo from API");
        }

        const { id, content, done, date } = todo as {
          id: string;
          content: string;
          done: string;
          date: string;
        };
        return {
          id,
          content,
          done: String(done).toLowerCase() === "true",
          date: new Date(date),
        };
      }),
    };
  }

  return {
    todos: [],
  };
}
