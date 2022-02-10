import React from "react";

import "./style.css";

type Props = {
  children: React.ReactChild;
  onClick?: () => void;
};

export const Card = ({ onClick, children }: Props) => {
  return (
    <div className="card" onClick={onClick}>
      {children}
    </div>
  );
};
