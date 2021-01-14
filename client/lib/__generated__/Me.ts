/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_trips {
  __typename: "Launch";
  id: string;
}

export interface Me_me {
  __typename: "User";
  email: string | null;
  trips: Me_me_trips[];
}

export interface Me {
  me: Me_me;
}
