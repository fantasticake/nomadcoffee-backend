import prisma from "../prisma";

export const resolvers = {
  Query: {
    movies: () => prisma.movie.findMany(),
  },
};
