import { gql } from "@apollo/client";

export const QUERY_CARTS = gql`
  query Carts {
    carts @client {
      ids
      inCart
    }
  }
`;
