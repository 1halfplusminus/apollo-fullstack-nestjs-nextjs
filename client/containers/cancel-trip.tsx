import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Button } from "../components/button";
import { useUser } from "../lib/useUser";
import { MUTATION_CANCEL_TRIP } from "../queries/MUTATION_CANCEL_TRIP";
import {
  CancelTrip as CancelTripMutation,
  CancelTripVariables,
} from "../queries/__generated__/CancelTrip";
export interface CancelTripProps {
  id: string;
}

export const CancelTrip = ({ id }: CancelTripProps) => {
  const { user } = useUser();
  const [cancelTrip] = useMutation<CancelTripMutation, CancelTripVariables>(
    MUTATION_CANCEL_TRIP,
    {
      variables: { launchId: id },
      update: (cache, result) => {
        const refs = [];
        for (const launch of result.data.cancelTrip.launches) {
          const newRef = cache.writeFragment({
            fragment: gql`
              fragment UpdateTrip on Trip {
                isBooked
              }
            `,
            data: {
              ...launch,
            },
          });
          refs.push(newRef);
        }
        cache.writeFragment({
          id: cache.identify(user),
          fragment: gql`
            fragment UpdateTrips on User {
              trips
            }
          `,
          data: {
            trips: user.trips.filter((t) => t.id != id),
          },
        });
      },
    }
  );
  return (
    <Button
      title="Cancel This Trip"
      onClick={async () => {
        await cancelTrip();
      }}
    />
  );
};
