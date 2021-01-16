import { gql } from "@apollo/client";
import { LAUNCH_TILE_DATA } from "./LAUNCH_TILE_DATA";

export const MUTATION_CANCEL_TRIP = gql`
  mutation CancelTrip($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        __typename
        id
        isBooked
      }
    }
  }
`;
