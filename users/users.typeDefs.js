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

  type SeeProfileOutput {
    ok: Boolean!
    result: User
    error: String
  }

  type Query {
    seeProfile: SeeProfileOutput!
  }

  type SharedOutput {
    ok: Boolean!
    error: String
  }

  type LoginOutput {
    ok: Boolean!
    token: String
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

    login(email: String!, password: String!): LoginOutput!

    editProfile(password: String, avatarURL: String): SharedOutput!
  }
`;
