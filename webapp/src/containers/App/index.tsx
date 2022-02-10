import React, { useState, useCallback } from "react";
import "./style.css";
import { Repositories } from "../../components/Repositories";
import { RepositoryDetails } from "../../components/RepositoryDetails";

const App = () => {
  const [repoName, setRepoName] = useState<string>();

  const handleRepoNameChange = useCallback((name: string) => {
    setRepoName(name);
  }, []);

  return (
    <div className="root">
      <Repositories onRepoClick={handleRepoNameChange} />
      {repoName && <RepositoryDetails name={repoName} />}
    </div>
  );
};

export default App;
