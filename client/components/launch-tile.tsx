import React from "react";
import { css } from "@emotion/react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

export interface LaunchTileProps {
  title: string;
  subTitle: string;
  image: string;
  onClick?: () => void;
}
export const LaunchTile = ({
  title,
  subTitle,
  image,
  onClick = () => {},
}: LaunchTileProps) => {
  return (
    <Card
      css={css`
        background-image: url("${image}");
        background-size: cover;
        border-radius: 5px;
        flex: 0.7;
      `}
    >
      <CardActionArea onClick={onClick}>
        <CardContent
          css={css`
            min-height: 180px;
          `}
        >
          <Typography css={launchTileTitle} variant="h4">
            {title}
          </Typography>
          <Typography css={launchTileSubTitle} variant="h4">
            {subTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
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

export default LaunchTile;
