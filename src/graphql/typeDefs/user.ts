import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  extend type Query {
    users: [User!]!
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
  }
`;
