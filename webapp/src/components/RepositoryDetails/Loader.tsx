import React from "react";
import ContentLoader from "react-content-loader";

import "./style.css";

export const Loader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={440}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="100%" height="440" />
  </ContentLoader>
);
