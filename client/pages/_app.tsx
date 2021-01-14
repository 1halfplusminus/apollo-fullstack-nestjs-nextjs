import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useEffect } from "react";
import { useApollo } from "../apollo/client";
import { ApolloProvider } from "@apollo/client";

import theme from "../theme";
import { GetServerSideProps } from "next";
import withSession from "../lib/session";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialApolloState: any; user: any }>) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const apolloClient = useApollo(pageProps.initialApolloState, {
    token: pageProps.user?.token,
  });
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});

export default MyApp;
