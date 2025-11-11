import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import { mergeResolvers } from "@graphql-tools/merge";
import { DateScalar } from "./common/scalars/date.scalar";
import { userResolvers, userTypeDefs } from "./user";
import { categoryResolvers, categoryTypeDefs } from "./category";
import { productResolvers, productTypeDefs } from "./product";

const baseTypeDefs = gql`
  scalar Date
  type Query
  type Mutation
`;

const typeDefs = [baseTypeDefs, userTypeDefs, categoryTypeDefs, productTypeDefs];

const resolvers = mergeResolvers([{ Date: DateScalar }, userResolvers, categoryResolvers, productResolvers]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
