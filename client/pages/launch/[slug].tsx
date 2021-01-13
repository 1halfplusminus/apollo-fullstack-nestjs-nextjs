import React from "react";
import Header from "../../components/header";
import Grid from "@material-ui/core/Grid";
import Layout from "../../components/layout";
import { LaunchDetail } from "../../components/launch-detail";
import { AddToCart } from "../../containers/add-to-cart";

export default function Launch() {
  return (
    <Layout
      title="Space Explorer"
      header={<Header image="/rocket.png" title="My Launch" />}
    >
      <Grid direction="row" container justify="center" spacing={2}>
        <Grid item xs={12}>
          <LaunchDetail
            title="Launch Name"
            subTitle="APPOLO-2"
            image="/space-mission-featured-image.jpg"
          />
        </Grid>
        <Grid item>
          <AddToCart />
        </Grid>
      </Grid>
    </Layout>
  );
}
