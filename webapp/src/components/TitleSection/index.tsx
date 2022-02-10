import React from "react";

import "./style.css";

type Props = {
  title: string;
  children: React.ReactChild;
};

export const TitleSection = ({ title, children }: Props) => (
  <div className="container">
    <h1>{title}</h1>
    {children}
  </div>
);
