import { gql } from "@apollo/client";

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;
export const QUERY_LAUNCHS = gql`
  query QueryLaunchs($pageSize: Int!, $after: String) {
    launches(pageSize: $pageSize, after: $after) {
      __typename
      cursor
      launches {
        ...LaunchTile
      }
      hasMore
    }
  }
  ${LAUNCH_TILE_DATA}
`;
