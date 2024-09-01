import { FastifyInstance } from "fastify";
import { userController } from "./user.controller";
import { userSchema } from "./user.schema";

export default async function userRoutes(app: FastifyInstance) {
  // Register User
  app.post(
    "/",
    {
      schema: {
        body: userSchema.registerUser.properties.body,
      },
    },
    userController.regsiterUser
  );

  // Login User
  app.post(
    "/login",
    {
      schema: {
        body: userSchema.loginUser.properties.body,
      },
    },
    userController.loginUser
  );

  // Logout User
  app.get("/logout", userController.logoutUser);

  // Refresh Token
  app.post(
    "/refresh-token",
    {
      preHandler: [app.authenticate],
    },
    userController.refreshToken
  );

  // Get Users
  app.get(
    "/",
    {
      preHandler: [app.authenticate],
    },
    userController.getUsers
  );

  // Delete User
  app.delete(
    "/:userId",
    {
      preHandler: [app.authenticate],
    },
    userController.deleteUser
  );
}
