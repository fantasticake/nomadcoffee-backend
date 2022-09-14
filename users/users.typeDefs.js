import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    users: [User]
  }
  type SharedOutput {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
      name: String!
      location: String!
      avatarURL: String!
      githubUsername: String!
    ): SharedOutput!
  }
`;
