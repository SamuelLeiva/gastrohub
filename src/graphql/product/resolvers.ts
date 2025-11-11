
import { productMutations } from "./mutations";
import { productQueries } from "./queries";

export const productResolvers = {
  Query: productQueries,
  Mutation: productMutations,
};
