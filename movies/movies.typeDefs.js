import { gql } from "apollo-server";

export const typeDefs = gql`
  type Movie {
    title: String!
  }
  type Query {
    movies: [Movie]
  }
  type Mutation {
    createMovie(title: String): Movie
  }
`;
