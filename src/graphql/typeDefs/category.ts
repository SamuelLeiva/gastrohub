import gql from "graphql-tag";

export const categoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
    description: String!
    # products: [Product!]!
  }

  type PublicCategory {
    id: ID!
    name: String!
    description: String!
  }

  type CreateCategoryResponse {
    name: String!
    description: String!
    message: String!
  }

  extend type Query {
    categories: [PublicCategory!]!
  }

  extend type Mutation {
    createCategory(name: String!, description: String!): CreateCategoryResponse!
  }
`;
