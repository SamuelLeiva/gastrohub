import { GraphQLContext } from "../../contexts/context";

export const userQueries = {
    users: async (_: unknown, __: unknown, { prisma }: GraphQLContext) => {
      return prisma.user.findMany();
    },
    me: async (_: unknown, __: unknown, { user }: GraphQLContext) => {
      // solo el propio usuario autenticado puede ver su información, no otros usuarios
      // al tener el user en el context luego de hacer login, solo verificamos que exista
      if (!user) {
        throw new Error("Not authenticated");
      }

      const publicUser = { ...user, password: _ }; // eliminamos el password y el updatedAt del objeto devuelto 

      return publicUser;
    },
  }