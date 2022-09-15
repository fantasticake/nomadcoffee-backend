import prisma from "../prismaClient";
import { privateResolver } from "../utils";

export const resolvers = {
  Query: {
    seeProfile: privateResolver(async (_, __, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          return { ok: false, error: "Cannot access" };
        }

        const user = await prisma.user.findUnique({
          where: { id: loggedInUser.id },
        });
        return { ok: true, result: user };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot see profile" };
      }
    }),
  },
};
