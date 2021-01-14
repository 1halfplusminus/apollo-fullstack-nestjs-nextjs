import { gql, useQuery } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { Me } from "./__generated__/Me";

export const QUERY_ME = gql`
  query Me {
    me {
      email
      trips {
        id
      }
    }
  }
`;
export const useUser = ({
  redirectTo = false,
  redirectIfFound = false,
}: {
  redirectTo?: false | string;
  redirectIfFound?: false | string;
} = {}) => {
  const { data, error, loading } = useQuery<Me>(QUERY_ME, {
    fetchPolicy: "cache-first",
  });
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || loading) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && error) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && !error)
    ) {
      Router.push(redirectTo);
    }
  }, [data, redirectIfFound, redirectTo, error, loading]);

  return {
    user: data && { ...data.me },
    loading: error && loading,
  };
};
