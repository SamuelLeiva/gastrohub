import { PrismaClient } from "@prisma/client/extension";
import { prisma } from "../infrastructure/db/client";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export interface GraphQLContext {
    prisma: PrismaClient;
    user?: User | null;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export async function buildContext({ req }: { req: any }): Promise<GraphQLContext> {
  const authHeader = req?.headers?.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return { prisma };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // lo traemos con password para tener el objeto completo, luego en los resolvers devolvemos solo el PublicUser
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return { prisma, user };
  } catch (error) {
    console.warn("Invalid token:", (error as Error).message);
    return { prisma };
  }
}