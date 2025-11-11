import gql from "graphql-tag";
import { userTypeDefs } from "./user";
import { categoryTypeDefs } from "./category";
import { productTypeDefs } from "./product";

const baseTypeDefs = gql`
  scalar Date
  type Query
  type Mutation
`;

export const typeDefs = [
  baseTypeDefs,
  userTypeDefs,
  categoryTypeDefs,
  productTypeDefs
];
