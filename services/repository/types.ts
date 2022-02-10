export type RepositoriesResponse = {
  viewer: {
    repositories: {
      nodes: {
        name: string;
        owner: {
          login: string;
        };
        languages: {
          edges: {
            size: number;
          }[];
        };
      }[];
    };
  };
};

export type RepositoryResponse = {
  viewer: {
    repository: {
      name: string;
      owner: {
        login: string;
      };
      languages: {
        edges: {
          size: number;
        }[];
      };
      isPrivate: boolean;
      object: {
        entries: { name: string }[];
      };
      ymlContent: {
        text: string;
      };
    };
  };
};

export type RepositoryWebhook = {
  type: string;
  id: number;
  name: string;
  active: boolean;
  updated_at: string;
  created_at: string;
  url: string;
  test_url: string;
  ping_url: string;
  deliveries_url: string;
};

export enum AvailableRepositories {
  GreenridgeApp1,
  GreenridgeApp2,
  GreenridgeApp3,
}
