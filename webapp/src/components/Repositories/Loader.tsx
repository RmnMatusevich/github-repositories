import React from "react";
import ContentLoader from "react-content-loader";

import "./style.css";

export const Loader = () => (
  <ContentLoader
    speed={2}
    width={900}
    height={180}
    viewBox="0 0 900 180"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="16" ry="16" width="274" height="174" />
    <rect x="290" y="0" rx="16" ry="16" width="274" height="174" />
    <rect x="580" y="0" rx="16" ry="16" width="274" height="174" />
  </ContentLoader>
);
