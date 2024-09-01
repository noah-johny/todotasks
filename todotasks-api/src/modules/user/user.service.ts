import { prisma } from "../../config";
import { CreateUserBody } from "./user.schema";

export const userService = {
  createUser: async (data: CreateUserBody) => {
    return await prisma.user.create({ data });
  },

  getUserByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  deleteUser: async (userId: string) => {
    return await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  },

  getUsers: async () => {
    return await prisma.user.findMany();
  },
};
