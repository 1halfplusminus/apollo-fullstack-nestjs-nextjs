import { css } from "@emotion/react";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";

export interface NoResultProps {
  text: string;
}
export const NoResult = ({ text }: NoResultProps) => (
  <Box
    css={css`
      margin-top: 45px;
    `}
  >
    <Typography variant="body1">{text}</Typography>
  </Box>
);
