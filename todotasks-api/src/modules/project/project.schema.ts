import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Schema } from "../../types/global";
import { UserParamsSchema } from "../user/user.schema";

const CreateProjectBodySchema = z.object({
  title: z.string().min(1).max(255),
});

export const ProjectParamsSchema = UserParamsSchema.extend({
  projectId: z.string().uuid(),
});

export const projectSchema: Schema = {
  createProject: {
    $id: "createProject",
    ...zodToJsonSchema(
      z.object({
        body: CreateProjectBodySchema,
      })
    ),
  },
};

type ProjectBody = z.infer<typeof CreateProjectBodySchema>;
type ProjectParams = z.infer<typeof ProjectParamsSchema>;

export { ProjectBody, ProjectParams };
