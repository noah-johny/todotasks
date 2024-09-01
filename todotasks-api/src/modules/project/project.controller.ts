import { FastifyReply, FastifyRequest } from "fastify";
import { projectService } from "./project.service";
import { ProjectBody, ProjectParams } from "./project.schema";

export const projectController = {
  // Create Project
  createProject: async (
    request: FastifyRequest<{ Body: ProjectBody }>,
    reply: FastifyReply
  ) => {
    const data = request.body;
    const user = (request.user as any).id;

    try {
      const newProject = await projectService.createProject(data, user);
      reply.status(201).send(newProject);
    } catch (error) {
      reply.status(500).send({ message: "Internal Server Error" });
    }
  },

  // Get Project by Id
  getProjectById: async (
    request: FastifyRequest<{ Params: ProjectParams }>,
    reply: FastifyReply
  ) => {
    const { projectId } = request.params;

    try {
      const project = await projectService.getProjectById(projectId);
      reply.send(project);
    } catch (err) {
      reply.status(500).send({ message: "Internal Server Error", err });
    }
  },

  // Update Project by Id
  updateProjectById: async (
    request: FastifyRequest<{
      Body: ProjectBody;
      Params: ProjectParams;
    }>,
    reply: FastifyReply
  ) => {
    const data = request.body;
    const { projectId } = request.params;

    try {
      const updatedProject = await projectService.updateProjectById(
        projectId,
        data
      );
      reply.send(updatedProject);
    } catch (err) {
      reply.status(500).send({ message: "Internal Server Error", err });
    }
  },

  // Delete Project by Id
  deleteProjectById: async (
    request: FastifyRequest<{ Params: ProjectParams }>,
    reply: FastifyReply
  ) => {
    const { projectId } = request.params;

    try {
      const project = await projectService.deleteProjectById(projectId);
      reply.send(project);
    } catch (err) {
      reply.status(500).send({ message: "Internal Server Error", err });
    }
  },

  // Get Projects by User Id
  getProjectsByUserId: async (
    request: FastifyRequest<{ Params: ProjectParams }>,
    reply: FastifyReply
  ) => {
    const { userId } = request.params;

    try {
      const projects = await projectService.getProjectsByUserId(userId);
      reply.send(projects);
    } catch (err) {
      reply.status(500).send({ message: "Internal Server Error", err });
    }
  },
};
