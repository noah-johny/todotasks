import { prisma } from "../../../config";
import { CreateTodoBody, UpdateTodoBody } from "./todo.schema";

export const todoService = {
  // Create Todo
  createTodo: async (data: CreateTodoBody, projectId: string) => {
    return await prisma.todo.create({
      data: {
        ...data,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  },

  // Get Todo by ID
  getTodoById: async (id: string) => {
    return await prisma.todo.findUnique({
      where: {
        id,
      },
    });
  },

  // Update Todo by ID
  updateTodoById: async (id: string, data: UpdateTodoBody) => {
    return await prisma.todo.update({
      where: {
        id,
      },
      data,
    });
  },

  // Delete Todo by ID
  deleteTodoById: async (id: string) => {
    return await prisma.todo.delete({
      where: {
        id,
      },
    });
  },

  // Get Todos by Project ID
  getTodosByProjectId: async (projectId: string) => {
    return await prisma.todo.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
