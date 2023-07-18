import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // Dynamic API route from Next docs (we started with this)
  // const todoId = req.query.id;
  // res.end(`Post: ${todoId}`);

  if (request.method === "DELETE") {
    todoController.deleteById(request, response);
    return;
  }

  response.status(405).json({
    error: {
      message: "Method not allowed",
    },
  });
}
