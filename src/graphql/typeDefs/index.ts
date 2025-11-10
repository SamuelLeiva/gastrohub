import gql from "graphql-tag";
import { userTypeDefs } from "./user";
import { categoryTypeDefs } from "./category";

const baseTypeDefs = gql`
  scalar Date
  type Query
  type Mutation
`;

export const typeDefs = [
  baseTypeDefs,
  userTypeDefs,
  categoryTypeDefs
];
