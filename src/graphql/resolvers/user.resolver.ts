import { GraphQLContext } from "../../interfaces/context";
import { comparePasswords, encryptPassword } from "../../utils/encrypt";
import { generateToken } from "../../utils/jwt";
import { LoginArgs, RegisterArgs } from "../inputs";
import { validateRegisterInput } from "../validators/user.validators";

export const userResolvers = {
  Query: {
    users: async (_: unknown, __: unknown, { prisma }: GraphQLContext) => {
      return prisma.user.findMany();
    },
  },

  Mutation: {
    register: async (
      _: unknown,
      args: RegisterArgs,
      { prisma }: GraphQLContext
    ) => {
      const { name, email, password } = args;

      validateRegisterInput(name, email, password);

      // Validate if the email already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await encryptPassword(password);
      const role = args.role || "CUSTOMER";

      const savedUser = await prisma.user.create({
        data: { name, email, password: hashedPassword, role },
      });

      const token = generateToken(savedUser.id, savedUser.email, savedUser.role); // Generate a token for the user

      //construimos un usuario publico sin el password
      const user = {
        password: _,
        ...savedUser,
      };

      return { user, token };
    },
    login: async (
      _: unknown,
      args: LoginArgs,
      { prisma }: GraphQLContext
    ) => {
      const { email, password } = args;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = generateToken(user.id, user.email, user.role); // Generate a token for the user
      return { token };
    },
  },
};
