import { Role } from "@prisma/client";
import { GraphQLContext } from "../../contexts/context";
import { CreateCategoryArgs } from "./inputs";
import { GraphQLError } from "graphql";
import { validateCreateCategoryInput } from "./validators";

export const categoryMutations = {
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
};
