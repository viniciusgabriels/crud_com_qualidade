import { todoRepository } from "@ui/repository/todo";
import { ITodo } from "@ui/schema/todo";
import { z as schema } from "zod";

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
  onSuccess: (todo: ITodo) => void;
  onError: (customMessage?: string) => void;
}

function create({ content, onSuccess, onError }: ITodoControllerCreateParams) {
  //fail fast
  const parsedParams = schema.string().nonempty().safeParse(content);
  if (!parsedParams.success) {
    onError("Você precisa prover um conteúdo para criar uma TODO!");
    return;
  }

  todoRepository
    .createByContent(parsedParams.data)
    .then((newTodo) => {
      onSuccess(newTodo);
    })
    .catch(() => {
      onError();
    });
}

interface ITodoControllerToggleDoneParams {
  id: string;
  updateTodoOnScreen: () => void;
  onError: () => void;
}

function toggleDone({
  id,
  updateTodoOnScreen,
  onError,
}: ITodoControllerToggleDoneParams) {
  // Optimistic Update:
  // updateTodoOnScreen();
  // todoRepository.toggleDone(id);

  // Update Real:
  todoRepository
    .toggleDone(id)
    .then(() => {
      updateTodoOnScreen();
    })
    .catch(() => {
      onError();
    });
}

export const todoController = {
  get,
  filterTodosByContent,
  create,
  toggleDone,
};
