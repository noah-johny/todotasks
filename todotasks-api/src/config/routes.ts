import projectRoutes from "../modules/project/project.route";
import { projectSchema } from "../modules/project/project.schema";
import userRoutes from "../modules/user/user.route";
import { userSchema } from "../modules/user/user.schema";
import { app } from "../server";

export const addSchemas = (schemaModules: Array<any>) => {
  schemaModules.forEach((schemas) => {
    Object.keys(schemas).forEach((key) => {
      const schema = schemas[key];

      app.addSchema(schema);
    });
  });
};

export const registerRoutes = () => {
  const schemaModules = [userSchema, projectSchema];

  addSchemas(schemaModules);

  app.register(userRoutes, { prefix: "/api/users" });
  app.register(projectRoutes, { prefix: "/api/projects" });
};
