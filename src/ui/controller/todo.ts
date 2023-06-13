import { todoRepository } from "@ui/repository/todo";

interface ITodoControllerGetParams {
  page?: number;
}

async function get({ page }: ITodoControllerGetParams = {}) {
  return todoRepository.get({
    page: page || 1,
    limit: 10,
  });
}

export const todoController = {
  get,
};
