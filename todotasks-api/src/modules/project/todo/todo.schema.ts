import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { Schema } from "../../../types/global";
import { ProjectParamsSchema } from "../project.schema";

const CreateTodoBodySchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255).optional(),
});

const UpdateTodoBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  status: z.boolean().optional(),
});

const TodoParamsSchema = ProjectParamsSchema.extend({
  todoId: z.string().uuid(),
});

export const todoSchema: Schema = {
  createTodo: {
    $id: "createTodo",
    ...zodToJsonSchema(
      z.object({
        body: CreateTodoBodySchema,
      })
    ),
  },

  updateTodo: {
    $id: "updateTodo",
    ...zodToJsonSchema(
      z.object({
        body: UpdateTodoBodySchema,
      })
    ),
  },
};

type CreateTodoBody = z.infer<typeof CreateTodoBodySchema>;
type UpdateTodoBody = z.infer<typeof UpdateTodoBodySchema>;
type TodoParams = z.infer<typeof TodoParamsSchema>;

export { CreateTodoBody, UpdateTodoBody, TodoParams };
