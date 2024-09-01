import { prisma } from "../../config";
import { ProjectBody } from "./project.schema";

export const projectService = {
  // Create Project
  createProject: async (data: ProjectBody, userId: string) => {
    return await prisma.project.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  },

  // Get Project by ID
  getProjectById: async (id: string) => {
    return await prisma.project.findUnique({
      where: {
        id,
      },
    });
  },

  // Update Project by ID
  updateProjectById: async (id: string, data: ProjectBody) => {
    return await prisma.project.update({
      where: {
        id,
      },
      data,
    });
  },

  // Delete Project by ID
  deleteProjectById: async (id: string) => {
    return await prisma.project.delete({
      where: {
        id,
      },
    });
  },

  // Get Projects by User ID
  getProjectsByUserId: async (userId: string) => {
    return await prisma.project.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
