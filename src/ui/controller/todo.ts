async function get() {
  return fetch("/api/todos").then(async (todosFromServer) => {
    const todosString = await todosFromServer.text();
    const todosJson = JSON.parse(todosString).todos;
    return todosJson;
  });
}

export const todoController = {
  get,
};
