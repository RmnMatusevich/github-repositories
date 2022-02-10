import { gql } from "graphql-request";

import { useQuery } from "./useQuery";

const query = gql`
  {
    repositories {
      name
      owner
      size
    }
  }
`;

export type Repository = {
  name: string;
  owner: string;
  size: number;
};

export const useRepositories = () => {
  const { data, loading, error } = useQuery<{ repositories: Repository[] }>(
    query
  );

  return { repositories: data?.repositories, loading, error };
};
