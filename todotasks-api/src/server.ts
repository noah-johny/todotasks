import Fastify from "fastify";
import { envConstants } from "./constants/env.constants";
import { prisma, registerPlugins, registerRoutes } from "./config";

// Fastify Instance
export const app = Fastify();

// Test Route
app.get("/ping", (request, reply) => {
  reply.send("pong");
});

// Connect Database
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Start Server
const startServer = async () => {
  try {
    await app.listen({ port: envConstants.PORT });
    console.log(`Server started listening on port: ${envConstants.PORT}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

// Start Application
const start = async () => {
  registerPlugins();
  await connectDB();
  registerRoutes();
  startServer();
};

start();
