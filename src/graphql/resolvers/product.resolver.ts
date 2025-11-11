import { Role } from "@prisma/client";
import { GraphQLContext } from "../../interfaces/context";
import { GraphQLError } from "graphql";
import { CreateProductArgs } from "../inputs";
import { validateCreateProductInput } from "../validators/product.validators";

export const productResolvers = {
  Query: {
    products: async (_: unknown, __: unknown, { prisma }: GraphQLContext) => {
      return prisma.product.findMany();
    },
    product: async (_: unknown, args: any, { prisma }: GraphQLContext) => {
      return prisma.product.findUnique({
        where: { id: args.id },
        include: { category: true },
      });
    },
  },
  Mutation: {
    createProduct: async (
      _: unknown,
      args: CreateProductArgs,
      { prisma, user }: GraphQLContext
    ) => {
      // solo admin puede crear Categoria
      if (!user || user.role !== Role.ADMIN) {
        throw new GraphQLError("Not authorized", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const { name, description, price, imageUrl, categoryId } = args;

      validateCreateProductInput(name, description, price, imageUrl);

      // validate if the name already exists
      const existingProduct = await prisma.product.findFirst({
        where: { name },
      });
      if (existingProduct) {
        throw new Error("Product already exists");
      }

      // validate if the category exists
      const existingCategory = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!existingCategory) {
        throw new Error("Category does not exist");
      }

      const savedProduct = await prisma.product.create({
        data: { name, description, price, imageUrl, categoryId },
      });

      return { ...savedProduct, message: "Product created successfully." };
    },
  },
};
