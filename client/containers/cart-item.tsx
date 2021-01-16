import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import LaunchTile from "../components/launch-tile";
import { QUERY_LAUNCH } from "../queries/QUERY_LAUNCH";
import {
  QueryLaunch,
  QueryLaunchVariables,
} from "../queries/__generated__/QueryLaunch";

export interface CartItemProps {
  id: string;
}

export const CartItem = ({ id }: CartItemProps) => {
  const { data } = useQuery<QueryLaunch, QueryLaunchVariables>(QUERY_LAUNCH, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });
  const router = useRouter();
  return (
    <LaunchTile
      id={id}
      title={data?.launch.mission.name}
      subTitle={data?.launch.rocket.name}
      onClick={() => router.push(`/launch/${id}`)}
    />
  );
};
