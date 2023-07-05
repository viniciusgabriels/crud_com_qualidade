import { todoRepository } from "@ui/repository/todo";

interface ITodoControllerGetParams {
  page: number;
}

async function get(params: ITodoControllerGetParams) {
  return todoRepository.get({
    page: params.page,
    limit: 2,
  });
}

function filterTodosByContent<Todo>(
  search: string,
  todos: Array<Todo & { content: string }>
): Todo[] {
  const homeTodos = todos.filter((todo) => {
    const searchNormalized = search.toLowerCase();
    const contentNormalized = todo.content.toLowerCase();
    return contentNormalized.includes(searchNormalized);
  });

  return homeTodos;
}

interface ITodoControllerCreateParams {
  content?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (todo: any) => void;
  onError: () => void;
}

function create({ content, onSuccess, onError }: ITodoControllerCreateParams) {
  //fail fast
  if (!content) {
    onError();
    return;
  }
  //vai vir do Repository
  const todo = {
    id: "123456",
    content,
    date: new Date(),
    done: false,
  };

  onSuccess(todo);
}

export const todoController = {
  get,
  filterTodosByContent,
  create,
};
