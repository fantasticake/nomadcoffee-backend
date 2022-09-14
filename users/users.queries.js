import prisma from "../prismaClient";

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
  },
};
