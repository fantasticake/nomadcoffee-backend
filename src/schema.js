import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefsArr = loadFilesSync(path.join(__dirname, "./**/*.typeDefs.js"));
const resolversArr = loadFilesSync(
  path.join(__dirname, "./**/*.{queries,mutations}.js")
);

const typeDefs = mergeTypeDefs(typeDefsArr);
const resolvers = mergeResolvers(resolversArr);
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
