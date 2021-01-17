import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import Layout from "../components/layout";
import { useUser } from "../lib/useUser";

export const LogOut = () => {
  const { data } = useSWR("/api/logout");
  const client = useApolloClient();
  const { user } = useUser({ redirectTo: "/login" });
  useEffect(() => {
    if (data?.isLoggedIn == false && user) {
      client.cache.evict({ id: client.cache.identify(user) });
    }
  }, [data, user]);
  return <Layout title="Space Explorer" header={<></>} loading={true} />;
};

export default LogOut;
