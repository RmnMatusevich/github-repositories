import { service } from "../../services";

export const repositoryQueries = {
  repositories: async () => {
    return await service.getRepositories();
  },
  repository: async ({ name }) => {
    return await service.getRepository(name);
  },
};
