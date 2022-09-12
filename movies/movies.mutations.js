import prisma from "../prisma";

export const resolver = {
  Mutation: {
    createMovie: (_, { title }) => prisma.movie.create({ data: { title } }),
  },
};
