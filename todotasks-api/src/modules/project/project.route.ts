import { addSchemas } from "../../config/routes";
import { todoSchema } from "./todo/todo.schema";
import { projectController } from "./project.controller";
import { projectSchema } from "./project.schema";
import todoRoutes from "./todo/todo.route";
import { FastifyInstance } from "fastify";

export default async function projectRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  // Adding Todo Schema and registering Todo Routes
  addSchemas([todoSchema]);
  app.register(todoRoutes, { prefix: "/:projectId/todo" });

  // Create Project
  app.post(
    "/",
    {
      schema: {
        body: projectSchema.createProject.properties.body,
      },
    },
    projectController.createProject
  );

  // Get Project by ID
  app.get("/:projectId", projectController.getProjectById);

  // Update Project by ID
  app.patch(
    "/:projectId",
    {
      schema: {
        body: projectSchema.createProject.properties.body,
      },
    },
    projectController.updateProjectById
  );

  // Delete Project by ID
  app.delete("/:projectId", projectController.deleteProjectById);

  // Get Projects by User ID
  app.get("/", projectController.getProjectsByUserId);
}
