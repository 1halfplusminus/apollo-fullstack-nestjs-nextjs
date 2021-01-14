/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "User";
  token: string | null;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  email: string;
  password: string;
}
