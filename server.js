import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import schema from "./schema";
import prisma from "./prismaClient";
import jwt from "jsonwebtoken";

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  context: async ({ req: { headers } }) => {
    try {
      const token = headers["x-token"];
      if (token) {
        const { userId } = jwt.verify(token, process.env.JWT_KEY);
        if (userId) {
          const loggedInUser = await prisma.user.findUnique({
            where: { id: userId },
          });
          if (loggedInUser) {
            return {
              loggedInUser,
            };
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
