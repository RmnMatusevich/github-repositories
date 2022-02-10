import React from "react";

import "./style.css";
import { useRepositories } from "../../hooks/api/useRepositories";
import { Card } from "../Card";
import { TitleSection } from "../TitleSection";
import { Loader } from "./Loader";

type Props = {
  onRepoClick: (repoName: string) => void;
};

export const Repositories = ({ onRepoClick }: Props) => {
  const { repositories, loading } = useRepositories();

  return (
    <TitleSection title="Repositories">
      <div className="repositories">
        {loading && <Loader />}
        {repositories?.map((repository) => (
          <Card
            key={repository.name}
            onClick={() => onRepoClick(repository.name)}
          >
            <>
              <h2>{repository.name}</h2>
              <h3>Owned by {repository.owner}</h3>
              <h3>{repository.size} bytes</h3>
            </>
          </Card>
        ))}
      </div>
    </TitleSection>
  );
};
