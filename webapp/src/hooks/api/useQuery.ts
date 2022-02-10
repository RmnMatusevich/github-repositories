import { useState, useEffect } from "react";
import { Variables, RequestDocument } from "graphql-request";

import { api } from ".";

export const useQuery = <T>(query: RequestDocument, variables?: Variables) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const queryServer = async () => {
    try {
      setLoading(true);
      const data = await api.request<T>(query, variables);
      setData(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void queryServer();
  }, []);

  return { data, loading, error, refetch: queryServer };
};
