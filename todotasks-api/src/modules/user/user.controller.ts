import { FastifyReply, FastifyRequest } from "fastify";
import { userService } from "./user.service";
import { LoginUserBody, RegisterUserBody } from "./user.schema";
import { hashPassword, verifyPassword } from "../../utils/auth";
import { User } from "@prisma/client";
import { generateTokens } from "../../utils/auth";
import { app } from "../../server";

export const userController = {
  // Register User
  regsiterUser: async (
    request: FastifyRequest<{ Body: RegisterUserBody }>,
    reply: FastifyReply
  ) => {
    const data = request.body;

    try {
      const existingUser = await userService.getUserByEmail(data.email);

      // Check if user already exists
      if (existingUser) {
        reply.status(400).send({ message: "User already exists." });
        return;
      } else {
        const { hash, salt } = hashPassword(data.password);

        // Create new user
        const newUser = await userService.createUser({
          ...data,
          password: hash,
          salt,
        });

        reply.status(201).send(newUser);
      }
    } catch (error) {
      reply.status(500).send({ message: "Internal Server Error" });
    }
  },

  // Login User
  loginUser: async (
    request: FastifyRequest<{ Body: LoginUserBody }>,
    reply: FastifyReply
  ) => {
    const data = request.body;

    try {
      const existingUser = await userService.getUserByEmail(data.email);

      // Check if user exists
      if (!existingUser) {
        reply.status(401).send({ message: "User does not exist." });
        return;
      } else {
        // Check if password is valid
        const isValidPassword = verifyPassword(
          data.password,
          existingUser.password,
          existingUser.salt
        );

        if (!isValidPassword) {
          reply.status(401).send({ message: "Invalid credentials" });
          return;
        }

        const { password, salt, ...user } = existingUser;

        const tokens = generateTokens(user);

        // Check if token generation failed
        if (!tokens) {
          reply.status(401).send({ message: "Token generation failed" });
        } else {
          const { accessToken, refreshToken } = tokens;

          // Send tokens as cookies
          reply
            .setCookie("refresh_token", refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production" || true,
              path: "/",
            })
            .send({ accessToken });
        }
      }
    } catch (error) {
      reply.status(500).send({ message: "Internal Server Error" });
    }
  },

  // Logout User
  logoutUser: async (request: FastifyRequest, reply: FastifyReply) => {
    reply
      .clearCookie("refresh_token")
      .code(200)
      .send({ message: "Logged out successfully" });
  },

  // Refresh Token
  refreshToken: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { refresh_token } = request.cookies;

      if (!refresh_token) {
        return reply
          .status(401)
          .send({ message: "Refresh token not provided" });
      }

      const decoded = app.jwt.verify(refresh_token);
      const existingUser = await userService.getUserByEmail(
        (decoded as any).email
      );

      if (!existingUser) {
        return reply.status(401).send({ message: "Invalid refresh token" });
      }

      const { accessToken, refreshToken } = generateTokens(existingUser);
      reply
        .setCookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
        .send({ accessToken });
    } catch (err) {
      reply.status(401).send({ message: "Invalid refresh token" });
    }
  },

  // Get Users
  getUsers: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users: User[] = await userService.getUsers();
      reply.code(200).send(users);
    } catch (error) {
      reply.status(500).send({ message: "Internal Server Error" });
    }
  },

  // Delete User
  deleteUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as any;

    try {
      await userService.deleteUser(userId);

      reply.code(200).send({ message: "User deleted successfully" });
    } catch (error) {
      reply.status(500).send({ message: "Internal Server Error" });
    }
  },
};
