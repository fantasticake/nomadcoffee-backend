import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { privateResolver } from "../utils";

const saltRounds = 10;

export const resolver = {
  Mutation: {
    async createAccount(_, input) {
      try {
        const existingUser = await prisma.user.findFirst({
          where: { OR: [{ username: input.username }, { email: input.email }] },
        });
        if (existingUser)
          return { ok: false, error: "Username or email eary exists" };

        const hash = bcrypt.hashSync(input.password, saltRounds);
        await prisma.user.create({
          data: { ...input, password: hash },
        });
        return { ok: true };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot create account" };
      }
    },

    async login(_, input) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: input.email },
          select: { id: true, password: true },
        });
        if (!user) return { ok: false, error: "User not found" };

        const isValid = bcrypt.compareSync(input.password, user.password);
        if (!isValid) return { ok: false, error: "Password not valid" };

        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY);
        return { ok: true, token };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot login" };
      }
    },

    editProfile: privateResolver(async (_, input, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          return { ok: false, error: "Cannot access" };
        }

        let hash;
        if (input.password) hash = bcrypt.hashSync(input.password, saltRounds);
        await prisma.user.update({
          where: { id: loggedInUser.id },
          data: { ...input, ...(input.password && { password: hash }) },
        });
        return { ok: true };
      } catch (e) {
        console.log(e);
        return { ok: false, error: "Cannot edit profile" };
      }
    }),
  },
};
