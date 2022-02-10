import React from "react";

import "./style.css";
import { Card } from "../Card";
import { TitleSection } from "../TitleSection";
import { Loader } from "./Loader";
import { useRepository } from "../../hooks/api/useRepository";

type Props = {
  name: string;
};

export const RepositoryDetails = ({ name }: Props) => {
  const { repository, loading } = useRepository(name);

  if (!name) return null;

  return (
    <TitleSection title={name}>
      <div className="repositories">
        {loading && <Loader />}
        {!loading && repository && (
          <Card>
            <>
              <h3>
                Owned by {repository.name},{" "}
                {repository.isPrivate ? "Private" : "Public"}
              </h3>
              <h3>
                {repository.filesCount} files, {repository.size} bytes
              </h3>
              <code>{repository.ymlContent}</code>
              <h3>Webhooks:</h3>
              <div className="webhooks">
                {repository.activeWebhooks.map((webhook) => (
                  <Card key={webhook.id}>
                    <>
                      <h3>Name: {webhook.name}</h3>
                      <h4>Type: {webhook.type}</h4>
                      <h4>State: {webhook.active ? "Active" : "Passive"}</h4>
                      <h4>Type: {webhook.type}</h4>
                      <h4>URL: {webhook.url}</h4>
                      <h4>Test URL: {webhook.test_url}</h4>
                      <h4>Ping URL: {webhook.ping_url}</h4>
                      <h4>Deliveries URL: {webhook.deliveries_url}</h4>
                    </>
                  </Card>
                ))}
              </div>
            </>
          </Card>
        )}
      </div>
    </TitleSection>
  );
};
