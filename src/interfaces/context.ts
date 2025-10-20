import { PrismaClient } from "@prisma/client/extension";
import { prisma } from "../infrastructure/db/client";

export interface GraphQLContext {
    prisma: PrismaClient;
}

export async function buildContext(): Promise<GraphQLContext> {
  return { prisma };
}
