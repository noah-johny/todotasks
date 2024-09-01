import { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import formDataPlugin from "@fastify/formbody";
import { envConstants } from "../constants/env.constants";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { app } from "../server";

export const registerPlugins = () => {
  app.register(formDataPlugin);

  // CORS Setup
  app.register(cors, {
    origin: envConstants.WEBSITE_URL || "http://localhost:3000",
    credentials: true,
  });

  // JWT Setup
  app
    .register(fastifyJwt, {
      secret: envConstants.JWT_SECRET,
      cookie: {
        cookieName: "refresh_token",
        signed: false,
      },
    })
    .decorate(
      "authenticate",
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
      }
    );

  // Cookie Setup
  app.register(fastifyCookie);
};
