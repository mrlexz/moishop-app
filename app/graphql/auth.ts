import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation Login($input: SignInInput!) {
    signIn(input: $input) {
      user {
        email
        password
      }
      access_token
      isNotHavePassword
    }
  }
`;

export const USER_REGISTER = gql`
  mutation Register($input: SignUpInput!) {
    signUp(input: $input) {
      success
      message
    }
  }
`;
