import { css } from "@emotion/react";
import Grid from "@material-ui/core/Grid";
import React, { PropsWithChildren } from "react";

export const LaunchList = ({ children }: PropsWithChildren<{}>) => (
  <Grid
    css={css`
      margin-bottom: 150px !important;
    `}
    item
    container
    xs={12}
    justify="center"
    wrap="wrap"
    spacing={2}
  >
    {children}
  </Grid>
);
