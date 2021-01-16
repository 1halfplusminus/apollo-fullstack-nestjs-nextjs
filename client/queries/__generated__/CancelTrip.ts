/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelTrip
// ====================================================

export interface CancelTrip_cancelTrip_launches {
  __typename: "Launch";
  id: string;
  isBooked: string;
}

export interface CancelTrip_cancelTrip {
  __typename: "TripUpdateResponse";
  success: boolean;
  message: string;
  launches: CancelTrip_cancelTrip_launches[];
}

export interface CancelTrip {
  cancelTrip: CancelTrip_cancelTrip;
}

export interface CancelTripVariables {
  launchId: string;
}
