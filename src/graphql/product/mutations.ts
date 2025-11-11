import { Role } from "@prisma/client";
import { GraphQLContext } from "../../contexts/context";
import { GraphQLError } from "graphql";
import { CreateProductArgs } from "./inputs";
import { validateCreateProductInput } from "./validators";

export const productMutations = {
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
  deleteProduct: async (
    _: unknown,
    { id }: any,
    { prisma, user }: GraphQLContext
  ) => {
    // verificar si esta auth y de tipo ADMIN
    if (!user || user.role !== Role.ADMIN) {
      throw new GraphQLError("Not authorized", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    // verificar si existe el producto
    const existingProduct = await prisma.product.findFirst({
      where: { id },
    });
    if (!existingProduct) {
      throw new Error("Product does not exist");
    }

    //borrar
    const deleted = await prisma.product.delete({
      where: { id },
    });
    return deleted;
  },
  updateProduct: async (
    _: unknown,
    args: any,
    { prisma, user }: GraphQLContext
  ) => {
    // verificar si esta auth y de tipo ADMIN
    if (!user || user.role !== Role.ADMIN) {
      throw new GraphQLError("Not authorized", {
        extensions: { code: "FORBIDDEN" },
      });
    }

    const { id, name, description, price, imageUrl, categoryId } = args;

    // verificar el input
    validateCreateProductInput(name, description, price, imageUrl);

    // validate if the category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!existingCategory) {
      throw new Error("Category does not exist");
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        imageUrl,
        categoryId,
      },
    });

    return updatedProduct;
  },
};
