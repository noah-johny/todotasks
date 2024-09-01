import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateTodoBody,
  TodoParams,
  UpdateTodoBody,
} from "./todo.schema";
import { todoService } from "./todo.service";

export const todoController = {
  // Create Todo
  createTodo: async (
    request: FastifyRequest<{ Body: CreateTodoBody; Params: TodoParams }>,
    reply: FastifyReply
  ) => {
    const data = request.body;
    const { projectId } = request.params;

    try {
      const newTodo = await todoService.createTodo(data, projectId);
      reply.status(201).send(newTodo);
    } catch (err) {
      reply.status(500).send({ message: "Internal Server Error", err });
    }
  },

  // Get Todo
  getTodo: async (
    request: FastifyRequest<{ Params: TodoParams }>,
    reply: FastifyReply
  ) => {
    const { todoId } = request.params;

    try {
      const todo = await todoService.getTodoById(todoId);
      reply.send(todo);
    } catch (err) {
      reply.status(500).send({ message: "Internal Server Error", err });
    }
  },

  // Update Todo
  updateTodo: async (
    request: FastifyRequest<{ Body: UpdateTodoBody; Params: TodoParams }>,
    reply: FastifyReply
  ) => {
    const data = request.body;
    const { todoId } = request.params;

    try {
      const updatedTodo = await todoService.updateTodoById(todoId, data);
      reply.send(updatedTodo);
    } catch (err) {
      reply.status(500).send({ message: "Internal Server Error", err });
    }
  },

  // Delete Todo
  deleteTodo: async (
    request: FastifyRequest<{ Params: TodoParams }>,
    reply: FastifyReply
  ) => {
    const { todoId } = request.params;

    try {
      await todoService.deleteTodoById(todoId);
      reply.send({ message: "Todo deleted successfully" });
    } catch (err) {
      reply.status(500).send({ message: "Internal Server Error", err });
    }
  },

  // Get Todos
  getTodos: async (
    request: FastifyRequest<{ Params: TodoParams }>,
    reply: FastifyReply
  ) => {
    const { projectId } = request.params;

    try {
      const todos = await todoService.getTodosByProjectId(projectId);
      reply.send(todos);
    } catch (err) {
      reply.status(500).send({ message: "Internal Server Error", err });
    }
  },
};
