import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import React, { PropsWithChildren, ReactNode } from "react";
import Bar from "./bar";
import Footer from "./footer";
import { Loading } from "./loading";
import Page from "./page";

export interface LayoutProps {
  title: string;
  header: ReactNode;
  loading?: boolean;
}
export const Layout = ({
  children,
  title,
  header,
  loading = false,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        direction="row"
        wrap="wrap"
        justify="center"
        alignContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Bar />
        </Grid>
        <Page>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Grid item xs={12}>
                {header}
              </Grid>
              {children}
            </>
          )}
        </Page>
      </Grid>
      <Footer />
    </>
  );
};

export default Layout;
