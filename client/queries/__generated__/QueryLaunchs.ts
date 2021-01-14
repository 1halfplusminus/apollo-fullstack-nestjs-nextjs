/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryLaunchs
// ====================================================

export interface QueryLaunchs_launches_launches_rocket {
  __typename: "Rocket";
  id: string;
  name: string;
}

export interface QueryLaunchs_launches_launches_mission {
  __typename: "Mission";
  name: string;
  missionPatch: string;
}

export interface QueryLaunchs_launches_launches {
  __typename: "Launch";
  id: string;
  isBooked: string;
  rocket: QueryLaunchs_launches_launches_rocket;
  mission: QueryLaunchs_launches_launches_mission;
}

export interface QueryLaunchs_launches {
  __typename: "LaunchConnect";
  cursor: string;
  launches: QueryLaunchs_launches_launches[];
  hasMore: boolean;
}

export interface QueryLaunchs {
  launches: QueryLaunchs_launches;
}

export interface QueryLaunchsVariables {
  pageSize: number;
  after?: string | null;
}
