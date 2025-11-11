import gql from "graphql-tag";

export const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    imageUrl: String!
    createdAt: Date!
    categoryId: String!
    #reviews: [Review!]!
    #orderItems: [OrderItem!]!
  }

  type PublicProduct {
    id: ID!
    name: String!
    description: String!
    price: Float!
    imageUrl: String!
    categoryId: String!
    #reviews: [Review!]!
  }

  type DetailedProduct {
    id: ID!
    name: String!
    description: String!
    price: Float!
    imageUrl: String!
    category: Category!
  }

  type CreateProduct {
    name: String!
    description: String!
    price: Float!
    imageUrl: String!
    categoryId: String!
  }

  extend type Query {
    products: [PublicProduct!]!
    product(id: ID!): DetailedProduct!
  }

  extend type Mutation {
    createProduct(name: String!, description: String!, price: Float!, imageUrl: String!, categoryId: String!): PublicProduct!
    updateProduct(id: ID!, name: String, description: String, price: Float, imageUrl: String, categoryId: String): PublicProduct!
    deleteProduct(id: ID!): PublicProduct!
  }
`;
