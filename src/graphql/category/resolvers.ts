
import { categoryMutations } from "./mutations";
import { categoryQueries } from "./queries";

export const categoryResolvers = {
  Query: categoryQueries,
  Mutation: categoryMutations,
};
