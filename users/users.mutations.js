import prisma from "../prismaClient";
import bcrypt from "bcrypt";

export const resolver = {
  Mutation: {
    async createAccount(_, input) {
      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ username: input.username }, { email: input.email }] },
      });
      if (existingUser)
        return { ok: false, error: "Username or email eary exists" };

      const hash = bcrypt.hashSync(input.password, 10);
      await prisma.user.create({
        data: { ...input, password: hash },
      });
      return { ok: true };
    },
  },
};
