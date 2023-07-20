const BASE_URL = "http://localhost:3000";

describe("/ - Todos feed", () => {
  it("when load, renders the page", () => {
    cy.visit(BASE_URL);
  });
  it.only("when create a new todo, it must appears in the screen", () => {
    // 0 - usar INTERSEPT pra testar só no front
    cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: "fc66415e-dab0-4383-a6ec-9b214752cff6",
            date: "2023-07-20T17:50:49.612Z",
            content: "Test todo",
            done: false,
          },
        },
      });
    }).as("createTodo");

    // 1 - Abrir a página
    cy.visit(BASE_URL);
    // 2 - Selecionar o input de criar nova todo
    const $inputAddTodo = cy.get("input[name='add-todo']");
    // 3 - Digitar no input de criar nova todo
    $inputAddTodo.type("Test todo");
    // 4 - Clicar no botão de criar nova todo
    cy.get("[aria-label='Adicionar novo item']").click();
    // 5 - Checar se na página surgiu o novo elemento
    cy.get("table > tbody").contains("Test todo");
  });
});
