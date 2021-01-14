import { ApolloClient, HttpLink, NormalizedCacheObject } from "@apollo/client";
import merge from "deepmerge";
import { useMemo } from "react";
import { createCache } from "./cache";

interface CreateLinkOptions {
  token?: string;
}

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createLink({ token }: CreateLinkOptions) {
  return new HttpLink({
    uri:
      typeof window !== "undefined"
        ? "http://localhost:3001/api/proxy/graphql"
        : "http://localhost:3000/graphql",
    credentials: "same-origin",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

function createApolloClient(options: CreateLinkOptions) {
  return new ApolloClient({
    link: createLink(options),
    cache: createCache(),
    ssrMode: typeof window === "undefined",
  });
}

export function initializeApollo(
  initialState = null,
  options: CreateLinkOptions = {}
) {
  const _apolloClient = apolloClient ?? createApolloClient(options);

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any, options: CreateLinkOptions = {}) {
  const store = useMemo(() => initializeApollo(initialState, options), [
    initialState,
  ]);
  return store;
}