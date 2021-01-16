import { Grid } from "@material-ui/core";
import router from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/header";
import { LaunchList } from "../components/launch-list";
import LaunchTile from "../components/launch-tile";
import Layout from "../components/layout";
import { NoResult } from "../components/no-result";
import { useUser } from "../lib/useUser";

export default function Profile() {
  const { user } = useUser({ redirectTo: "/login" });
  const router = useRouter();
  return (
    <Layout
      title="Profile"
      header={
        <Header
          image="/avatar-1577909_1280.png"
          title="Profile"
          subTitle={user?.email}
        />
      }
    >
      {user?.trips.length === 0 && (
        <NoResult text="You haven’t booked any trips" />
      )}
      <LaunchList>
        {user?.trips.map((l) => (
          <Grid item xs={10} key={l.id}>
            <LaunchTile
              title={l.mission.name}
              subTitle={l.rocket.name}
              id={l.id}
              onClick={() => router.push(`/launch/${l.id}`)}
            />
          </Grid>
        ))}
      </LaunchList>
    </Layout>
  );
}
