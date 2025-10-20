import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user.resolver";
import { DateScalar } from "../scalars/date.scalar";

export const resolvers = mergeResolvers([{ Date: DateScalar }, userResolvers]);
