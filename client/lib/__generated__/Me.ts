/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_trips_rocket {
  __typename: "Rocket";
  id: string;
  name: string;
}

export interface Me_me_trips_mission {
  __typename: "Mission";
  name: string;
  missionPatch: string;
}

export interface Me_me_trips {
  __typename: "Launch";
  id: string;
  isBooked: string;
  rocket: Me_me_trips_rocket;
  mission: Me_me_trips_mission;
}

export interface Me_me {
  __typename: "User";
  id: number;
  email: string | null;
  trips: Me_me_trips[];
}

export interface Me {
  me: Me_me;
}
