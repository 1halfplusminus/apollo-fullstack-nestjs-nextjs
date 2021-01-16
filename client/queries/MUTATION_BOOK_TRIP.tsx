import { gql } from "@apollo/client";
import { LAUNCH_TILE_DATA } from "./LAUNCH_TILE_DATA";

export const MUTATION_BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID!]!) {
    bookTrips(launchIds: $launchIds) {
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
