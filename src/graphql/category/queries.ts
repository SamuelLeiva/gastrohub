import { GraphQLContext } from "../../contexts/context";

export const categoryQueries = {
  categories: async (_: unknown, __: unknown, { prisma }: GraphQLContext) => {
    return prisma.category.findMany();
  },
};
