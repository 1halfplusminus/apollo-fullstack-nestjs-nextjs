import {
  gql,
  Reference,
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client";
import { Button } from "../components/button";
import { QUERY_CARTS } from "../queries/QUERY_CARTS";
import { Carts } from "../queries/__generated__/Carts";
import {
  BookTrips,
  BookTripsVariables,
} from "../queries/__generated__/BookTrips";
import { MUTATION_BOOK_TRIPS } from "../queries/MUTATION_BOOK_TRIP";
import { cartsVar } from "../apollo/cache";
import { Me_me } from "../lib/__generated__/Me";

export interface BookAllCartProps {
  user: Me_me;
}

export const BookAll = ({ user }: BookAllCartProps) => {
  const { data } = useQuery<Carts>(QUERY_CARTS);
  const [bookTrips] = useMutation<BookTrips, BookTripsVariables>(
    MUTATION_BOOK_TRIPS,
    {
      variables: { launchIds: data?.carts.ids },
      update: (cache, result) => {
        const refs = [];
        for (const launch of result.data.bookTrips.launches) {
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
          id: cache.identify({ ...user }),
          fragment: gql`
            fragment UpdateTrips on User {
              trips
            }
          `,
          data: {
            trips: [...refs, ...user.trips],
          },
        });
      },
    }
  );
  return (
    <Button
      title="Book all"
      onClick={async () => {
        await bookTrips();
        cartsVar([]);
      }}
    />
  );
};
