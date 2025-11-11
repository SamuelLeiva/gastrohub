import { Role } from "@prisma/client";
import { GraphQLContext } from "../../interfaces/context";
import { CreateCategoryArgs } from "../inputs/category.inputs";
import { validateCreateCategoryInput } from "../validators/category.validator";
import { GraphQLError } from "graphql";

export const categoryResolvers = {
  Query: {
    categories: async (_: unknown, __: unknown, { prisma }: GraphQLContext) => {
      return prisma.category.findMany();
    },
  },
  Mutation: {
    createCategory: async (
      _: unknown,
      args: CreateCategoryArgs,
      { prisma, user }: GraphQLContext
    ) => {
      // solo admin puede crear Categoria
      if (!user || user.role !== Role.ADMIN) {
        throw new GraphQLError("Not authorized", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const { name, description } = args;

      validateCreateCategoryInput(name, description);

      // validate if the name already exists
      const existingCategory = await prisma.category.findUnique({
        where: { name },
      });
      if (existingCategory) {
        throw new Error("Category already exists");
      }

      const savedCategory = await prisma.category.create({
        data: { name, description },
      });

      return { ...savedCategory, message: "Category created successfully." };
    },
  },
};
