/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryLaunchsId
// ====================================================

export interface QueryLaunchsId_launches_launches {
  __typename: "Launch";
  id: string;
}

export interface QueryLaunchsId_launches {
  __typename: "LaunchConnect";
  launches: QueryLaunchsId_launches_launches[];
}

export interface QueryLaunchsId {
  launches: QueryLaunchsId_launches;
}

export interface QueryLaunchsIdVariables {
  pageSize: number;
  after?: string | null;
}
