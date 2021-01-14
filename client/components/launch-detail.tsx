import React from "react";
import { css } from "@emotion/react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { getBackgroundImage } from "./launch-tile";

export interface LaunchDetailProps {
  title: string;
  subTitle: string;
  id: string;
}
export const LaunchDetail = ({ title, subTitle, id }: LaunchDetailProps) => {
  return (
    <Card
      css={css`
        background-image: ${getBackgroundImage(id)};
        background-size: cover;
        border-radius: 5px;
        flex: 0.7;
      `}
    >
      <CardContent
        css={css`
          min-height: 320px;
          padding: 20px !important;
        `}
      >
        <Typography css={launchTileTitle} variant="h4">
          {title}
        </Typography>
        <Typography css={launchTileSubTitle} variant="h4">
          {subTitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

const launchTileTitle = css`
  color: white;
`;
const launchTileSubTitle = css`
  color: #ffffff;
  font-size: 22px !important;
`;

export default LaunchDetail;
