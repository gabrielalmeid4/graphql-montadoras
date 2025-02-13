// yarn add express cors reflect-metadata
// yarn add @apollo/server graphql
// yarn add @types/express -D
// yarn add typescript -D
// yarn add typescript -D
// yarn add ts-node-dev -D

// #### COMANDOS:
// yarn dev
// yarn typeorm migration:show
// yarn typeorm migration:generate src/persistence/typeorm/migrations/AddMontadora
// yarn typeorm migration:run

import 'reflect-metadata'
import express, { Express } from "express";
import cors from "cors";
import { json } from "body-parser";

import '../data-source'

// Servidor GraphQL
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

// Para carregar o schema de um arquivo .graphql
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

import { MontadoraResolver } from './resolvers/montadora.resolver'
import { VeiculoResolver } from './resolvers/veiculo.resolver'
import { initContext, MyGQLContext } from "./graphql_config/context-graphql";

const resolvers = [MontadoraResolver, VeiculoResolver]

const app: Express = express();

app.use(cors());
app.use(json());


const typeDefs = loadSchemaSync("src/graphql_config/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});


async function startApolloServer() {
  const apolloServer = new ApolloServer<MyGQLContext>({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: initContext,
    })
  );

  app.listen(4000, () => {
    console.log("🚀 Servidor rodando em http://localhost:4000");
    console.log("📌 GraphQL Playground: http://localhost:4000/graphql");
  });
}

startApolloServer().catch((err) => console.error("Erro ao iniciar o servidor:", err));
