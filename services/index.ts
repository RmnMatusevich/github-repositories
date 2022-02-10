import { GraphQLClient } from "graphql-request";
import dotenv from "dotenv";

import { RepositoryService } from "./repository";
import { FetchClient } from "../helpers/FetchClient";

const GRAPHQL_URL = "https://api.github.com/graphql";
const API_URL = "https://api.github.com";

dotenv.config();

const GitHubGraphqlService = new GraphQLClient(GRAPHQL_URL, {
  headers: {
    authorization: `Bearer ${process.env.TOKEN}`,
  },
});

const FetchService = new FetchClient(API_URL);

export const service = new RepositoryService(
  GitHubGraphqlService,
  FetchService
);
