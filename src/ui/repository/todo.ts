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
  return fetch(`/api/todos?page=${page}&limit=${limit}`).then(
    async (todosFromServer) => {
      const todosString = await todosFromServer.text();
      const responseParsed = parseTodosFromServer(JSON.parse(todosString));

      return {
        total: responseParsed.total,
        todos: responseParsed.todos,
        pages: responseParsed.pages,
      };
    }
  );
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

function parseTodosFromServer(responseBody: unknown): {
  total: number;
  pages: number;
  todos: Array<ITodo>;
} {
  if (
    responseBody !== null &&
    typeof responseBody === "object" &&
    "todos" in responseBody &&
    "total" in responseBody &&
    "pages" in responseBody &&
    Array.isArray(responseBody.todos)
  ) {
    return {
      total: Number(responseBody.total),
      pages: Number(responseBody.pages),
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
    pages: 1,
    total: 0,
    todos: [],
  };
}
