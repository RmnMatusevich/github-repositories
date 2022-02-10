import { GraphQLClient, gql } from "graphql-request";

import { FetchClient } from "../../helpers/FetchClient";
import {
  RepositoriesResponse,
  RepositoryResponse,
  RepositoryWebhook,
  AvailableRepositories,
} from "./types";

export class RepositoryService {
  service: GraphQLClient;
  request: FetchClient;

  constructor(service: GraphQLClient, request: FetchClient) {
    this.service = service;
    this.request = request;
  }

  async getRepositories() {
    const query = gql`
      {
        viewer {
          repositories(last: 10) {
            nodes {
              name
              owner {
                login
              }
              languages(first: 100) {
                edges {
                  size
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.service.request<RepositoriesResponse>(query);

    return data.viewer.repositories.nodes
      .filter((row) => row.name in AvailableRepositories)
      .map((row) => ({
        name: row.name,
        owner: row.owner.login,
        size: row.languages.edges.reduce(
          (acc, current) => (acc += current.size),
          0
        ),
      }));
  }

  async getRepository(name: string) {
    const query = gql`
      query getRepository($name: String!) {
        viewer {
          repository(name: $name) {
            name
            owner {
              login
            }
            languages(first: 100) {
              edges {
                size
              }
            }
            isPrivate
            ymlContent: object(
              expression: "HEAD:.github/workflows/checkmarx-analysis.yml"
            ) {
              ... on Blob {
                text
              }
            }
            object(expression: "HEAD:") {
              ... on Tree {
                entries {
                  name
                }
              }
            }
          }
        }
      }
    `;
    const {
      viewer: { repository },
    } = await this.service.request<RepositoryResponse>(query, { name });

    const repositoryHooks = await this.request.get<RepositoryWebhook[]>(
      `/repos/${repository.owner.login}/${name}/hooks`
    );

    return {
      name: repository.name,
      owner: repository.owner.login,
      size: repository.languages.edges.reduce(
        (acc, current) => (acc += current.size),
        0
      ),
      isPrivate: repository.isPrivate,
      filesCount: repository.object.entries.length,
      ymlContent: repository.ymlContent.text,
      activeWebhooks: repositoryHooks,
    };
  }
}
