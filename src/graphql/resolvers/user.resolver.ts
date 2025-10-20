import { GraphQLContext } from "../../interfaces/context";

export const userResolvers = {
  Query: {
    users: async (
      _: unknown,
      __: unknown,
      { prisma }: GraphQLContext
    ) => {
      return prisma.user.findMany();
    },
  },

  Mutation: {
    createUser: async (
      _: unknown,
      args: { name: string; email: string; password: string },
      { prisma }: GraphQLContext
    ) => {
      const { name, email, password } = args;
      return prisma.user.create({
        data: { name, email, password },
      });
    },
  },
};