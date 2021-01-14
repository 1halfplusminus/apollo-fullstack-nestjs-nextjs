import { gql } from "@apollo/client";
import { LAUNCH_TILE_DATA } from "./LAUNCH_TILE_DATA";

export const QUERY_LAUNCH = gql`
  query QueryLaunch($id: ID!) {
    launch(launchId: $id) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;
export const QUERY_LAUNCHS = gql`
  query QueryLaunchsId($pageSize: Int!, $after: String) {
    launches(pageSize: $pageSize, after: $after) {
      launches {
        id
        __typename
      }
    }
  }
`;
