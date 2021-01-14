/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryLaunch
// ====================================================

export interface QueryLaunch_launch_rocket {
  __typename: "Rocket";
  type: string;
  id: string;
  name: string;
}

export interface QueryLaunch_launch_mission {
  __typename: "Mission";
  name: string;
  missionPatch: string;
}

export interface QueryLaunch_launch {
  __typename: "Launch";
  site: string;
  rocket: QueryLaunch_launch_rocket;
  id: string;
  isBooked: string;
  mission: QueryLaunch_launch_mission;
}

export interface QueryLaunch {
  launch: QueryLaunch_launch;
}

export interface QueryLaunchVariables {
  id: string;
}
