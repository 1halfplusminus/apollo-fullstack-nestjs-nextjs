/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LaunchTile
// ====================================================

export interface LaunchTile_rocket {
  __typename: "Rocket";
  id: string;
  name: string;
}

export interface LaunchTile_mission {
  __typename: "Mission";
  name: string;
  missionPatch: string;
}

export interface LaunchTile {
  __typename: "Launch";
  id: string;
  isBooked: string;
  rocket: LaunchTile_rocket;
  mission: LaunchTile_mission;
}
