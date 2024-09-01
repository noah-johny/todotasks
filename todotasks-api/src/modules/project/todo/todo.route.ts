import { todoSchema } from "./todo.schema";
import { todoController } from "./todo.controller";
import { FastifyInstance } from "fastify";

export default async function todoRoutes(app: FastifyInstance) {
  // Create Todo
  app.post(
    "/",
    {
      schema: {
        body: todoSchema.createTodo.properties.body,
      },
    },
    todoController.createTodo
  );

  // Get Todo
  app.get("/:todoId", todoController.getTodo);

  // Update Todo
  app.patch(
    "/:todoId",
    {
      schema: {
        body: todoSchema.createTodo.properties.body,
      },
    },
    todoController.updateTodo
  );

  // Delete Todo
  app.delete("/:todoId", todoController.deleteTodo);

  // Get Todos
  app.get("/", todoController.getTodos);
}
