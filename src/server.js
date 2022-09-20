import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import schema from "./schema";
import prisma from "./prismaClient";
import jwt from "jsonwebtoken";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";

async function start() {
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
  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  app.use("/uploads", express.static("uploads"));
  server.applyMiddleware({ app });
  await new Promise(r => app.listen({ port: process.env.PORT }, r));

  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
}

start();
