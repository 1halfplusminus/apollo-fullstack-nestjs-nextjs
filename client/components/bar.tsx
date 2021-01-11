import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { css } from "@emotion/react";

export function Bar() {
  return (
    <AppBar
      css={css`
        height: 10px;
        width: 100%;
      `}
    ></AppBar>
  );
}

export default Bar;
