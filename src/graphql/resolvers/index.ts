import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user.resolver";
import { DateScalar } from "../scalars/date.scalar";
import { categoryResolvers } from "./category.resolver";
import { productResolvers } from "./product.resolver";

export const resolvers = mergeResolvers([{ Date: DateScalar }, userResolvers, categoryResolvers, productResolvers]);
