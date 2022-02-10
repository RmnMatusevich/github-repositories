import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import cors from "cors";

import { resolvers } from "./resolvers";

dotenv.config();

const app = express();
const port = process.env.PORT;

var schema = buildSchema(`
  type Repository {
	  name: String,
	  size: Int,
	  owner: String
  },
  type Webhook {
    type: String,
    id: Int,
    name: String,
    active: Boolean,
    updated_at: String,
    created_at: String,
    url: String,
    test_url: String,
    ping_url: String,
    deliveries_url: String,
  },
  type RepositoryDetails {
	  name: String,
	  size: Int,
	  owner: String,
	  isPrivate: Boolean,
	  filesCount: Int,
	  ymlContent: String,
	  activeWebhooks: [Webhook]
  },
  type Query {
    repositories: [Repository],
    repository(name: String!): RepositoryDetails,
  },
`);

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
    context: {
      request,
      response,
    },
  }))
);

app.listen(port, () => console.log(`Running on port ${port}`));
