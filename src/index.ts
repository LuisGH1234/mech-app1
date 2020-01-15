import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import { openConnection } from "./database";
import { buildSchema } from "type-graphql";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    await openConnection();
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.resolver.{ts,js}"],
        container: Container
    });

    const server = new ApolloServer({
        schema,
        playground: true,
        debug: true
    });

    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground at ${url}`);
}

bootstrap();
