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
    createdAt: Date!
    updatedAt: Date!
  }

  type PublicUser {
    id: ID!
    name: String!
    email: String!
    role: Role!
    createdAt: Date!
    updatedAt: Date!
  }

  # Response type for registration
  type RegisterResponse {
    user: PublicUser!
    token: String!
  }

  type LoginResponse {
    token: String!
  }

  enum Role {
    COOK
    CUSTOMER
  }

  extend type Query {
    users: [PublicUser!]!
    me: PublicUser!
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!, role: Role): RegisterResponse!
    login(email: String!, password: String!): LoginResponse! # Returns a JWT token
  }
`;
