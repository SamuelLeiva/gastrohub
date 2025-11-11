import { GraphQLContext } from "../../contexts/context";

export const productQueries = {
    products: async (_: unknown, __: unknown, { prisma }: GraphQLContext) => {
      const productList = await prisma.product.findMany();
      return productList;
    },
    product: async (_: unknown, args: any, { prisma }: GraphQLContext) => {
      const product = await prisma.product.findUnique({
        where: { id: args.id },
        include: { category: true },
      });
      return product;
    },
  };
