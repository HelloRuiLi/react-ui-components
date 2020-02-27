import React from "react";
import { Portal } from "src/portal";
import { css } from "@emotion/core";

const modalStyles = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Modal: React.FC = ({ children }) => (
  <Portal>
    <div css={modalStyles}>{children}</div>
  </Portal>
);
