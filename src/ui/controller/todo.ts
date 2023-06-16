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

export const todoController = {
  get,
};
