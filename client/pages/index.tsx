import React from "react";
import Header from "../components/header";
import Grid from "@material-ui/core/Grid";
import LaunchTile from "./../components/launch-tile";
import Layout from "../components/layout";
import { useRouter } from "next/dist/client/router";
import { LoadMore } from "../containers/load-more";

export default function Home() {
  const router = useRouter();
  return (
    <Layout
      title="Space Explorer"
      header={
        <Header image="/avatar-1577909_1280.png" title="Space Explorer" />
      }
    >
      <Grid item container xs={12} justify="center" wrap="wrap" spacing={2}>
        <Grid item xs={10}>
          <LaunchTile
            title="Launch Name"
            subTitle="APPOLO-2"
            image="./space-mission-featured-image.jpg"
            onClick={() => router.push(`/launch/1`)}
          />
        </Grid>
        <Grid item xs={10}>
          <LaunchTile
            title="Launch Name 2"
            subTitle="APPOLO-2"
            image="./space-mission-featured-image.jpg"
          />
        </Grid>
        <Grid item xs={10}>
          <LaunchTile
            title="Launch Name 3"
            subTitle="APPOLO-4"
            image="./space-mission-featured-image.jpg"
          />
        </Grid>
        <Grid item>
          <LoadMore />
        </Grid>
      </Grid>
    </Layout>
  );
}
