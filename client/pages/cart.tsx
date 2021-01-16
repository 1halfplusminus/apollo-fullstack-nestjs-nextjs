import { useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Header from "../components/header";
import { LaunchList } from "../components/launch-list";
import Layout from "../components/layout";
import { NoResult } from "../components/no-result";
import { BookAll } from "../containers/book-all-cart";
import { CartItem } from "../containers/cart-item";
import { useUser } from "../lib/useUser";
import { QUERY_CARTS } from "../queries/QUERY_CARTS";
import { Carts } from "../queries/__generated__/Carts";

export default function Cart() {
  const { user } = useUser({ redirectTo: "/login" });
  const { data } = useQuery<Carts>(QUERY_CARTS, {
    nextFetchPolicy: "cache-only",
  });
  const noItem = !data?.carts.ids || data?.carts.ids.length === 0;
  return (
    <Layout
      title="Cart"
      header={
        <Header
          image="/avatar-1577909_1280.png"
          title="Cart"
          subTitle={user?.email}
        />
      }
    >
      {noItem && <NoResult text="No items in your cart" />}
      <LaunchList>
        {data?.carts.ids.map((id) => (
          <Grid item xs={10} key={id}>
            <CartItem id={id} />
          </Grid>
        ))}
        {!noItem && (
          <Grid item>
            <BookAll user={user} />
          </Grid>
        )}
      </LaunchList>
    </Layout>
  );
}
