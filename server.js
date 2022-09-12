import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
