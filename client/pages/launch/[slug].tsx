import React from "react";
import Header from "../../components/header";
import Grid from "@material-ui/core/Grid";
import Layout from "../../components/layout";
import { LaunchDetail } from "../../components/launch-detail";
import { AddToCart } from "../../containers/add-to-cart";
import { initializeApollo } from "../../apollo/client";
import { useQuery } from "@apollo/client";
import { GetStaticPropsContext } from "next";
import { QueryLaunchs } from "../../queries/__generated__/QueryLaunchs";
import {
  QueryLaunch,
  QueryLaunchVariables,
} from "../../queries/__generated__/QueryLaunch";
import { QUERY_LAUNCH, QUERY_LAUNCHS } from "../../queries/QUERY_LAUNCH";
import { DeleteFromCart } from "../../containers/delete-from-cart";
import { CancelTrip } from "../../containers/cancel-trip";
import { useUser } from "../../lib/useUser";

export default function Launch({ id }: { id: string }) {
  const {} = useUser({ redirectTo: "/login" });
  const { data, loading } = useQuery<QueryLaunch, QueryLaunchVariables>(
    QUERY_LAUNCH,
    {
      variables: { id },
      fetchPolicy: "cache-only",
    }
  );
  return (
    <Layout
      title="Space Explorer"
      header={
        <Header
          image={data?.launch.mission.missionPatch}
          title={data?.launch.mission.name}
        />
      }
    >
      <Grid direction="row" container justify="center" spacing={2}>
        <Grid item xs={12}>
          <LaunchDetail
            title={`${data?.launch.rocket.name} (${data?.launch.rocket.type})`}
            subTitle={data?.launch.site}
            id={data?.launch.id}
          />
        </Grid>
        <Grid item>
          {!loading && (
            <>
              {data?.launch.isBooked ? (
                <CancelTrip id={id} />
              ) : (
                <>
                  {data?.carts.inCart ? (
                    <DeleteFromCart id={id} />
                  ) : (
                    <AddToCart id={id} />
                  )}
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}
export const getStaticProps = async (context: GetStaticPropsContext) => {
  {
    const apolloClient = initializeApollo();

    await apolloClient.query({
      query: QUERY_LAUNCH,
      variables: { id: Number(context.params.slug) },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        id: Number(context.params.slug),
      },
    };
  }
};
export const getStaticPaths = async () => {
  {
    const apolloClient = initializeApollo();

    const result = await apolloClient.query<QueryLaunchs>({
      query: QUERY_LAUNCHS,
      variables: { pageSize: 10 },
    });

    return {
      paths: result.data.launches.launches.map((l) => ({
        params: { slug: l.id },
      })),
      fallback: true,
    };
  }
};
