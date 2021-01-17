import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import Layout from "../components/layout";

export const LogOut = () => {
  const { data: user } = useSWR("/api/logout");
  const router = useRouter();
  useEffect(() => {
    if (user?.isLoggedIn === false) {
      router.push("/login");
    }
  }, [user]);
  return <Layout title="Space Explorer" header={<></>} loading={true} />;
};

export default LogOut;
