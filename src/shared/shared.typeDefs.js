import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Upload

  type SharedOutput {
    ok: Boolean!
    error: String
  }
`;
