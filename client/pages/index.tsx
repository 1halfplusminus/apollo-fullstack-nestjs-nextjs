import React, { useState } from "react";
import Header from "../components/header";
import Grid from "@material-ui/core/Grid";
import LaunchTile from "./../components/launch-tile";
import Layout from "../components/layout";
import { useRouter } from "next/dist/client/router";
import { LoadMore } from "../containers/load-more";
import { useUser } from "../lib/useUser";
import { useQuery } from "@apollo/client";
import {
  QueryLaunchs,
  QueryLaunchsVariables,
} from "../queries/__generated__/QueryLaunchs";
import { initializeApollo } from "../apollo/client";
import { QUERY_LAUNCHS } from "../queries/LAUNCH_TILE_DATA";
import { css } from "@emotion/react";
import { Loading } from "../components/loading";

export default function Home() {
  const router = useRouter();
  const { loading, user } = useUser({ redirectTo: "/login" });
  const { data, fetchMore } = useQuery<QueryLaunchs, QueryLaunchsVariables>(
    QUERY_LAUNCHS,
    {
      variables: { pageSize: 10 },
      fetchPolicy: "cache-first",
    }
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  return (
    <Layout
      title="Space Explorer"
      header={
        <Header
          subTitle={user?.email}
          image="/avatar-1577909_1280.png"
          title="Space Explorer"
        />
      }
      loading={loading}
    >
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
        {data?.launches.launches.map((l) => (
          <Grid item xs={10} key={l.id}>
            <LaunchTile
              title={l.mission.name}
              subTitle={l.rocket.name}
              id={l.id}
              onClick={() => router.push(`/launch/${l.id}`)}
            />
          </Grid>
        ))}
        {data.launches.hasMore && (
          <Grid item>
            {!isLoadingMore ? (
              <LoadMore
                onClick={async () => {
                  setIsLoadingMore(true);
                  await fetchMore({
                    variables: {
                      after: data?.launches.cursor,
                      pageSize: 60,
                    },
                  });
                  setIsLoadingMore(false);
                }}
              />
            ) : (
              <Loading />
            )}
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}
export const getStaticProps = async () => {
  {
    const apolloClient = initializeApollo();

    await apolloClient.query({
      query: QUERY_LAUNCHS,
      variables: { pageSize: 10 },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
};
/* export const getServerSideProps = withSession(
  async (
    context: NextPageContext & { req: NextApiRequest & { session: Session } }
  ) => {
    const apolloClient = initializeApollo(null, {
      token: context.req?.session.get("user")?.token,
    });

    await apolloClient.query({
      query: QUERY_LAUNCH,
      variables: { pageSize: 10 },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
); */
