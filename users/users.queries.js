import { paginationTake } from "../constants";
import prisma from "../prismaClient";
import { privateResolver } from "../utils";

export const resolvers = {
  User: {
    following: async ({ id }, { page = 1 }) => {
      try {
        const users = await prisma.user.findMany({
          where: { followers: { some: { id } } },
          skip: (page - 1) * paginationTake,
          take: paginationTake,
        });
        return users;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    followers: async ({ id }, { page = 1 }) => {
      try {
        const users = await prisma.user.findMany({
          where: { following: { some: { id } } },
          skip: (page - 1) * paginationTake,
          take: paginationTake,
        });
        return users;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Query: {
    seeProfile: privateResolver(async (_, __, { loggedInUser }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: loggedInUser.id },
        });
        return { ok: true, result: user };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot see profile" };
      }
    }),

    seeUser: async (_, { userId }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        return { ok: true, result: user };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot see profile" };
      }
    },

    searchUsers: async (_, { key }) => {
      try {
        const users = await prisma.user.findMany({
          where: { username: { startsWith: key } },
        });
        return { ok: true, result: users };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot search users" };
      }
    },
  },
};
