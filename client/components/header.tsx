import { css } from "@emotion/react";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";

export interface HeaderProps {
  image: string;
  title: string;
  subTitle?: string;
}

export const Header = ({ image, title, subTitle }: HeaderProps) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <Image
          css={headerImage}
          src={image ?? "/rocket.png"}
          height={133}
          width={133}
        />
      </Grid>
      <Grid item xs={9}>
        <Typography css={headerTitle} variant="h2">
          {title}
        </Typography>
        <Typography css={headerSubTitle} variant="h5">
          {subTitle}
        </Typography>
      </Grid>
    </Grid>
  );
};

const headerImage = css`
  border-radius: 50%;
`;
const headerTitle = css`
  font-size: 38px !important;
  line-height: 38px;
  display: flex;
`;
const headerSubTitle = css`
  font-size: 15px !important;
  align-items: center;
  color: #858585;
  letter-spacing: 4px;
  text-transform: uppercase;
`;

export default Header;
