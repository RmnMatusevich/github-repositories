import { GraphQLClient } from "graphql-request";

const ENDPOINT = "http://localhost:5000/graphql";

export const api = new GraphQLClient(ENDPOINT);
