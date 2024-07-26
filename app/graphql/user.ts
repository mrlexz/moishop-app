import { gql } from "@apollo/client";

export const GET_AUTH_STATUS = gql`
  query GetAuthStatus {
    getAuthStatus {
      success
      user {
        name
        id
        email
      }
      token
    }
  }
`;
