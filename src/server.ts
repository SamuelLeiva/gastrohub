import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./graphql/schema";
import { buildContext } from "./contexts/context";

export async function startServer() {
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: buildContext,
  });

  console.log(`🚀 GastroHub GraphQL running at ${url}`);
}
