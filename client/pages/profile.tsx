import React from "react";
import Header from "../components/header";
import Layout from "../components/layout";
import { NoResult } from "../components/no-result";

export default function Profile() {
  return (
    <Layout
      title="Profile"
      header={<Header image="/avatar-1577909_1280.png" title="Profile" />}
    >
      <NoResult text="You haven’t booked any trips" />
    </Layout>
  );
}
