/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BookTrips
// ====================================================

export interface BookTrips_bookTrips_launches {
  __typename: "Launch";
  id: string;
  isBooked: string;
}

export interface BookTrips_bookTrips {
  __typename: "TripUpdateResponse";
  success: boolean;
  message: string;
  launches: BookTrips_bookTrips_launches[];
}

export interface BookTrips {
  bookTrips: BookTrips_bookTrips;
}

export interface BookTripsVariables {
  launchIds: string[];
}
