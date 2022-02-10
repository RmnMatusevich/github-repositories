import { useEffect } from "react";
import { gql } from "graphql-request";

import { useQuery } from "./useQuery";

const query = gql`
  query RepositoryDetails($name: String!) {
    repository(name: $name) {
      name
      owner
      size
      isPrivate
      filesCount
      ymlContent
      activeWebhooks {
        id
        type
        name
        active
        updated_at
        created_at
        url
        test_url
        ping_url
        deliveries_url
      }
    }
  }
`;

type RepositoryWebhook = {
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

export type RepositoryDetails = {
  name: string;
  owner: string;
  size: number;
  isPrivate: boolean;
  filesCount: number;
  ymlContent: string;
  activeWebhooks: RepositoryWebhook[];
};

export const useRepository = (name: string) => {
  const { data, loading, error, refetch } = useQuery<{
    repository: RepositoryDetails;
  }>(query, { name });

  useEffect(() => {
    void refetch();
  }, [name]);

  return { repository: data?.repository, loading, error };
};
