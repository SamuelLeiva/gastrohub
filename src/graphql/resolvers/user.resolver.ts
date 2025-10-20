import { GraphQLContext } from "../../interfaces/context";
import { encryptPassword } from "../../utils/encrypt";
import { generateToken } from "../../utils/jwt";

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
    register: async (
      _: unknown,
      args: { name: string; email: string; password: string; role?: string },
      { prisma }: GraphQLContext
    ) => {
      const { name, email } = args;

      // Validate if the email already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const password = await encryptPassword(args.password);
      const role = args.role || "CUSTOMER";
      
      const user = await prisma.user.create({
        data: { name, email, password, role },
      });

      const token = generateToken(user.id, user.email); // Generate a token for the user

      return { user, token };
    },
  },
};