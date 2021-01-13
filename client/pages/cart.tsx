import React from "react";
import Header from "../components/header";
import Layout from "../components/layout";
import { NoResult } from "../components/no-result";

export default function Cart() {
  return (
    <Layout
      title="Cart"
      header={<Header image="/avatar-1577909_1280.png" title="Cart" />}
    >
      <NoResult text="No items in your cart" />
    </Layout>
  );
}
