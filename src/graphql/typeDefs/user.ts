import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: Role!
    # orders: [Order!]!
    # reviews: [Review!]!
    createdAt: String!
    updatedAt: String!
  }

  type RegisterResponse {
    user: User!
    token: String!
  }

  enum Role {
    COOK
    CUSTOMER
  }

  extend type Query {
    users: [User!]!
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!, role: Role): RegisterResponse!
  }
`;
